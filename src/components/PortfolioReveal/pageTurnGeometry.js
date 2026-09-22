const round = (value) => Math.round(value * 100) / 100;

const clipPolygon = (polygon, distance) => {
    if (polygon.length === 0) return polygon;

    const result = [];
    let previous = polygon.at(-1);
    let previousDistance = distance(previous);

    for (const point of polygon) {
        const currentDistance = distance(point);
        const previousInside = previousDistance <= 0;
        const currentInside = currentDistance <= 0;

        if (previousInside !== currentInside) {
            const fraction =
                previousDistance / (previousDistance - currentDistance);
            result.push({
                x: previous.x + (point.x - previous.x) * fraction,
                y: previous.y + (point.y - previous.y) * fraction,
            });
        }
        if (currentInside) result.push(point);

        previous = point;
        previousDistance = currentDistance;
    }

    return result;
};

const rectangle = (width, height) => [
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: width, y: height },
    { x: 0, y: height },
];

const toClipPath = (points) => {
    const unique = points.filter((point, index) => {
        const previous = points[index - 1];
        return (
            !previous ||
            Math.hypot(point.x - previous.x, point.y - previous.y) > 0.01
        );
    });
    if (
        unique.length > 1 &&
        Math.hypot(
            unique[0].x - unique.at(-1).x,
            unique[0].y - unique.at(-1).y,
        ) <= 0.01
    ) {
        unique.pop();
    }

    const area = unique.reduce((sum, point, index) => {
        const next = unique[(index + 1) % unique.length];
        return sum + point.x * next.y - next.x * point.y;
    }, 0);
    return unique.length < 3 || Math.abs(area) < 1
        ? "polygon(0 0, 0 0, 0 0)"
        : `polygon(${unique.map(({ x, y }) => `${round(x)}px ${round(y)}px`).join(", ")})`;
};

export const pointOnCubicPath = (points, progress) => {
    const inverse = 1 - progress;
    const weights = [
        inverse ** 3,
        3 * inverse ** 2 * progress,
        3 * inverse * progress ** 2,
        progress ** 3,
    ];

    return {
        x: points.reduce(
            (sum, point, index) => sum + point.x * weights[index],
            0,
        ),
        y: points.reduce(
            (sum, point, index) => sum + point.y * weights[index],
            0,
        ),
    };
};

export const getPageTurnGeometry = (width, height, position) => {
    const normalX = width - position.x;
    const normalY = height - position.y;
    const middleX = (width + position.x) / 2;
    const middleY = (height + position.y) / 2;
    const signedDistance = ({ x, y }) =>
        normalX * (x - middleX) + normalY * (y - middleY);
    const page = rectangle(width, height);

    // The crease is the perpendicular bisector between the original corner
    // and its dragged position. The underside uses a horizontal mirror
    // followed by a rotation, limited to one viewport-sized layer.
    const top = clipPolygon(page, signedDistance);
    const under = clipPolygon(page, (point) => -signedDistance(point));
    const backLocal = clipPolygon(
        page,
        ({ x, y }) => -signedDistance({ x: width - x, y }),
    );
    const angle = 2 * Math.atan2(normalY, normalX);
    const sine = Math.sin(angle);
    const cosine = Math.cos(angle);
    const translateX = position.x + height * sine;
    const translateY = position.y - height * cosine;
    const creasePoints = top.filter(
        (point, index) =>
            Math.abs(signedDistance(point)) < 0.01 &&
            top.findIndex(
                (candidate) =>
                    Math.hypot(candidate.x - point.x, candidate.y - point.y) <
                    0.01,
            ) === index,
    );
    const creaseLength =
        creasePoints.length === 2
            ? Math.hypot(
                  creasePoints[1].x - creasePoints[0].x,
                  creasePoints[1].y - creasePoints[0].y,
              )
            : 0;

    return {
        topClip: toClipPath(top),
        underClip: toClipPath(under),
        backClip: toClipPath(backLocal),
        backTransform: `translate(${round(translateX)}px, ${round(translateY)}px) rotate(${round((angle * 180) / Math.PI)}deg)`,
        creaseX:
            creaseLength > 0
                ? (creasePoints[0].x + creasePoints[1].x) / 2
                : middleX,
        creaseY:
            creaseLength > 0
                ? (creasePoints[0].y + creasePoints[1].y) / 2
                : middleY,
        creaseLength,
        creaseAngle: (Math.atan2(normalY, normalX) * 180) / Math.PI,
    };
};

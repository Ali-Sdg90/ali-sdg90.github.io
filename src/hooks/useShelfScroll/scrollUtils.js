export const getLoopWidth = (scroller) => {
    const firstSet = scroller?.querySelector(".shelf-card-set");

    if (!scroller || !firstSet) {
        return 0;
    }

    const setGap = parseFloat(getComputedStyle(scroller).columnGap) || 0;

    return firstSet.offsetWidth + setGap;
};

export const normalizeScrollPosition = (
    scroller,
    scrollLeft = scroller.scrollLeft,
    doRepeat = true,
) => {
    if (!doRepeat) {
        if (scrollLeft !== scroller.scrollLeft) {
            scroller.scrollLeft = scrollLeft;
        }

        return scroller.scrollLeft;
    }

    const loopWidth = getLoopWidth(scroller);

    if (loopWidth <= 0) {
        return scrollLeft;
    }

    const minScrollLeft = loopWidth;
    const maxScrollLeft = loopWidth * 3;
    let nextScrollLeft = scrollLeft;

    while (nextScrollLeft < minScrollLeft) {
        nextScrollLeft += loopWidth;
    }

    while (nextScrollLeft >= maxScrollLeft) {
        nextScrollLeft -= loopWidth;
    }

    if (nextScrollLeft !== scroller.scrollLeft) {
        scroller.scrollLeft = nextScrollLeft;
    }

    return nextScrollLeft;
};

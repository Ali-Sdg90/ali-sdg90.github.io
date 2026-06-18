import { useCallback, useEffect } from "react";
import { MOMENTUM } from "./constants";

const useShelfMomentum = ({
    momentumFrames: momentumFramesRef,
    autoScrollPositions: autoScrollPositionsRef,
    normalizeScrollPosition,
    updateScrollState,
}) => {
    const stopMomentum = useCallback(
        (index) => {
            const frame = momentumFramesRef.current[index];

            if (frame) {
                cancelAnimationFrame(frame);
                delete momentumFramesRef.current[index];
            }
        },
        [momentumFramesRef],
    );

    const startMomentum = useCallback(
        (scroller, dragSnapshot) => {
            const index = dragSnapshot.index;
            const defaultVelocity = dragSnapshot.defaultVelocity;
            let velocity = Math.max(
                -MOMENTUM.maxVelocity,
                Math.min(MOMENTUM.maxVelocity, dragSnapshot.velocity),
            );
            let scrollLeft = scroller.scrollLeft;
            let previousTime = performance.now();

            stopMomentum(index);

            if (Math.abs(velocity) < MOMENTUM.minVelocity) {
                return;
            }

            const tick = (currentTime) => {
                const deltaSeconds = Math.min(
                    (currentTime - previousTime) / 1000,
                    MOMENTUM.maxDeltaSeconds,
                );
                const followsDefault =
                    defaultVelocity !== 0 &&
                    Math.sign(velocity) === Math.sign(defaultVelocity);
                const friction = followsDefault
                    ? MOMENTUM.followFriction
                    : MOMENTUM.oppositeFriction;
                const defaultPull = followsDefault
                    ? MOMENTUM.followDefaultPull
                    : MOMENTUM.oppositeDefaultPull;

                previousTime = currentTime;
                velocity += defaultVelocity * defaultPull * deltaSeconds;
                velocity *= Math.exp(-friction * deltaSeconds);
                scrollLeft = normalizeScrollPosition(
                    scroller,
                    scrollLeft + velocity * deltaSeconds,
                    dragSnapshot.doRepeat,
                );
                autoScrollPositionsRef.current[index] = scrollLeft;

                if (Math.abs(velocity) <= MOMENTUM.minVelocity) {
                    delete momentumFramesRef.current[index];
                    updateScrollState(index);
                    return;
                }

                momentumFramesRef.current[index] = requestAnimationFrame(tick);
            };

            momentumFramesRef.current[index] = requestAnimationFrame(tick);
        },
        [
            autoScrollPositionsRef,
            momentumFramesRef,
            normalizeScrollPosition,
            stopMomentum,
            updateScrollState,
        ],
    );

    useEffect(() => {
        const frames = momentumFramesRef.current;

        return () => {
            Object.values(frames).forEach((frame) => {
                cancelAnimationFrame(frame);
            });
        };
    }, [momentumFramesRef]);

    return { startMomentum, stopMomentum };
};

export default useShelfMomentum;

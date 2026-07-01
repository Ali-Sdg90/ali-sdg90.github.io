export const DRAG = {
    minDeltaSeconds: 0.001,
    startDistance: 5,
};

export const VELOCITY_SMOOTHING = {
    previousWeight: 0.62,
    instantWeight: 0.38,
};

export const MOMENTUM = {
    minVelocity: 24,
    maxVelocity: 1800,
    maxDeltaSeconds: 0.034,
    followFriction: 2.25,
    oppositeFriction: 4.6,
    followDefaultPull: 0.34,
    oppositeDefaultPull: 1.15,
};

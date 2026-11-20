import { useSyncExternalStore } from "react";

const MOBILE_WIDTH_QUERY = "(max-width: 899px)";
const COMPACT_VIEWPORT_QUERY = "(max-width: 1400px) and (max-height: 899px)";

// Keep these values aligned with src/assets/scss/base/_breakpoints.scss.
export const MOBILE_VIEWPORT_QUERY = `${MOBILE_WIDTH_QUERY}, ${COMPACT_VIEWPORT_QUERY}`;

let mobileViewportQueryList;

const getMobileViewportQueryList = () => {
    if (typeof window === "undefined") return null;

    mobileViewportQueryList ??= window.matchMedia(MOBILE_VIEWPORT_QUERY);

    return mobileViewportQueryList;
};

const subscribe = (onViewportChange) => {
    const queryList = getMobileViewportQueryList();

    if (!queryList) return () => {};

    queryList.addEventListener("change", onViewportChange);

    return () => queryList.removeEventListener("change", onViewportChange);
};

const getSnapshot = () => getMobileViewportQueryList()?.matches ?? false;
const getServerSnapshot = () => true;

const useMobileViewport = () =>
    useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

export default useMobileViewport;

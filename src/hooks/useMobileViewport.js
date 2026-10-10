import { useSyncExternalStore } from "react";

export const MOBILE_VIEWPORT_QUERY = "(max-width: 899px)";

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
const getServerSnapshot = () => false;

const useMobileViewport = () =>
    useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

export default useMobileViewport;

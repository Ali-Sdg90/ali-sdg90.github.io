import { useEffect, useRef, useState } from "react";

const MobileReveal = ({ children, className = "" }) => {
    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(
        () =>
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );

    useEffect(() => {
        const element = elementRef.current;
        if (!element || isVisible) return undefined;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                setIsVisible(true);
                observer.disconnect();
            },
            { rootMargin: "0px 0px -8%", threshold: 0.08 },
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [isVisible]);

    return (
        <div
            className={`mobile-reveal${isVisible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
            ref={elementRef}
        >
            {children}
        </div>
    );
};

export default MobileReveal;

import { useEffect, useRef, useState } from "react";
import { aboutData } from "../data/portfolio/aboutData";

const AboutPanel = () => {
    const { title, image, paragraphs, tags } = aboutData;
    const copyRef = useRef(null);
    const scrollbarTrackRef = useRef(null);
    const [scrollbarThumb, setScrollbarThumb] = useState({
        height: 0,
        top: 0,
    });

    const updateScrollbarThumb = () => {
        const copy = copyRef.current;
        const track = scrollbarTrackRef.current;

        if (!copy || !track) {
            return;
        }

        const maxScrollTop = copy.scrollHeight - copy.clientHeight;
        const trackHeight = track.clientHeight;

        if (maxScrollTop <= 0 || trackHeight <= 0) {
            setScrollbarThumb({ height: 0, top: 0 });
            return;
        }

        const thumbHeight = Math.max(
            72,
            (copy.clientHeight / copy.scrollHeight) * trackHeight,
        );
        const thumbTop =
            (copy.scrollTop / maxScrollTop) * (trackHeight - thumbHeight);

        setScrollbarThumb({ height: thumbHeight, top: thumbTop });
    };

    const handleWheel = (event) => {
        const copy = copyRef.current;

        if (!copy) {
            return;
        }

        const maxScrollTop = copy.scrollHeight - copy.clientHeight;

        if (maxScrollTop <= 0) {
            return;
        }

        const nextScrollTop = Math.min(
            Math.max(copy.scrollTop + event.deltaY, 0),
            maxScrollTop,
        );

        if (nextScrollTop !== copy.scrollTop) {
            event.preventDefault();
            copy.scrollTop = nextScrollTop;
            updateScrollbarThumb();
        }
    };

    useEffect(() => {
        const copy = copyRef.current;
        const track = scrollbarTrackRef.current;

        if (!copy || !track) {
            return undefined;
        }

        updateScrollbarThumb();

        const resizeObserver = new ResizeObserver(updateScrollbarThumb);
        resizeObserver.observe(copy);
        resizeObserver.observe(track);

        copy.addEventListener("scroll", updateScrollbarThumb, {
            passive: true,
        });

        return () => {
            resizeObserver.disconnect();
            copy.removeEventListener("scroll", updateScrollbarThumb);
        };
    }, []);

    return (
        <aside className="about-panel" aria-labelledby="about-panel-title">
            <div className="about-panel-card" onWheel={handleWheel}>
                <div className="about-panel-scroll">
                    <div className="about-panel-avatar-wrap">
                        <img
                            className="about-panel-avatar"
                            src={image.src}
                            alt={image.alt}
                            width={image.width}
                            height={image.height}
                            decoding="sync"
                            fetchPriority="high"
                        />
                        <span
                            className="about-panel-status"
                            aria-label="Available"
                        />
                    </div>

                    <h2 className="about-panel-title" id="about-panel-title">
                        {title}
                    </h2>

                    <div className="about-panel-copy-shell">
                        <div className="about-panel-copy" ref={copyRef}>
                            <div className="about-panel-text">
                                {paragraphs.map((paragraph) => (
                                    <p key={paragraph}>{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        <div
                            className="about-panel-scrollbar"
                            ref={scrollbarTrackRef}
                            aria-hidden="true"
                        >
                            <span
                                style={{
                                    height: `${scrollbarThumb.height}px`,
                                    transform: `translateY(${scrollbarThumb.top}px)`,
                                }}
                            />
                        </div>
                    </div>

                    <ul className="about-panel-tags" aria-label="Skills">
                        {tags.map((tag) => (
                            <li key={tag}>{tag}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default AboutPanel;

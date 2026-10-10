import { motion } from "framer-motion";

import emojiSignature from "../../assets/images/ui/emoji-signature.webp";
import { REVEAL_TRANSITION } from "./motionConfig";
import useLotusEasterEgg from "./useLotusEasterEgg";

const StoryClosing = ({ completionElementRef, prefersReducedMotion }) => {
    const { animation, handleClick } = useLotusEasterEgg(prefersReducedMotion);

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleClick();
        }
    };

    return (
        <>
            <motion.div
                className="build-story__closing"
                ref={completionElementRef}
                role="button"
                tabIndex={0}
                aria-label="Thank you for visiting. Open a small surprise."
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 38 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={REVEAL_TRANSITION}
            >
                <motion.p
                    className="build-story__closing-text"
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ ...REVEAL_TRANSITION, delay: 0.1 }}
                >
                    That’s how it came together. Thanks for joining me on this
                    journey and checking out my work.
                </motion.p>

                <motion.div
                    className="build-story__signature"
                    aria-hidden="true"
                    animate={animation}
                    style={{ transformOrigin: "50% 50%" }}
                    initial={
                        prefersReducedMotion
                            ? false
                            : { opacity: 0, scale: 0.72 }
                    }
                    whileInView={{ opacity: 0.07, scale: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.22,
                        ease: [0.34, 1.56, 0.64, 1],
                    }}
                >
                    <img
                        src={emojiSignature}
                        alt=""
                        width="1024"
                        height="1024"
                        draggable="false"
                    />
                </motion.div>
            </motion.div>

            <motion.footer
                className="build-story__footer"
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                <span>Designed &amp; Developed by Ali Sadeghi.</span>
                <span>© 2026 Ali Sadeghi. All rights reserved.</span>
            </motion.footer>
        </>
    );
};

export default StoryClosing;

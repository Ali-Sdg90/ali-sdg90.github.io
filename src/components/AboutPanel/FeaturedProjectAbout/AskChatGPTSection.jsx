import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { SiOpenai } from "react-icons/si";

import { trackUmamiEvent } from "../../../utils/analytics";
import { getShelfItemId } from "../../../utils/getShelfItemId";
import {
    getStaticDetailPagePath,
    STATIC_DETAIL_ORIGIN,
} from "../../../staticDetails/staticDetailRoutes";
import { buildChatGPTPrompt, buildChatGPTUrl } from "./askChatGPT";

const AskChatGPTSection = ({ item, section }) => {
    const itemId = item ? getShelfItemId(item) : null;
    const pagePath = getStaticDetailPagePath(section?.id, itemId, "/");

    if (!pagePath) return null;

    const pageUrl = new URL(pagePath, `${STATIC_DETAIL_ORIGIN}/`).href;
    const prompt = buildChatGPTPrompt({
        pageUrl,
        sectionId: section.id,
    });
    const chatGPTUrl = buildChatGPTUrl(prompt);

    if (!chatGPTUrl) return null;

    return (
        <section className="featured-project-section featured-project-chatgpt">
            <h3 className="featured-project-section-title">
                <SiOpenai aria-hidden="true" />
                <span>Ask ChatGPT</span>
            </h3>
            <p className="featured-project-chatgpt-copy">
                Get a summary or ask questions about this card.
            </p>
            <a
                className="featured-project-chatgpt-link"
                href={chatGPTUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ask ChatGPT about ${item.title} (opens in a new tab)`}
                onClick={() =>
                    trackUmamiEvent("chatgpt_portfolio_page_open", {
                        item_id: itemId,
                        item_name: item.title,
                        section_id: section.id,
                    })
                }
            >
                <span>Open in ChatGPT</span>
                <FaArrowUpRightFromSquare aria-hidden="true" />
            </a>
        </section>
    );
};

export default AskChatGPTSection;

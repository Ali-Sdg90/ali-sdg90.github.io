import { FaArrowUpRightFromSquare } from "react-icons/fa6";

import { getStaticDetailPagePath } from "../../staticDetails/staticDetailRoutes";
import { getShelfItemId } from "../../utils/getShelfItemId";

const StaticDetailPageLink = ({ item, section }) => {
    const itemId = item ? getShelfItemId(item) : null;
    const pagePath = getStaticDetailPagePath(section?.id, itemId);

    if (!pagePath) return null;

    return (
        <div className="featured-project-page-link-wrap">
            <a
                className="featured-project-page-link"
                href={pagePath}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open as a standalone page ${item.title}`}
            >
                <span>Open as a standalone page</span>
                <FaArrowUpRightFromSquare aria-hidden="true" />
            </a>
        </div>
    );
};

export default StaticDetailPageLink;

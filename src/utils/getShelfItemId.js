export const getShelfItemId = (item) => {
    return (
        item.id ??
        `${item.title ?? item.company ?? "item"}-${item.meta ?? item.year ?? ""}`
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
    );
};

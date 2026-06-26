export function setDocumentTitle() {
    document.title = import.meta.env.DEV
        ? "Local | Ali Sadeghi | Portfolio"
        : "Ali Sadeghi | Portfolio";
}

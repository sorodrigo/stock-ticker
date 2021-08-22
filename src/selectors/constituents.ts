export function getPagesByPageCursor(items: string[], pageCursor: number) {
  let currentIndex = pageCursor >= items.length ? 0 : pageCursor;
  const pages = items.slice(currentIndex, 8);
  return pages;
}

export function getPagesByPageCursor(items: string[], pageCursor: number) {
  const cursor = pageCursor * 8 - 1;
  let currentIndex = cursor >= items.length ? 0 : cursor;
  const pages = items.slice(currentIndex, 8);
  return pages;
}

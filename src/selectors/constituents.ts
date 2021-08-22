export function getPagesByPageCursor(items: string[], pageCursor: number) {
  const SIZE = 8;
  const cursor = Math.max(pageCursor * SIZE - 1, 0);
  let currentIndex = cursor >= items.length ? 0 : cursor;
  const pages = items.slice(currentIndex, currentIndex + SIZE);
  return pages;
}

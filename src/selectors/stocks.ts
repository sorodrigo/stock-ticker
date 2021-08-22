import { StockQuoteData } from 'services/finnhub';
export function getStocks(
  items: { data: StockQuoteData }[],
  indexName: string
) {
  return items.map(({ data }) => ({
    indexName,
    symbol: data.symbol,
    currentPrice: data.c,
    change: data.d,
    percentChange: data.dp,
    highPrice: data.h,
    lowPrice: data.l,
    openPrice: data.o,
    previousClosePrice: data.pc
  }));
}

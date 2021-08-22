import React, { useEffect, useState } from 'react';
import { getIndicesConstituents, getStockQuote } from 'services/finnhub';
import StocksList from 'components/stocks-list';

function App() {
  const [items, setItems] = useState();
  useEffect(() => {
    getIndicesConstituents('^GSPC')
      .then(({ data, response }) => {
        // @ts-ignore
        const first2Pages = data.constituents.slice(0, 8);
        Promise.all(first2Pages.map((item: string) => getStockQuote(item)))
          .then((items) => {
            const stocks = items as unknown as {
              data: Record<string, number>;
            }[];
            const mappedStocks = stocks.map(({ data }, index) => ({
              symbol: first2Pages[index],
              name: 'N/A',
              currentPrice: data.c,
              change: data.d,
              percentChange: data.dp,
              highPrice: data.h,
              lowPrice: data.l,
              openPrice: data.o,
              previousClosePrice: data.pc
            }));
            return mappedStocks;
          })
          .then((items) => setItems(items));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return <StocksList items={items} />;
}

export default App;

import React, { useEffect, useState } from 'react';
import { getIndicesConstituents, getStockQuote } from 'services/finnhub';
import { getPagesByPageCursor } from 'selectors/constituents';
import { getStocks } from 'selectors/stocks';
import StocksList from 'components/stocks-list';

const indexName = '^GSPC';
function App() {
  const [pageCursor, setPageCursor] = useState<number>(0);
  const [items, setItems] = useState<string[]>([]);
  const [stocks, setStocks] = useState<any[]>([]);
  useEffect(() => {
    getIndicesConstituents(indexName)
      .then((res) => {
        setItems(res.data.constituents);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const pages = getPagesByPageCursor(items, pageCursor);
    Promise.all(pages.map((item: string) => getStockQuote(item)))
      .then((res: any[]) => {
        const newStocks = getStocks(res, indexName);
        setStocks([...stocks, ...newStocks]);
      })
      .catch((error) => console.error(error));
  }, [items, pageCursor]);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const updateCursor = () => {
      if (pageCursor >= items.length) {
        setPageCursor(0);
      } else {
        setPageCursor((cursor) => cursor + 1);
      }
    };
    const timeout = setTimeout(updateCursor, 4000);
    return () => {
      clearTimeout(timeout);
    };
  }, [items, pageCursor, setPageCursor]);

  return <StocksList stocks={stocks} pageCursor={pageCursor} />;
}

export default App;

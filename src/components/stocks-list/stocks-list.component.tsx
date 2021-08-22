import React, { useState } from 'react';
import StockRow from 'components/stock-row';
import { StockRowProps } from 'components/stock-row/stock-row.component';
import { useTrail, animated as a } from 'react-spring';
import styles from './stocks-list.module.scss';

const items: StockRowProps[] = Array(8)
  .fill(0)
  .map((_, index) => ({
    symbol: `${index * 1111}`,
    name: 'Apple',
    currentPrice: 111,
    change: 12,
    percentChange: 1.2,
    highPrice: 120,
    lowPrice: 101,
    openPrice: 100,
    previousClosePrice: 90
  }));

function usePaginatedItems(items: any[]): {
  pages: ({ height: number; x: any } & React.StyleHTMLAttributes<any>)[][];
  next: () => void;
} {
  const config = { mass: 5, tension: 2000, friction: 200 };

  const [toggle, set] = useState(true);
  const page1 = items.slice(0, 4);
  const page2 = items.slice(4);
  const trail1 = useTrail(page1.length, {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 20,
    height: toggle ? 80 : 0,
    zIndex: toggle ? 1 : 0,
    from: { opacity: 0, x: 20, height: 0 }
  });

  const trail2 = useTrail(page2.length, {
    config,
    opacity: !toggle ? 1 : 0,
    x: !toggle ? 0 : 20,
    height: !toggle ? 80 : 0,
    zIndex: !toggle ? 1 : 0,
    from: { opacity: 1, x: 0, height: 80 }
  });

  return { pages: [trail1, trail2], next: () => set((s) => !s) };
}
const StocksList: React.FC = (props) => {
  const {} = props;
  const { pages, next } = usePaginatedItems(items);

  const [trail1, trail2] = pages;
  return (
    <div className={styles.stocksList} onClick={next}>
      <ul>
        {trail1.map(({ x, height, ...rest }, index) => (
          <a.li
            key={items[index].symbol}
            className={styles.trailItem}
            style={{
              ...rest,
              left: 0,
              top: index * 117,
              transform: x.interpolate((x: number) => `translate3d(0,${x}px,0)`)
            }}
          >
            <StockRow {...items[index]} />
          </a.li>
        ))}
        {trail2.map(({ x, height, ...rest }, index) => (
          <a.li
            key={items[index].symbol}
            className={styles.trailItem}
            style={{
              ...rest,
              left: 0,
              top: index * 117,
              transform: x.interpolate((x: number) => `translate3d(0,${x}px,0)`)
            }}
          >
            <StockRow {...items[index + (trail1.length - 1)]} />
          </a.li>
        ))}
      </ul>
    </div>
  );
};

export default StocksList;

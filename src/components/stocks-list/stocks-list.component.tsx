import React, { useState, useEffect } from 'react';
import StockRow from 'components/stock-row';
import { StockRowProps } from 'components/stock-row/stock-row.component';
import { useTrail, animated as a } from 'react-spring';
import styles from './stocks-list.module.scss';

function usePaginatedItems(): {
  pages: ({ height: number; x: any } & React.StyleHTMLAttributes<any>)[][];
  next: () => void;
} {
  const config = { mass: 5, tension: 2000, friction: 200 };

  const [toggle, set] = useState(true);
  const trail1 = useTrail(4, {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 20,
    height: toggle ? 80 : 0,
    zIndex: toggle ? 1 : 0,
    from: { opacity: 0, x: 20, height: 0 }
  });

  const trail2 = useTrail(4, {
    config,
    opacity: !toggle ? 1 : 0,
    x: !toggle ? 0 : 20,
    height: !toggle ? 80 : 0,
    zIndex: !toggle ? 1 : 0,
    from: { opacity: 1, x: 0, height: 80 }
  });

  return { pages: [trail1, trail2], next: () => set((s) => !s) };
}

const StocksList: React.FC<{ stocks: StockRowProps[]; pageCursor: number }> = (
  props
) => {
  const { stocks, pageCursor } = props;
  const { pages, next } = usePaginatedItems();

  useEffect(() => {
    next();
  }, [pageCursor]);

  const [trail1, trail2] = pages;
  return (
    <div className={styles.stocksList} onClick={next}>
      {stocks.length > 0 && (
        <ul>
          {trail1.flatMap(({ x, height, ...rest }, index) =>
            stocks[pageCursor + index] ? (
              <a.li
                key={index}
                className={styles.trailItem}
                style={{
                  ...rest,
                  left: 0,
                  top: index * 117,
                  transform: x.interpolate(
                    (x: number) => `translate3d(0,${x}px,0)`
                  )
                }}
              >
                <StockRow {...stocks[pageCursor + index]} />
              </a.li>
            ) : (
              []
            )
          )}
          {trail2.flatMap(({ x, height, ...rest }, index) =>
            stocks[pageCursor + index + (trail1.length - 1)] ? (
              <a.li
                key={index + 'second'}
                className={styles.trailItem}
                style={{
                  ...rest,
                  left: 0,
                  top: index * 117,
                  transform: x.interpolate(
                    (x: number) => `translate3d(0,${x}px,0)`
                  )
                }}
              >
                <StockRow
                  {...stocks[pageCursor + index + (trail1.length - 1)]}
                />
              </a.li>
            ) : (
              []
            )
          )}
        </ul>
      )}
      {stocks.length === 0 && (
        <div className={styles.loading}>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

StocksList.defaultProps = {
  stocks: []
};

export default StocksList;

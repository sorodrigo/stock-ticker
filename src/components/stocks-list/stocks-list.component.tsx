import * as React from 'react';
import StockRow from 'components/stock-row';
import styles from './stocks-list.module.scss';

const StocksList: React.FC = (props) => {
  const {} = props;
  return (
    <div className={styles.stocksList}>
      <ul>
        {Array(4)
          .fill(0)
          .map(() => (
            <StockRow
              symbol="AAPL"
              name="Apple"
              currentPrice={111}
              change={12}
              percentChange={1.2}
              highPrice={120}
              lowPrice={101}
              openPrice={100}
              previousClosePrice={90}
            />
          ))}
      </ul>
    </div>
  );
};

export default StocksList;

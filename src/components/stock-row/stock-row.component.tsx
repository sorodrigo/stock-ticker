import * as React from 'react';
import cx from 'classnames';
import styles from './stock-row.module.scss';

export type StockRowProps = {
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  percentChange: number;
  highPrice: number;
  lowPrice: number;
  openPrice: number;
  previousClosePrice: number;
};

const StockRow: React.FC<StockRowProps> = (props) => {
  const {
    symbol,
    name,
    currentPrice,
    change,
    percentChange,
    highPrice,
    lowPrice,
    openPrice,
    previousClosePrice
  } = props;
  return (
    <div className={styles.stockRow}>
      <div>
        <div className={styles.subrow}>
          <h2 className={styles.largeText}>{symbol}</h2>
          <p className={styles.largeText}>{currentPrice}</p>
        </div>
        <div className={styles.subrow}>
          <p>{name}</p>
          <p
            className={cx(styles.changeTextContainer, {
              [styles.up]: change > 0,
              [styles.down]: change < 0
            })}
          >
            <span>{change}</span>
            <span>({percentChange}%)</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StockRow;

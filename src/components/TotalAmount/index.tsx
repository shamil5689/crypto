import React from 'react';
import styles from './TotalAmount.module.scss';

interface TotalAmountProps {
  total: string;
}

const TotalAmount: React.FC<TotalAmountProps> = ({ total }) => (
  <div className={styles.receiveAmount}>
    <div className={styles.receiveText}>Receive amount</div>
    <div className={`${styles.amount} green`}>{total} USDT (ERC-20)</div>
  </div>
);

export default TotalAmount;
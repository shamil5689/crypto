import React, { memo } from "react";
import styles from "./WalletRowComponent.module.scss";

interface WalletRowProps {
  id: string;
  wallet: string;
  amount: string;
  handleInputChange: (
    id: string,
    type: "wallet" | "amount",
    value: string
  ) => void;
  handleRemoveRow: (id: string) => void;
}

const WalletRowComponent: React.FC<WalletRowProps> = memo(
  ({ id, wallet, amount, handleInputChange, handleRemoveRow }) => {
    return (
      <div className={styles.inputContainer}>
        <input
          className={styles.walletInput}
          type="text"
          placeholder="wallet address"
          value={wallet}
          onChange={(e) => handleInputChange(id, "wallet", e.target.value)}
        />
        <input
          className={styles.amountInput}
          type="text"
          placeholder="amount"
          value={amount}
          onChange={(e) => handleInputChange(id, "amount", e.target.value)}
        />
        <button
          className={styles.removeButton}
          onClick={() => handleRemoveRow(id)}
        >
          Remove
        </button>
      </div>
    );
  }
);

export default WalletRowComponent;

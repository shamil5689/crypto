// WalletRowComponent.js или WalletRowComponent.tsx
interface WalletRowProps {
  row: {
    id: string;
    wallet: string;
    amount: string;
  };
  handleInputChange: (
    id: string,
    type: "wallet" | "amount",
    value: string
  ) => void;
  handleRemoveRow: (id: string) => void;
}

const WalletRowComponent: React.FC<WalletRowProps> = ({
  row,
  handleInputChange,
  handleRemoveRow,
}) => {
  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="wallet address"
        value={row.wallet}
        onChange={(e) => handleInputChange(row.id, "wallet", e.target.value)}
      />
      <input
        type="text"
        placeholder="amount"
        value={row.amount}
        onChange={(e) => handleInputChange(row.id, "amount", e.target.value)}
      />
      <button className="remove-button" onClick={() => handleRemoveRow(row.id)}>
        Remove
      </button>
    </div>
  );
};

export default WalletRowComponent;

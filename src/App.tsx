import { useCallback, useState } from "react";
import styles from "./App.module.scss";
import { v4 as uuidv4 } from "uuid";
import TotalAmount from "./components/TotalAmount";
import WalletRowComponent from "./components/WalletRowComponent";
import { useFileHandler } from "./hooks/useFileHandler";
import { useDropzone } from "react-dropzone";
import Balance from "./components/Balance";

interface WalletRowProps {
  id: string;
  wallet: string;
  amount: string;
}

const App: React.FC = () => {
  const [walletRows, setWalletRows] = useState<WalletRowProps[]>([
    { id: uuidv4(), wallet: "", amount: "0.00" },
  ]);

  const handleAddRow = () => {
    setWalletRows([
      ...walletRows,
      { id: uuidv4(), wallet: "", amount: "0.00" },
    ]);
  };

  const handleInputChange = useCallback(
    (id: string, type: "wallet" | "amount", value: string) => {
      setWalletRows(
        walletRows.map((row) =>
          row.id === id ? { ...row, [type]: value } : row
        )
      );
    },
    [walletRows]
  );

  const handleRemoveRow = useCallback(
    (id: string) => {
      setWalletRows(walletRows.filter((row) => row.id !== id));
    },
    [walletRows]
  );

  const onDrop = useFileHandler(setWalletRows);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
  });

  const totalAmount = walletRows
    .reduce((sum, row) => sum + parseFloat(row.amount || "0"), 0)
    .toFixed(2);

  return (
    <div className={styles.container} {...getRootProps()}>
      <input {...getInputProps()} style={{ display: "none" }} />
      <h3>FORM</h3>
      <Balance />
      {walletRows.map((row) => (
        <WalletRowComponent
          key={row.id}
          {...row}
          handleInputChange={handleInputChange}
          handleRemoveRow={handleRemoveRow}
        />
      ))}
      <div className={styles.actions}>
        <button className={styles.addWalletButton} onClick={handleAddRow}>
          Add new wallet
        </button>
      </div>
      <TotalAmount total={totalAmount} />
      <button className={styles.withdrawButton}>Withdraw</button>
    </div>
  );
};

export default App;

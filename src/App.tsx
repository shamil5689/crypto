import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import TotalAmount from "./components/TotalAmount";
import WalletRowComponent from "./components/WalletRowComponent";
import { useFileHandler } from "./hooks/useFileHandler";
import { useDropzone } from "react-dropzone";

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

  const handleInputChange = (
    id: string,
    type: "wallet" | "amount",
    value: string
  ) => {
    setWalletRows(
      walletRows.map((row) => (row.id === id ? { ...row, [type]: value } : row))
    );
  };

  const handleRemoveRow = (id: string) => {
    setWalletRows(walletRows.filter((row) => row.id !== id));
  };

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
    <div className="container" {...getRootProps()}>
      <input {...getInputProps()} style={{ display: "none" }} />
      <h3>FORM</h3>
      <div className="balance">
        <div className="balance-title">Balance USDT (ERC-20)</div>
        <div className="balance-value green">
          <span className="balance-amount">141 241.5121 </span>
          <div className="usdt-container">
            <span className="usdt">USDT</span>
            <span className="erc20">(ERC-20)</span>
          </div>
        </div>
      </div>

      {walletRows.map((row) => (
        <WalletRowComponent
          key={row.id}
          row={row}
          handleInputChange={handleInputChange}
          handleRemoveRow={handleRemoveRow}
        />
      ))}
      <div className="actions">
        <button className="add-wallet-button" onClick={handleAddRow}>
          Add new wallet
        </button>
      </div>
      <TotalAmount total={totalAmount} />
      <button className="withdraw-button">Withdraw</button>
    </div>
  );
};

export default App;

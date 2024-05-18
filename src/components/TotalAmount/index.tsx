interface TotalAmountProps {
  total: string;
}

const TotalAmount: React.FC<TotalAmountProps> = ({ total }) => (
  <div className="receive-amount">
    <div className="receive-text">Receive amount</div>
    <div className="amount green">{total} USDT (ERC-20)</div>
  </div>
);

export default TotalAmount;

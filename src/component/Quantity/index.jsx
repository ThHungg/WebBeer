import { memo, useState, useEffect } from "react";

const Quantity = ({ onChange }) => {
  const [quantity, setQuantity] = useState(1);

  const decrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  // Gọi onChange mỗi khi quantity thay đổi
  useEffect(() => {
    if (onChange) onChange(quantity);
  }, [quantity, onChange]);

  return (
    <div className="flex items-center border border-black w-max">
      <button
        aria-label="Decrease quantity"
        className="w-8 h-8 flex items-center justify-center text-2xl font-semibold"
        onClick={decrease}
      >
        −
      </button>
      <span className="px-2 text-xl font-normal select-none">{quantity}</span>
      <button
        aria-label="Increase quantity"
        className="w-8 h-8 flex items-center justify-center text-2xl font-semibold"
        onClick={increase}
      >
        +
      </button>
    </div>
  );
};

export default memo(Quantity);

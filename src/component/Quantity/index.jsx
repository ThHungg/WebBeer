import { memo, useEffect } from "react";

const Quantity = ({ quantity, setQuantity }) => {
  return (
    <div className="flex items-center border border-black w-max">
      <button
        aria-label="Decrease quantity"
        className="w-8 h-8 flex items-center justify-center text-2xl font-semibold"
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
      >
        −
      </button>
      <span className="px-2 text-xl font-normal select-none">{quantity}</span>
      <button
        aria-label="Increase quantity"
        className="w-8 h-8 flex items-center justify-center text-2xl font-semibold"
        onClick={() => setQuantity(quantity + 1)}
      >
        +
      </button>
    </div>
  );
};

export default memo(Quantity);

import { memo } from "react";
import Quantity from "../Quantity";

const ProductCart = ({ image, name, price }) => {
  return (
    <div className="w-full p-4">
      <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300">
        <img
          src={image}
          alt="Bia Hà Nội"
          className="h-80 w-full object-contain rounded-md mb-4"
        />
        <h2 className="text-3xs font-semibold text-[#302006] mb-2">{name}</h2>
        <p className="text-xs text-gray-600 mb-3">{price} / lon</p>
        <Quantity />
        <button className="mt-4 w-full bg-[#302006] text-white py-2 rounded hover:bg-[#4a3412] transition">
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default memo(ProductCart);

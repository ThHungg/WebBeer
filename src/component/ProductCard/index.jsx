import { memo } from "react";
import Quantity from "../Quantity";
import { ROUTERS } from "../../utils/router";
import { Link } from "react-router-dom";
import formatter from "../../utils/formatter";

const ProductCart = ({ id, image, name, price }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const imageUrl =
    image && image.startsWith("http") ? image : `${BACKEND_URL}${image}`;
  return (
    <div className="w-full p-4">
      <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300">
        <Link to={`${ROUTERS.USER.DETAILPRODUCT}/${id}`}>
          <img
            src={imageUrl}
            alt="Bia Hà Nội"
            className="h-80 w-full object-contain rounded-md mb-4"
          />
          <h2 className="text-3xs font-semibold text-[#302006] mb-2">{name}</h2>
        </Link>
        <p className="text-xs text-gray-600 mb-3">{formatter(price)} / lon</p>
        <Quantity />
        <button className="mt-4 w-full bg-[#302006] text-white py-2 rounded hover:bg-[#4a3412] transition">
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default memo(ProductCart);

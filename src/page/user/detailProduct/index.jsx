import { memo, useState } from "react";
import Quantity from "../../../component/Quantity";
import { useParams } from "react-router-dom";
import * as productService from "../../../services/productService";
import { useQuery } from "@tanstack/react-query";
import ProductCart from "../../../component/ProductCart";

const DetailProduct = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [onpenText, setOpenText] = useState(null);

  const toggleItem = (index) => {
    setOpenText((prev) => (prev === index ? null : index));
  };

  const fetchDetailProduct = async () => {
    const res = await productService.getDetailProduct(id);
    return res;
  };

  const { data: detail = [] } = useQuery({
    queryKey: ["detail"],
    queryFn: fetchDetailProduct,
  });

  const handleQuantityChange = (qty) => {
    setQuantity(qty);
    console.log("Số lượng hiện tại:", qty);
  };

  return (
    <>
      <div className="pt-10 bg-[#F9F9F9] pb-10">
        <div className="max-w-screen-xl mx-auto lg:grid grid-cols-2 px-3">
          <img
            src="https://www.fowleswine.com/wp-content/uploads/2024/02/AYG-NV-Sparkling.png"
            alt=""
            className="mx-auto h-auto w-1/4"
          />
          <div className="flex flex-col gap-6">
            <h2 className="text-[36px] font-semibold text-[#302006]">
              {detail?.data?.name}
            </h2>
            <h3>
              <span className="text-[24px] font-semibold text-[#302006]">
                {detail?.data?.price}{" "}
              </span>
              <span className="text-[20px] font-light text-[#302006]">
                / chai
              </span>
            </h3>
            <h3 className="text-[22px] font-light text-[#302006]">
              {detail?.data?.description}
            </h3>
            <div className="flex gap-10 items-center">
              <Quantity onChange={handleQuantityChange} />
              <h3 className="mb-0 normal-case text-[#8A6E4B] text-[22px] font-semibold text-center border-b border-[#8A6E4B] ml-6 w-auto p-0 align-middle bg-transparent">
                Add to Cart
              </h3>
            </div>
            <h3>Specifications</h3>
          </div>
        </div>
      </div>
      <div className="bg-[#231F20] h-auto py-[115px] mx-auto text-white px-3">
        <div className="mx-auto flex flex-col gap-10 max-w-[720px]">
          <h2 className="text-[28px] font-semibold leading-[45.3px]">
            Specifications
          </h2>
          {detail?.data?.specifications?.map((data, index) => (
            <div
              className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-10"
              key={index}
            >
              <div className="flex justify-between items-center w-full sm:w-1/3">
                <p className="text-base">{data.title}</p>
                <button
                  className="sm:hidden text-2xl font-bold text-white"
                  onClick={() => toggleItem(index)}
                >
                  {onpenText === index ? "−" : "+"}
                </button>
              </div>

              <p
                className={`text-sm sm:text-base ${
                  onpenText === index ? "block" : "hidden"
                } sm:block sm:w-2/3`}
              >
                {data.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <h2>Sản phẩm liên quan</h2>
        <ProductCart />
      </div>
    </>
  );
};

export default memo(DetailProduct);

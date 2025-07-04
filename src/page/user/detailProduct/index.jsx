import { memo, useEffect, useRef, useState } from "react";
import Quantity from "../../../component/Quantity";
import { useParams } from "react-router-dom";
import * as productService from "../../../services/productService";
import { useQuery } from "@tanstack/react-query";
import RelatedProducts from "../../../component/RelatedProducts";
import formatter from "../../../utils/formatter";

const DetailProduct = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [openText, setOpenText] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const thumbnailRefs = useRef([]);

  const toggleItem = (index) => {
    setOpenText((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    if (thumbnailRefs.current[selectedImageIndex]) {
      thumbnailRefs.current[selectedImageIndex].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [selectedImageIndex]);

  const fetchDetailProduct = async () => {
    const res = await productService.getDetailProduct(id);
    return res;
  };

  const { data: detail = [] } = useQuery({
    queryKey: ["detail", id],
    queryFn: fetchDetailProduct,
    enabled: !!id,
  });

  const handleQuantityChange = (qty) => {
    setQuantity(qty);
  };

  const images = detail?.data?.image || [];

  return (
    <>
      <div className="pt-10 bg-[#F9F9F9] pb-10">
        <div className="max-w-screen-xl mx-auto lg:grid grid-cols-2 px-3">
          {/* Ảnh lớn */}
          <div>
            <img
              src={
                images[selectedImageIndex]
                  ? `${BACKEND_URL}${images[selectedImageIndex]}`
                  : "/placeholder.png"
              }
              alt={detail?.data?.name || "Product Image"}
              className="mx-auto w-[500px] h-[500px] object-contain px-2"
            />

            {/* Ảnh nhỏ */}
            <div
              className={`mx-auto flex gap-3 whitespace-nowrap px-2 py-2 ${
                images.length < 5 ? "justify-center" : ""
              }`}
              style={{
                maxWidth: "400px",
                overflowX: images.length >= 5 ? "auto" : "hidden",
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE
                WebkitOverflowScrolling: "touch", // iOS
              }}
            >
              {images.map((img, idx) => (
                <img
                  ref={(el) => (thumbnailRefs.current[idx] = el)}
                  key={idx}
                  src={`${BACKEND_URL}${img}`}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`inline-block flex-shrink-0 w-20 h-20 object-contain rounded cursor-pointer border-2 transition ${
                    idx === selectedImageIndex
                      ? "border-[#302006] scale-110"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedImageIndex(idx)}
                />
              ))}
            </div>
          </div>

          {/* Thông tin sản phẩm */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[36px] font-semibold text-[#302006]">
              {detail?.data?.name}
            </h2>
            <h3>
              <span className="text-[24px] font-semibold text-[#302006]">
                {formatter(detail?.data?.price)}
              </span>
              <span className="text-[20px] font-light text-[#302006]">
                {" "}
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

      {/* Specifications */}
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
                  {openText === index ? "−" : "+"}
                </button>
              </div>

              <p
                className={`text-sm sm:text-base ${
                  openText === index ? "block" : "hidden"
                } sm:block sm:w-2/3`}
              >
                {data.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <RelatedProducts />
    </>
  );
};

export default memo(DetailProduct);

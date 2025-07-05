import { memo, useState, useEffect } from "react";
import ProductCart from "../../../component/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import * as productService from "../../../services/productService";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";

const ProductPage = () => {
  const [slidesPerView, setSlidesPerView] = useState(4);

  // Lắng nghe thay đổi kích thước window để cập nhật slidesPerView
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 464) setSlidesPerView(1);
      else if (width < 1024) setSlidesPerView(2);
      else setSlidesPerView(4);
    };

    handleResize(); // gọi lần đầu
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchAllProduct = async () => {
    const response = await productService.getAllProduct();
    return response;
  };

  const { data: products = [] } = useQuery({
    queryKey: ["product"],
    queryFn: fetchAllProduct,
  });

  const productss = products?.data || [];

  // Loop chỉ bật khi số sản phẩm nhiều hơn slidesPerView
  const canLoop = productss.length > slidesPerView;

  return (
    <>
      <div className="bg-[#F6F6F6] py-10 px-10 text-left">
        <h2 className="uppercase text-[#302006] font-semibold">Our Wines</h2>
        <p className="text-[#302006] mb-6 font-normal mt-5">
          Explore our wine store and discover your favourite drops of Fowles
          wine!
        </p>
      </div>
      <div className="px-10">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={slidesPerView}
          loop={canLoop}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={20000}
          grabCursor={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            464: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {productss.map((item) => (
            <SwiperSlide key={item._id}>
              <ProductCart
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image[0]}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default memo(ProductPage);

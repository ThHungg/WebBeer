import { memo, useRef } from "react";
import ProductCart from "../../../component/ProductCart";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import * as productService from "../../../services/productService";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";
import { ROUTERS } from "../../../utils/router";
import { Link } from "react-router-dom";
const ProductPage = () => {
  const sliderRef = useRef(null);

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0, // delay nhỏ hơn 0
    cssEase: "linear",
    arrows: false,
    pauseOnHover: false, // tắt cơ chế pause mặc định
    swipeToSlide: true,
    draggable: true,
  };

  const fetchAllProduct = async () => {
    const response = await productService.getAllProduct();
    return response;
  };

  const { data: products = [] } = useQuery({
    queryKey: ["product"],
    queryFn: fetchAllProduct,
  });
  console.log(products);

  const productss = products?.data;
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
          slidesPerView={4}
          loop={true}
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
          {productss?.map((item, index) => (
            <SwiperSlide key={index}>
              <Link to={`${ROUTERS.USER.DETAILPRODUCT}/${item._id}`}>
                <ProductCart
                  name={item.name}
                  price={item.price}
                  image={item.image[0]}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default memo(ProductPage);

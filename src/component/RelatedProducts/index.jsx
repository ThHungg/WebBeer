import { memo } from "react";
import ProductCart from "../ProductCard";
import * as productService from "../../services/productService";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ROUTERS } from "../../utils/router";
import { Link } from "react-router-dom";

const RelatedProduct = () => {
  const fetchGetRelated = async () => {
    const res = await productService.getRandomProduct();
    return res;
  };
  const { data: related = [] } = useQuery({
    queryKey: ["related"],
    queryFn: fetchGetRelated,
  });

  console.log(related);
  return (
    <>
      <div className="p-7">
        <h2 className="text-[32px] text-[#302006] font-semibold leading-none tracking-[-2px]">
          Một số sản phẩm bạn có thể thích{" "}
        </h2>
        <div className="mt-3">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={4}
            loop={related?.data?.length >= 4}
            autoplay={{
              delay: 0, // ✅ KHÔNG delay
              disableOnInteraction: false,
              pauseOnMouseEnter: false, // ❌ KHÔNG pause khi hover
            }}
            speed={5000} // ✅ tốc độ cuộn (ms)
            grabCursor={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              464: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {related?.data?.map((item, index) => (
              <SwiperSlide key={index}>
                {/* <Link to={`${ROUTERS.USER.DETAILPRODUCT}/${item._id}`}> */}
                <ProductCart
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image[0]}
                />
                {/* </Link> */}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default memo(RelatedProduct);

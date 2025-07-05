import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
// import "./index.css";

import * as aboutService from "../../../services/viewPage/aboutPageService";
import { useQuery } from "@tanstack/react-query";
import { getFullImageUrl } from "../../../utils/getFullImg";

const AboutPage = () => {
  const fetchAbout = async () => {
    const res = await aboutService.getHomePage();
    return res;
  };

  const { data: abouts = [] } = useQuery({
    queryKey: ["about"],
    queryFn: fetchAbout,
  });

  if (!abouts?.data || abouts.data.length === 0) {
    return <div className="text-center py-10">Đang tải dữ liệu...</div>;
  }
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-12">
          <div className="w-11/12 mx-auto">
            <img
              src={getFullImageUrl(abouts.data[0].banner.image)}
              alt=""
              className="w-full h-[370px] md:max-h-[460px] rounded-br-[300px] object-cover rounded-xl"
            />
            <div className="bg-[#FBF8F4] w-full md:w-[720px] md:ml-12 rounded-xs mx-auto px-6 md:px-[40px] py-6 md:py-[40px] mt-0 md:-mt-[140px] relative z-10">
              <h2 className="text-[#302006] mb-[30px] text-[32px] leading-[130%] font-bold font-trend">
                {abouts.data[0].banner.title}
              </h2>
              <p className="mt-5 text-left w-full max-w-[1000px] text-[#272625] text-[16px] leading-[24px] mb-[36px] font-avant">
                {abouts.data[0].banner.description}
              </p>
              <button className="bg-[#302006] text-white px-6 py-4 font-semibold text-[16px] no-underline border border-[#302006] w-fit">
                {abouts.data[0].banner.button.text}
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-4 my-10 space-y-5 p-2">
          {abouts.data[0].description.map((data, index) => (
            <p className="text-center text-[#302006] text-[16px] flex-nowrap">
              {data}
            </p>
          ))}
          <p className="text-center text-[#302006] text-[16px]"></p>
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-4">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
            // {getFullImageUrl(abouts.data[0].banner.image)}
          >
            {abouts.data[0].carouselImages.map((img, index) => (
              <SwiperSlide>
                <img
                  src={getFullImageUrl(img)}
                  alt=""
                  className="w-full h-[350px] object-cover rounded-2xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <p className="text-center">{abouts.data[0].estDate}</p>
        </div>
      </div>
    </>
  );
};

export default memo(AboutPage);

import { memo, useEffect } from "react";
import "./indedx.css";
import AOS from "aos";
import "aos/dist/aos.css";
import * as homeService from "../../../services/viewPage/homePageService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
import { EffectCreative } from "swiper/modules";
const HomePage = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    AOS.init({ duration: 2000, once: true });
  }, []);

  const fetchAllData = async () => {
    const res = await homeService.getHomePage();
    return res;
  };

  const {
    data: homes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["homes"],
    queryFn: fetchAllData,
  });

  // if (isLoading) return <div>Loading...</div>;
  // if (isError || !homes) return <div>Đã có lỗi hoặc không có dữ liệu</div>;

  const homeData = homes?.data;

  const getFullImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http") || path.startsWith("https")) return path;
    return BACKEND_URL + path;
  };

  const settings = {
    dots: true,
    infinite: homeData?.carouselImages.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="grid grid-cols-12">
        {/* Banner */}
        <div className="col-span-12">
          <div className="w-11/12 mx-auto">
            <img
              src={getFullImageUrl(homeData?.banner?.image)}
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              alt=""
              className="w-full h-[370px] md:max-h-[460px] rounded-br-[300px] object-cover rounded-xl"
            />
            <div className="bg-[#FBF8F4] w-full md:w-[720px] md:ml-12 rounded-xs mx-auto px-6 md:px-[40px] py-6 md:py-[40px] mt-0 md:-mt-[140px] relative z-10">
              <h2 className="text-[#302006] mb-[30px] text-[32px] leading-[130%] font-bold font-trend">
                {homeData?.banner?.title}
              </h2>
              <p className="mt-5 text-left w-full max-w-[1000px] text-[#272625] text-[16px] leading-[24px] mb-[36px] font-avant">
                {homeData?.banner?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Sections */}
        {homeData?.sections && homeData?.sections.length > 0 && (
          <div className="col-span-12 md:col-span-10 md:col-start-2 mt-5">
            {homeData?.sections.map((section, index) => {
              const isImageLeft = section.imagePosition === "left";

              return (
                <div
                  key={section._id || index}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-11/12 mx-auto mb-16"
                >
                  {isImageLeft && (
                    <>
                      <div>
                        <img
                          src={getFullImageUrl(section.imageUrl)}
                          alt={section.title}
                          data-aos="fade-down"
                          className="w-full pl-0 md:pl-12 h-[600px] md:h-[680px] object-cover rounded-tl-[300px] rounded-xs"
                        />
                      </div>
                      <div className="flex flex-col items-center md:justify-center justify-center">
                        <h2 className="text-[#302006] font-trend text-[30px] font-bold leading-[130%] mb-4">
                          {section.title}
                        </h2>
                        <p className="font-avant text-[16px] leading-[24px] md:w-[433px] text-[#272625]">
                          {section.description}
                        </p>
                        {section.button && (
                          <a
                            href={section.button.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-10 px-6 py-2 border border-[#b28a4a] text-[#3a2a0f] text-sm font-normal hover:bg-[#b28a4a] hover:text-white transition-colors w-max"
                          >
                            {section.button.text}
                          </a>
                        )}
                      </div>
                    </>
                  )}

                  {!isImageLeft && (
                    <>
                      <div className="lg:order-last">
                        <img
                          src={getFullImageUrl(section.imageUrl)}
                          alt={section.title}
                          data-aos="fade-down"
                          className="w-full pl-0 md:pr-12 lg:h-[680px] h-[600px] object-cover rounded-tr-[300px] rounded-xs"
                        />
                      </div>
                      <div className="flex flex-col px-2 items-center justify-center md:px-5 lg:order-first">
                        <h2 className="text-[#302006] font-trend text-[30px] font-bold leading-[130%] mb-4">
                          {section.title}
                        </h2>
                        <p className="font-avant text-[16px] leading-[24px] md:w-[433px] text-[#272625]">
                          {section.description}
                        </p>
                        {section.button && (
                          <a
                            href={section.button.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-10 px-6 py-2 border border-[#b28a4a] text-[#3a2a0f] text-sm font-normal hover:bg-[#b28a4a] hover:text-white transition-colors w-max"
                          >
                            {section.button.text}
                          </a>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Carousel */}
      <div className="mt-10 grid grid-cols-12">
        <div className="col-span-10 col-start-2">
          <Swiper
            grabCursor={true}
            loop={true}
            effect={"creative"}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: [0, 0, -400],
              },
              next: {
                translate: ["100%", 0, 0],
              },
            }}
            modules={[EffectCreative]}
            className="mySwiper"
          >
            {homeData?.carouselImages?.map((image, key) => (
              <SwiperSlide key={key}>
                <div className="w-full overflow-hidden rounded-xl">
                  <img
                    src={getFullImageUrl(image)}
                    alt=""
                    className="w-full h-[450px] object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default memo(HomePage);

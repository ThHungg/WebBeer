import { memo } from "react";
import "./indedx.css";
import * as homeService from "../../../services/viewPage/homePageService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const fetchAllData = async () => {
    const res = await homeService.getHomePage();
    return res;
  };

  const { data: homes = [] } = useQuery({
    queryKey: ["homes"],
    queryFn: fetchAllData,
  });

  console.log(homes);
  console.log(homes?.data?.[0].carouselImages);
  return (
    <>
      <div className="grid grid-cols-12 mt-[40px]">
        {/* PHẦN ẢNH & OUR PORTFOLIO */}
        <div className="col-span-12">
          <div className="w-11/12 mx-auto">
            <img
              src={homes?.data?.[0].banner.image}
              alt=""
              className="w-full h-[370px] md:max-h-[460px] rounded-br-[300px] object-cover rounded-xl"
            />
            <div className="bg-[#FBF8F4] w-full md:w-[720px] md:ml-12 rounded-xs mx-auto px-6 md:px-[40px] py-6 md:py-[40px] mt-0 md:-mt-[140px] relative z-10">
              <h2 className="text-[#302006] mb-[30px] text-[32px] leading-[130%] font-bold font-trend">
                {homes?.data?.[0].banner.title}
              </h2>
              <p className="mt-5 text-left w-full max-w-[1000px] text-[#272625] text-[16px] leading-[24px] mb-[36px] font-avant">
                {homes?.data?.[0].banner.description}
              </p>
            </div>
          </div>
        </div>

        {/* PHẦN THÔNG TIN 1 */}
        {homes?.data?.[0]?.sections && homes.data[0].sections.length === 4 && (
          <>
            {[0, 2].map((startIndex) => {
              const section1 = homes.data[0].sections[startIndex];
              const section2 = homes.data[0].sections[startIndex + 1];
              return (
                <div
                  key={startIndex}
                  className="col-span-12 md:col-span-10 md:col-start-2 mt-5"
                >
                  {/* Section 1: ảnh trái, nội dung phải */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-11/12 mx-auto">
                    <div className="">
                      <img
                        src={section1.imageUrl}
                        alt={section1.title}
                        className="w-full pl-0 md:pl-12 h-[600px] md:h-[680px] object-cover rounded-tl-[300px] rounded-xs"
                      />
                    </div>
                    <div className="flex flex-col items-center md:justify-center justify-center">
                      <h2 className="text-[#302006] font-trend text-[30px] font-bold leading-[130%] mb-4">
                        {section1.title}
                      </h2>
                      <p className="font-avant text-[16px] leading-[24px] md:w-[433px] text-[#272625]">
                        {section1.description}
                      </p>
                      {section1.button && (
                        <a
                          href={section1.button.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-10 px-6 py-2 border border-[#b28a4a] text-[#3a2a0f] text-sm font-normal hover:bg-[#b28a4a] hover:text-white transition-colors w-max"
                        >
                          {section1.button.text}
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Section 2: ảnh phải, nội dung trái */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-11/12 mx-auto mt-12">
                    <div className="lg:order-last">
                      <img
                        src={section2.imageUrl}
                        alt={section2.title}
                        className="w-full pl-0 md:pr-12 lg:h-[680px] h-[600px] object-cover rounded-tr-[300px] rounded-xs"
                      />
                    </div>
                    <div className="flex flex-col px-2 items-center justify-center md:px-5 lg:order-first">
                      <h2 className="text-[#302006] font-trend text-[30px] font-bold leading-[130%] mb-4">
                        {section2.title}
                      </h2>
                      <p className="font-avant text-[16px] leading-[24px] md:w-[433px] text-[#272625]">
                        {section2.description}
                      </p>
                      {section2.button && (
                        <a
                          href={section2.button.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-10 px-6 py-2 border border-[#b28a4a] text-[#3a2a0f] text-sm font-normal hover:bg-[#b28a4a] hover:text-white transition-colors w-max"
                        >
                          {section2.button.text}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
      <div className="mt-10 grid grid-cols-12">
        <div className="col-span-10 col-start-2">
          {" "}
          <Slider {...settings}>
            {homes?.data?.[0]?.carouselImages?.map((image, key) => (
              <div key={key}>
                <img
                  src={image}
                  alt=""
                  className="w-full object-cover h-[210px] lg:h-[560px]"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default memo(HomePage);

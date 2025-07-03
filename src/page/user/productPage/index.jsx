import { memo } from "react";
import ProductCart from "../../../component/ProductCart";

const ProductPage = () => {
  return (
    <>
      <div className="bg-[#F6F6F6] h-auto py-10 px-10 text-left">
        <h2 className="uppercase text-[#302006] font-semibold">Our Wines</h2>
        <p className="text-[#302006] leading-none mb-6 font-normal mt-5">
          Explore our wine store and discover your favourite drops of Fowles
          wine! We’re delighted to offer FREE shipping Australia-wide on all
          orders of $250 or more. For all other orders we’ll deliver our
          award-winning wines to your door for a flat rate of $20. Fowles Online
          store is for Australian residence only. For international sales,
          please enquire via our form here
        </p>
      </div>
      <div>
        <ProductCart />
      </div>
    </>
  );
};

export default memo(ProductPage);

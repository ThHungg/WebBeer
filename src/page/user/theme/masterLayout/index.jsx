import { memo, useEffect, useRef, useState } from "react";
import Header from "../header";
import Footer from "../footer";
import CartSlidebar from "../../../../component/CartSlidebar";
import { useCart } from "../../../../utils/cartContext";

const MasterLayout = ({ children, ...props }) => {
  const { isCartOpen, setIsCartOpen } = useCart();
  const lastScrollY = useRef(0);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div {...props}>
      <Header isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <CartSlidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default memo(MasterLayout);

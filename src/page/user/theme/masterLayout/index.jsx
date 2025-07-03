import { memo, useEffect, useState, useRef } from "react";
import Footer from "../footer";
import Header from "../header";

const MasterLayout = ({ children, ...props }) => {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Cuộn xuống và đã cuộn hơn 100px thì ẩn header
        setShowHeader(false);
      } else {
        // Cuộn lên thì hiện header
        setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div {...props}>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            transition: "transform 0.3s ease",
            transform: showHeader ? "translateY(0)" : "translateY(-100%)",
          }}
        >
          <Header />
        </div>
        <main style={{ paddingTop: "70px" }}>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default memo(MasterLayout);

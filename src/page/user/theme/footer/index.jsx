import { memo } from "react";
import HotTopics from "../../../../component/Footer/HotTopics";
import CompanyAddress from "../../../../component/Footer/CompanyAddress";

const Footer = () => {
  return (
    <>
      <HotTopics />
      <CompanyAddress/>
      <div>Đây là footer</div>
    </>
  );
};

export default memo(Footer);

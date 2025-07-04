import { memo } from "react";

const NewsCard = ({ image, title, summary, date }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-[#302006] text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-700 text-sm flex-grow">{summary}</p>
        <p className="text-gray-500 text-xs mt-4">{date}</p>
      </div>
    </div>
  );
};

export default memo(NewsCard);

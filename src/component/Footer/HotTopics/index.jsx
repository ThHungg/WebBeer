import { memo } from "react";
import NewsCard from "../../NewsCard";

const HotTopics = () => {
  const newsData = [
    {
      id: 1,
      image:
        "https://www.fowleswine.com/wp-content/uploads/2025/06/Rectangle_July25_EDM_Banner_950x570_Salami25.gif",
      title: "Khám phá nghệ thuật làm rượu vang",
      summary:
        "Tìm hiểu quá trình tạo nên một chai rượu vang từ vườn nho đến ly rượu của bạn.",
      date: "01/07/2025",
    },
    {
      id: 2,
      image:
        "https://www.fowleswine.com/wp-content/uploads/2025/06/Rectangle_July25_EDM_Banner_950x570_BATSNAVS.gif",
      title: "Vùng đất nổi tiếng với rượu vang",
      summary:
        "Cùng khám phá những vùng đất trứ danh trên thế giới với truyền thống làm rượu lâu đời.",
      date: "28/06/2025",
    },
    {
      id: 3,
      image:
        "https://www.fowleswine.com/wp-content/uploads/2025/05/Rectangle_July25_EDM_Banner_950x570_SchoolHolidaysJuly.png",
      title: "Rượu vang và nghệ thuật bảo quản",
      summary:
        "Lưu trữ rượu vang đúng cách giúp bảo toàn hương vị và kéo dài tuổi thọ của rượu.",
      date: "20/06/2025",
    },
  ];
  return (
    <>
      <div className="mx-10">
        <div className="flex justify-between">
          <h1>Đây là tin tức nổi bật</h1>
          <button>Đọc thêm</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData.map((item) => (
            <NewsCard
              key={item.id}
              image={item.image}
              title={item.title}
              summary={item.summary}
              date={item.date}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default memo(HotTopics);

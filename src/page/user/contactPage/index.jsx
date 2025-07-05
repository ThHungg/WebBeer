import { memo, useState } from "react";
import { useMutationHooks } from "../../../hooks/useMutation";
import * as contactService from "../../../services/contactService";
import { toast, ToastContainer } from "react-toastify";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const mutation = useMutationHooks(
    (data) => contactService.sendContact(data),
    {
      onSuccess: (data) => {
        if (data.status === "Ok") {
          toast.success(data.message);
          setTimeout(() => {
            window.location.reload();
          }, [1000]);
        } else {
          toast.error(data.message);
        }
      },
      onError: (error) => {
        const errMsg =
          error?.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại";
        toast.error(errMsg);
      },
    }
  );

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSendContact = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };
  return (
    <>
      <div className="grid grid-cols-12 mt-[40px]">
        {/* Banner + giới thiệu */}
        <div className="col-span-12">
          <div className="w-11/12 mx-auto">
            <img
              src="https://www.fowleswine.com/wp-content/uploads/2024/02/contact-us.jpg"
              alt=""
              className="w-full h-[370px] md:max-h-[460px] rounded-br-[300px] object-cover rounded-xl"
            />
            <div className="bg-[#FBF8F4] w-full md:w-[720px] md:ml-12 rounded-xs mx-auto px-6 md:px-[40px] py-6 md:py-[40px] mt-0 md:-mt-[140px] relative z-10">
              <h2 className="text-[#302006] mb-[30px] text-[32px] leading-[130%] font-bold font-trend">
                Drop us a line, we’d love to hear from you
              </h2>
              <p className="mt-5 text-left w-full max-w-[1000px] text-[#272625] text-[16px] leading-[24px] mb-[36px] font-avant">
                Have a question or query or simply want to get in touch? At
                Fowles we’re always happy to hear from you.
              </p>
            </div>
          </div>
        </div>

        {/* Form liên hệ */}
        <div className="col-span-12">
          <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Form */}
            <div className="flex flex-col gap-6">
              <h2 className="text-[#302006] text-[20px] font-bold">
                Bạn có câu hỏi nào không?
              </h2>
              <p className="text-[#302006] text-[16px] leading-6">
                Nếu bạn có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi
                qua biểu mẫu này. Chúng tôi sẽ phản hồi bạn trong thời gian sớm
                nhất.
              </p>
              <form
                onSubmit={handleSendContact}
                className="flex flex-col gap-5"
              >
                <div className="flex flex-col">
                  <label className="text-[#302006] font-medium mb-1">
                    Họ và tên
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Nhập họ và tên"
                    className="border border-[#ccc] px-4 py-3 rounded outline-none focus:ring-2 focus:ring-[#302006]"
                    value={formData.name}
                    onChange={handleOnChange}
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[#302006] font-medium mb-1">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Nhập email"
                    className="border border-[#ccc] px-4 py-3 rounded outline-none focus:ring-2 focus:ring-[#302006]"
                    value={formData.email}
                    onChange={handleOnChange}
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[#302006] font-medium mb-1">
                    Số điện thoại
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Nhập số điện thoại"
                    className="border border-[#ccc] px-4 py-3 rounded outline-none focus:ring-2 focus:ring-[#302006]"
                    value={formData.phone}
                    onChange={handleOnChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[#302006] font-medium mb-1">
                    Tiêu đề yêu cầu
                  </label>
                  <select
                    name="subject"
                    className="border border-[#ccc] px-4 py-3 rounded outline-none focus:ring-2 focus:ring-[#302006]"
                    value={formData.subject}
                    onChange={handleOnChange}
                    required
                  >
                    <option value="">-- Chọn tiêu đề yêu cầu --</option>
                    <option value="Câu hỏi về sản phẩm">
                      Câu hỏi về sản phẩm
                    </option>
                    <option value="Yêu cầu hỗ trợ kỹ thuật">
                      Yêu cầu hỗ trợ kỹ thuật
                    </option>
                    <option value="Khiếu nại / góp ý">Khiếu nại / góp ý</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-[#302006] font-medium mb-1">
                    Nội dung tin nhắn
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Nhập nội dung tin nhắn"
                    className="border border-[#ccc] px-4 py-3 rounded outline-none focus:ring-2 focus:ring-[#302006]"
                    value={formData.message}
                    onChange={handleOnChange}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-[#302006] text-white px-6 py-3 rounded font-semibold w-fit"
                >
                  Gửi liên hệ
                </button>
              </form>
            </div>

            {/* Hình ảnh bên phải */}
            <div className="flex items-center justify-center">
              <img
                src="http://file.hstatic.net/200000939997/article/cac_loai_bia_va_gia_moi_nhat_tai_viet_nam__1__ee2d556d8b2549c3988c500db44f2a78.jpg"
                alt="Thông tin liên hệ"
                className="w-full rounded-xl object-cover max-h-[500px]"
              />
            </div>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
};

export default memo(ContactPage);

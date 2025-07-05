import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { ROUTERS } from "../../utils/router";
import { memo, useState } from "react";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import * as cartService from "../../services/cartService";
import Quantity from "../Quantity";
import { getUserId } from "../../utils/getUserId";
import { useQuery } from "@tanstack/react-query";
import { getFullImageUrl } from "../../utils/getFullImg";
import formatter from "../../utils/formatter";
import { toast } from "react-toastify";

const CartSidebar = ({ isOpen, onClose }) => {
  const id = getUserId();
  const [quantity, setQuantity] = useState({});
  const fetchCart = async () => {
    const res = await cartService.getCart(id);
    return res;
  };

  const { data: cart = [], refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
    staleTime: 0,
  });

  const handleQuantityChange = async (productId, newQuantity) => {
    setQuantity((prev) => ({
      ...prev,
      [productId]: Number(newQuantity) || 1,
    }));
    const res = await cartService.updateCart(id, productId, newQuantity);
    refetch();
    return res;
  };

  const handleRemove = async (productId) => {
    try {
      const res = await cartService.removeItemCart(id, productId);
      if (res.status === "Ok") {
        toast.success(res.message);
        refetch();
      } else {
        toast.error(res.message);
      }
      return res;
    } catch (e) {
      const errMsg = e?.response?.data?.message || "Xóa sản phẩm thất bại!";
      toast.error(errMsg);
      return null;
    }
  };
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[1001]"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 h-screen w-5/6 sm:w-[350px] bg-white z-[1002] shadow-lg
        transform transition-transform duration-500 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center px-5 py-4 border-b">
            <h2 className="text-xl font-bold">Giỏ hàng</h2>
            <button onClick={onClose} className="text-gray-600 text-2xl">
              <X />
            </button>
          </div>

          {/* Nội dung giỏ hàng */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Item 1 */}
            {cart?.data?.products?.map((cartItem, key) => (
              <div
                key={cartItem.productId._id}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  <div className="relative">
                    <img
                      src={getFullImageUrl(cartItem.productId.image[0])}
                      alt="Sản phẩm"
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                    {/* <span className="absolute -top-2 -right-2 h-6 w-6 bg-gray-200 text-gray-800 text-xs flex items-center justify-center rounded-full">
                      2
                    </span> */}
                  </div>

                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 leading-tight">
                        {cartItem.productId.name}
                      </h3>
                      <p className="text-lg font-bold text-[#302006] mt-1">
                        {formatter(cartItem.price)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Quantity
                          quantity={cartItem.quantity}
                          setQuantity={(newQty) =>
                            handleQuantityChange(cartItem.productId._id, newQty)
                          }
                        />
                      </div>
                      <button
                        onClick={() => handleRemove(cartItem.productId._id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Separator */}
            <div className="border-t">Subtotal</div>
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t">
            <Link
              to={ROUTERS.USER.CART}
              className="block w-full text-center bg-[#302006] text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Xem giỏ hàng
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(CartSidebar);

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartContext.Provider value={{ isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook để dễ dùng
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

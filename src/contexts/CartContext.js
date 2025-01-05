import React, {createContext, useState, useContext} from 'react';

const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.product.id === product.id,
      );
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? {...item, quantity: item.quantity + quantity}
            : item,
        );
      }
      return [...prevItems, {product, quantity}];
    });
  };

  const removeFromCart = productId => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.product.id !== productId),
    );
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId ? {...item, quantity} : item,
      ),
    );
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

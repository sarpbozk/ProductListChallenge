import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();
const CART_STORAGE_KEY = 'cart_storage';

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCart = async updatedCart => {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.product.id === product.id,
      );

      let updatedItems;
      if (existingItem) {
        updatedItems = prevItems.map(item =>
          item.product.id === product.id
            ? {...item, quantity: item.quantity + quantity}
            : item,
        );
      } else {
        updatedItems = [...prevItems, {product, quantity}];
      }

      // Save to AsyncStorage
      saveCart(updatedItems);
      return updatedItems;
    });
  };

  const removeFromCart = async productId => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(
        item => item.product.id !== productId,
      );
      // Save to AsyncStorage
      saveCart(updatedItems);
      return updatedItems;
    });
  };

  const updateQuantity = async (productId, quantity) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.product.id === productId ? {...item, quantity} : item,
      );
      saveCart(updatedItems);
      return updatedItems;
    });
  };

  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem(CART_STORAGE_KEY);
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
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
        clearCart,
        isLoading,
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

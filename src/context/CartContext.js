import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Helper function to get the LATEST stock for a single product
  const getLatestStock = async (productId) => {
    // Only fetch stock for store products (numeric IDs)
    if (typeof productId !== 'number') return Infinity; // Assume menu drinks have infinite stock
    try {
      const response = await axios.get(`/api/products/${productId}`);
      return response.data.stock_quantity;
    } catch (error) {
      console.error(`Failed to fetch stock for product ${productId}`, error);
      return 0; // If fetch fails, assume 0 stock to be safe
    }
  };

  const addToCart = async (product) => {
    // Before adding, get the most up-to-date stock
    const latestStock = await getLatestStock(product.id);

    setCartItems(prevItems => {
      const itemExists = prevItems.find(item => item.id === product.id);

      if (itemExists) {
        // If item exists, only increase quantity if it's less than the latest stock
        if (itemExists.quantity < latestStock) {
          return prevItems.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1, stock: latestStock } : item
          );
        } else {
          // If we can't add more, just return the items as they are (and maybe show a message)
          console.log(`Cannot add more of ${product.name}. Max stock reached.`);
          return prevItems;
        }
      }
      
      // If adding for the first time, only add if stock is available
      if (latestStock > 0) {
        return [...prevItems, { ...product, quantity: 1, stock: latestStock }];
      } else {
        console.log(`${product.name} is out of stock.`);
        return prevItems;
      }
    });
  };

  const increaseQuantity = async (productId) => {
    const latestStock = await getLatestStock(productId);

    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === productId) {
          // Only increase if the new quantity is not more than the latest stock
          const newQuantity = Math.min(item.quantity + 1, latestStock);
          return { ...item, quantity: newQuantity, stock: latestStock };
        }
        return item;
      })
    );
  };
  




  const decreaseQuantity = (productId) => {
    setCartItems(prevItems => {
      const itemToDecrease = prevItems.find(item => item.id === productId);

      if (itemToDecrease.quantity === 1) {
        // If quantity is 1, remove the item from the cart
        return prevItems.filter(item => item.id !== productId);
      } else {
        // Otherwise, just decrease the quantity
        return prevItems.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
};


  // You can add more functions here later (e.g., removeFromCart, decreaseQuantity)
  const clearCart = () => {
    setCartItems([]);
  };
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const value = {
    cartItems,
    isCartOpen,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    openCart,
    closeCart,
    
  };
 
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
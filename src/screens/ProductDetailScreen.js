import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CartPanel from '../sections/CartPanel';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import ProductHeader from '../sections/ProductHeader';
import ProductMoreDetails from '../sections/ProductMoreDetails';
import ProductCarousel from '../sections/ProductCarousel';
import CtaSection from '../sections/CtaSection';

const ProductDetailScreen = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (product) {
      console.log("Full product data in Detail Screen:", product);
    }
  }, [product]);

  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true);
      try {
        // --- 1. Fetch the main product using the new single-product API endpoint ---
        const productResponse = await axios.get(`/api/products/${productId}`);
        const currentProduct = productResponse.data;
        setProduct(currentProduct);

        // --- 2. Fetch ALL products to find similar ones ---
        // In a more advanced setup, you might create a specific API endpoint for this.
        if (currentProduct) {
          const allProductsResponse = await axios.get('/api/products');
          const similar = allProductsResponse.data.filter(
            p => p.category === currentProduct.category && p.id !== currentProduct.id
          );
          setSimilarProducts(similar);
        }
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [productId]); // Re-run this effect if the user navigates to a new product page

  if (isLoading) {
    return (
        <>
            <Navbar />
            <div style={{ textAlign: 'center', padding: '4rem' }}>Loading product...</div>
            <Footer />
        </>
    );
  }

  if (!product) {
    return (
        <>
            <Navbar />
            <div style={{ textAlign: 'center', padding: '4rem' }}>
                <h2>Product not found.</h2>
            </div>
            <Footer />
        </>
    );
  }

  return (
    <>
      <Navbar />
      <CartPanel />
      <main className="page-content">
       <ProductHeader product={product} />
        {/* --- FIX: Use snake_case for more_details --- */}
        <ProductMoreDetails details={product.more_details} />
        
        {similarProducts.length > 0 && (
          <ProductCarousel title="Similar Products" products={similarProducts} />
        )}
      </main>
      <CtaSection />
      <Footer />
    </>
  );
};

export default ProductDetailScreen;
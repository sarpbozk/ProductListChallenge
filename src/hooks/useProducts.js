import {useState, useEffect, useCallback} from 'react';
import {fetchProducts} from '../api/products';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState(null);
  const [filterBrand, setFilterBrand] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = useCallback(() => {
    let result = [...products];

    // Filter by brand
    if (filterBrand) {
      result = result.filter(product =>
        (product.brand || '').toLowerCase().includes(filterBrand.toLowerCase()),
      );
    }

    // Search by title or description
    if (searchQuery) {
      result = result.filter(
        product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Sort
    if (sortOption) {
      result.sort((a, b) => {
        switch (sortOption) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'rating-asc':
            return a.rating - b.rating;
          case 'rating-desc':
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
    }

    setFilteredProducts(result);
  }, [products, filterBrand, searchQuery, sortOption]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return {
    products: filteredProducts,
    loading,
    error,
    setFilterBrand,
    setSearchQuery,
    setSortOption,
    refreshProducts: loadProducts,
  };
};

import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useProducts} from '../hooks/useProducts';
import {useFavorites} from '../contexts/FavoritesContext';
import {useCart} from '../contexts/CartContext';
import ProductCard from '../components/common/ProductCard';
import ProductFilters from '../components/products/ProductFilters';
import ProductSort from '../components/products/ProductSort';
import ProductSearch from '../components/products/ProductSearch';

const ProductListScreen = () => {
  const navigation = useNavigation();
  const {
    products,
    loading,
    error,
    setFilterBrand,
    setSearchQuery,
    setSortOption,
    refreshProducts,
  } = useProducts();
  const {isFavorite, toggleFavorite} = useFavorites();
  const {addToCart} = useCart();

  const renderHeader = () => (
    <View style={styles.header}>
      <ProductSearch onSearch={setSearchQuery} />
      <View style={styles.filterSortContainer}>
        <ProductFilters onFilterChange={setFilterBrand} />
        <ProductSort onSortChange={setSortOption} />
      </View>
      <View style={styles.navigationIcons}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Favorites')}>
          <Icon name="favorite" size={24} color="#f4511e" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Cart')}>
          <Icon name="shopping-cart" size={24} color="#f4511e" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem = ({item}) => (
    <ProductCard
      product={item}
      isFavorite={isFavorite(item.id)}
      onFavoritePress={() => toggleFavorite(item)}
      onAddToCart={() => addToCart(item)}
      onPress={() =>
        navigation.navigate('ProductDetail', {
          product: item,
          allProducts: products,
        })
      }
    />
  );

  if (loading) {
    return (
      <ActivityIndicator style={styles.loader} size="large" color="#f4511e" />
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error}</Text>
        <TouchableOpacity onPress={refreshProducts}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterSortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  navigationIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  iconButton: {
    marginLeft: 16,
    padding: 8,
  },
  listContent: {
    paddingBottom: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryText: {
    color: '#f4511e',
    marginTop: 8,
    fontWeight: 'bold',
  },
});

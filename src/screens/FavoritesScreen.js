import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useFavorites} from '../contexts/FavoritesContext';
import {useCart} from '../contexts/CartContext';
import ProductCard from '../components/common/ProductCard';
import {useTheme} from '../contexts/ThemeContext';

const FavoritesScreen = ({navigation}) => {
  const {favorites, toggleFavorite} = useFavorites();
  const {addToCart} = useCart();
  const {theme} = useTheme();
  const styles = getStyles(theme);

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="favorite-border" size={64} color={theme.inactive} />
        <Text style={styles.emptyText}>No favorites yet</Text>
        <Text style={styles.emptySubText}>
          Products you favorite will appear here
        </Text>
        <TouchableOpacity
          style={styles.browseButton}
          onPress={() => navigation.navigate('ProductList')}>
          <Text style={styles.browseButtonText}>Browse Products</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={({item}) => (
          <ProductCard
            product={item}
            isFavorite={true}
            onFavoritePress={() => toggleFavorite(item)}
            onAddToCart={() => addToCart(item)}
            onPress={() =>
              navigation.navigate('ProductDetail', {product: item})
            }
          />
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default FavoritesScreen;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    listContent: {
      padding: 8,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme.background,
    },
    emptyText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 16,
      color: theme.secondaryText,
    },
    emptySubText: {
      fontSize: 16,
      color: theme.secondaryText,
      textAlign: 'center',
      marginTop: 8,
    },
    browseButton: {
      backgroundColor: theme.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
      marginTop: 24,
    },
    browseButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '500',
    },
  });

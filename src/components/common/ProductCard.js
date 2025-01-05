import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../contexts/ThemeContext';

const {width} = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const ProductCard = ({
  product,
  isFavorite,
  onFavoritePress,
  onAddToCart,
  onPress,
}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{uri: product.thumbnail}}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
        <Text style={styles.price}>${product.price}</Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={e => {
              e.stopPropagation();
              onFavoritePress();
            }}>
            <Icon
              name={isFavorite ? 'favorite' : 'favorite-border'}
              size={24}
              color={isFavorite ? theme.primary : theme.secondaryText}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconButton, styles.cartButton]}
            onPress={e => {
              e.stopPropagation();
              onAddToCart();
            }}>
            <Icon
              name="add-shopping-cart"
              size={24}
              color={theme.secondaryText}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color={theme.starColor} />
          <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const getStyles = theme =>
  StyleSheet.create({
    card: {
      width: cardWidth,
      backgroundColor: theme.card,
      borderRadius: 8,
      margin: 8,
      elevation: 3,
      shadowColor: theme.cardShadow,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    image: {
      width: '100%',
      height: 150,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    content: {
      padding: 12,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
      color: theme.text,
    },
    description: {
      fontSize: 14,
      color: theme.secondaryText,
      marginBottom: 8,
    },
    price: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.primary, // e.g. '#f4511e' in light theme
      marginBottom: 8,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    iconButton: {
      padding: 4,
    },
    cartButton: {
      backgroundColor: theme.secondaryBackground,
      borderRadius: 4,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    rating: {
      marginLeft: 4,
      fontSize: 14,
      color: theme.secondaryText,
    },
  });

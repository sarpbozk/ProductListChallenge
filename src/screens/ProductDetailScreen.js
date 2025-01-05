import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import QRCode from 'react-native-qrcode-svg';
import {useFavorites} from '../contexts/FavoritesContext';
import {useCart} from '../contexts/CartContext';
import {useTheme} from '../contexts/ThemeContext';

const {width} = Dimensions.get('window');

const ProductDetailScreen = ({route, navigation}) => {
  const {product, allProducts} = route.params;
  const {isFavorite, toggleFavorite} = useFavorites();
  const {addToCart} = useCart();
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const [selectedImage, setSelectedImage] = useState(null);

  const currentIndex = allProducts.findIndex(p => p.id === product.id);
  const totalProducts = allProducts.length;

  const navigateToProduct = direction => {
    let newIndex =
      direction === 'next'
        ? (currentIndex + 1) % totalProducts
        : (currentIndex - 1 + totalProducts) % totalProducts;

    navigation.push('ProductDetail', {
      product: allProducts[newIndex],
      allProducts,
    });
  };

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navigationIndicator}>
        <Text style={styles.navigationText}>
          {currentIndex + 1} / {totalProducts}
        </Text>
      </View>

      <Image
        source={{uri: product.thumbnail}}
        style={styles.mainImage}
        resizeMode="cover"
      />

      <View style={styles.infoContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{product.title}</Text>
          <TouchableOpacity
            onPress={() => toggleFavorite(product)}
            style={styles.favoriteButton}>
            <Icon
              name={isFavorite(product.id) ? 'favorite' : 'favorite-border'}
              size={24}
              color={
                isFavorite(product.id) ? theme.primary : theme.secondaryText
              }
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>${product.price}</Text>
          <Text style={styles.discountedPrice}>
            ${discountedPrice.toFixed(2)}
          </Text>
          <Text style={styles.discount}>-{product.discountPercentage}%</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Icon name="star" size={20} color={theme.starColor} />
            <Text style={styles.detailText}>{product.rating.toFixed(1)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="inventory" size={20} color={theme.secondaryText} />
            <Text style={styles.detailText}>Stock: {product.stock}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="category" size={20} color={theme.secondaryText} />
            <Text style={styles.detailText}>{product.brand}</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imageGallery}>
          {product.images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedImage(image)}>
              <Image
                source={{uri: image}}
                style={styles.thumbnailImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.qrContainer}>
          <Text style={styles.qrTitle}>Product QR Code</Text>
          <QRCode
            value={product.thumbnail}
            size={200}
            backgroundColor="white"
            color="black"
          />
        </View>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}>
          <Icon name="shopping-cart" size={24} color="#fff" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>

        <View style={styles.bottomNavigation}>
          <TouchableOpacity
            style={[
              styles.navButton,
              currentIndex === 0 && styles.navButtonDisabled,
            ]}
            onPress={() => navigateToProduct('prev')}
            disabled={currentIndex === 0}>
            <Icon
              name="arrow-back-ios"
              size={24}
              color={currentIndex === 0 ? theme.inactive : theme.primary}
            />
            <Text
              style={[
                styles.navButtonText,
                currentIndex === 0 && styles.navButtonTextDisabled,
              ]}>
              Previous
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.navButton,
              currentIndex === totalProducts - 1 && styles.navButtonDisabled,
            ]}
            onPress={() => navigateToProduct('next')}
            disabled={currentIndex === totalProducts - 1}>
            <Text
              style={[
                styles.navButtonText,
                currentIndex === totalProducts - 1 &&
                  styles.navButtonTextDisabled,
              ]}>
              Next
            </Text>
            <Icon
              name="arrow-forward-ios"
              size={24}
              color={
                currentIndex === totalProducts - 1
                  ? theme.inactive
                  : theme.primary
              }
            />
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={!!selectedImage} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedImage(null)}>
            <Icon name="close" size={30} color="#fff" />
          </TouchableOpacity>
          {selectedImage && (
            <Image
              source={{uri: selectedImage}}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    navigationIndicator: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 8,
      borderRadius: 20,
      zIndex: 1,
    },
    navigationText: {
      color: '#fff',
      fontSize: 14,
    },
    mainImage: {
      width: '100%',
      height: 300,
      backgroundColor: theme.secondaryBackground,
    },
    infoContainer: {
      padding: 16,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      flex: 1,
      marginRight: 16,
      color: theme.text,
    },
    favoriteButton: {
      padding: 8,
    },
    description: {
      fontSize: 16,
      color: theme.secondaryText,
      marginBottom: 16,
      lineHeight: 24,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    originalPrice: {
      fontSize: 20,
      color: theme.secondaryText,
      textDecorationLine: 'line-through',
      marginRight: 8,
    },
    discountedPrice: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.primary,
      marginRight: 8,
    },
    discount: {
      fontSize: 16,
      color: '#4CAF50',
      fontWeight: '500',
    },
    detailsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    detailItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    detailText: {
      marginLeft: 4,
      fontSize: 16,
      color: theme.secondaryText,
    },
    imageGallery: {
      marginBottom: 16,
    },
    thumbnailImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 8,
      backgroundColor: theme.secondaryBackground,
    },
    qrContainer: {
      alignItems: 'center',
      marginVertical: 16,
    },
    qrTitle: {
      fontSize: 18,
      fontWeight: '500',
      marginBottom: 12,
      color: theme.text,
    },
    addToCartButton: {
      backgroundColor: theme.primary,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      borderRadius: 8,
      marginTop: 16,
    },
    addToCartText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '500',
      marginLeft: 8,
    },
    bottomNavigation: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 16,
      marginTop: 16,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    navButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
      borderRadius: 8,
    },
    navButtonDisabled: {
      opacity: 0.5,
    },
    navButtonText: {
      fontSize: 16,
      color: theme.primary,
      marginHorizontal: 8,
    },
    navButtonTextDisabled: {
      color: theme.inactive,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: theme.modalBackground,
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeButton: {
      position: 'absolute',
      top: 40,
      right: 20,
      zIndex: 1,
    },
    fullScreenImage: {
      width: width,
      height: width,
    },
  });

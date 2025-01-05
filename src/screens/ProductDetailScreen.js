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

const {width} = Dimensions.get('window');

const ProductDetailScreen = ({route, navigation}) => {
  const {product} = route.params;
  const {isFavorite, toggleFavorite} = useFavorites();
  const {addToCart} = useCart();
  const [selectedImage, setSelectedImage] = useState(null);

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  const handleAddToCart = () => {
    addToCart(product);
    // Here you can add a toast or feedback for user
  };

  return (
    <ScrollView style={styles.container}>
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
              color={isFavorite(product.id) ? '#f4511e' : '#666'}
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
            <Icon name="star" size={20} color="#FFD700" />
            <Text style={styles.detailText}>{product.rating.toFixed(1)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="inventory" size={20} color="#666" />
            <Text style={styles.detailText}>Stock: {product.stock}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="category" size={20} color="#666" />
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
      </View>

      {/* Full Screen Image Modal */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainImage: {
    width: '100%',
    height: 300,
  },
  infoContainer: {
    padding: 16,
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
  },
  description: {
    fontSize: 16,
    color: '#666',
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
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discountedPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f4511e',
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
    color: '#666',
  },
  imageGallery: {
    marginBottom: 16,
  },
  thumbnailImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12,
  },
  addToCartButton: {
    backgroundColor: '#f4511e',
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
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

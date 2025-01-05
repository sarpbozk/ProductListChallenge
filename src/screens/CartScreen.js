import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useCart} from '../contexts/CartContext';
import {useTheme} from '../contexts/ThemeContext';

const CartScreen = () => {
  const {cartItems, removeFromCart, updateQuantity, getCartTotal} = useCart();
  const {theme} = useTheme();
  const styles = getStyles(theme);

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="shopping-cart" size={64} color={theme.inactive} />
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <Text style={styles.emptySubText}>
          Add some products to your cart to see them here
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.itemList}>
        {cartItems.map(item => (
          <View key={item.product.id} style={styles.cartItem}>
            <Image
              source={{uri: item.product.thumbnail}}
              style={styles.itemImage}
              resizeMode="cover"
            />
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{item.product.title}</Text>
              <Text style={styles.itemPrice}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => {
                    if (item.quantity > 1) {
                      updateQuantity(item.product.id, item.quantity - 1);
                    }
                  }}>
                  <Icon
                    name="remove-circle"
                    size={20}
                    color={theme.secondaryText}
                  />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => {
                    if (item.quantity < item.product.stock) {
                      updateQuantity(item.product.id, item.quantity + 1);
                    }
                  }}>
                  <Icon
                    name="add-circle"
                    size={20}
                    color={theme.secondaryText}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFromCart(item.product.id)}>
              <Icon name="delete" size={24} color={theme.primary} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Items:</Text>
          <Text style={styles.summaryValue}>
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Amount:</Text>
          <Text style={styles.summaryTotal}>${getCartTotal().toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Icon
            name="payment"
            size={24}
            color="#fff"
            style={{marginRight: 8}}
          />
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
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
    itemList: {
      flex: 1,
    },
    cartItem: {
      flexDirection: 'row',
      backgroundColor: theme.card,
      padding: 16,
      marginHorizontal: 16,
      marginTop: 16,
      borderRadius: 8,
      elevation: 2,
      shadowColor: theme.cardShadow,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    itemImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
    },
    itemInfo: {
      flex: 1,
      marginLeft: 16,
    },
    itemTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.text,
    },
    itemPrice: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.primary,
      marginTop: 4,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    quantityButton: {
      backgroundColor: theme.secondaryBackground,
      borderRadius: 4,
      padding: 4,
    },
    quantityText: {
      fontSize: 16,
      fontWeight: '500',
      marginHorizontal: 16,
      color: theme.text,
    },
    removeButton: {
      padding: 8,
    },
    summaryContainer: {
      backgroundColor: theme.card,
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    summaryLabel: {
      fontSize: 16,
      color: theme.secondaryText,
    },
    summaryValue: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.text,
    },
    summaryTotal: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.primary,
    },
    checkoutButton: {
      backgroundColor: theme.primary,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      borderRadius: 8,
      marginTop: 16,
    },
    checkoutButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '500',
    },
  });

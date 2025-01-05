import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from '../contexts/ThemeContext';
import ThemeToggle from '../components/common/ThemeToggle';

import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CartScreen from '../screens/CartScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const {theme} = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="ProductList"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => <ThemeToggle style={{marginRight: 15}} />,
        cardStyle: {backgroundColor: theme.background},
      }}>
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{title: 'Products'}}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{title: 'Product Detail'}}
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{title: 'Favorite Products'}}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{title: 'Shopping Cart'}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

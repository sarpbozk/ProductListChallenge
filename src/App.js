import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import {FavoritesProvider} from './contexts/FavoritesContext';
import {CartProvider} from './contexts/CartContext';

const App = () => {
  return (
    <NavigationContainer>
      <FavoritesProvider>
        <CartProvider>
          <AppNavigator />
        </CartProvider>
      </FavoritesProvider>
    </NavigationContainer>
  );
};

export default App;

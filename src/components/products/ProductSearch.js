import React, {useState, useCallback} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {debounce} from 'lodash';
import {useTheme} from '../../contexts/ThemeContext';

const ProductSearch = ({onSearch}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useCallback(
    debounce(searchValue => {
      onSearch(searchValue);
    }, 1500),
    [onSearch],
  );

  const handleSearch = text => {
    setSearchText(text);
    debouncedSearch(text);
  };

  return (
    <View style={styles.searchContainer}>
      <Icon
        name="search"
        size={24}
        color={theme.secondaryText}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        placeholderTextColor={theme.inactive}
        value={searchText}
        onChangeText={handleSearch}
        autoCorrect={false}
      />
    </View>
  );
};

export default ProductSearch;

const getStyles = theme =>
  StyleSheet.create({
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.card,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      marginBottom: 16,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      height: 40,
      color: theme.text,
    },
  });

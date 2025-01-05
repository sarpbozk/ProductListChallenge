import React, {useState, useCallback} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {debounce} from 'lodash';
import {useTheme} from '../../contexts/ThemeContext';

const ProductFilters = ({onFilterChange}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const [brand, setBrand] = useState('');
  const debouncedFilter = useCallback(
    debounce(filterValue => {
      onFilterChange(filterValue);
    }, 1500),
    [onFilterChange],
  );

  const handleBrandChange = text => {
    setBrand(text);
    debouncedFilter(text);
  };

  return (
    <View style={styles.filterContainer}>
      <Text style={styles.label}>Filter by Brand:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter brand name"
        placeholderTextColor={theme.inactive}
        value={brand}
        onChangeText={handleBrandChange}
        autoCorrect={false}
      />
    </View>
  );
};

export default ProductFilters;

const getStyles = theme =>
  StyleSheet.create({
    filterContainer: {
      flex: 1,
      marginRight: 8,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      marginBottom: 8,
      color: theme.text,
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      backgroundColor: theme.card,
      color: theme.text,
    },
  });

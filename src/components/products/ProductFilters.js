import React, {useState, useCallback} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {debounce} from 'lodash';

const ProductFilters = ({onFilterChange}) => {
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
        value={brand}
        onChangeText={handleBrandChange}
        autoCorrect={false}
      />
    </View>
  );
};

export default ProductFilters;

const styles = StyleSheet.create({
  filterContainer: {
    flex: 1,
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
});

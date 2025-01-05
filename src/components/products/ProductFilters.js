import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const ProductFilters = ({onFilterChange}) => {
  const [brand, setBrand] = useState('');

  const handleBrandChange = text => {
    setBrand(text);
    onFilterChange(text);
  };

  return (
    <View style={styles.filterContainer}>
      <Text style={styles.label}>Filter by Brand:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter brand name"
        value={brand}
        onChangeText={handleBrandChange}
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

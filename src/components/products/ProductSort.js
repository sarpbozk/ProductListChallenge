import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const ProductSort = ({onSortChange}) => {
  const [activeSortOption, setActiveSortOption] = useState(null);

  const sortOptions = [
    {label: 'Price ↑', value: 'price-asc'},
    {label: 'Price ↓', value: 'price-desc'},
    {label: 'Rating ↑', value: 'rating-asc'},
    {label: 'Rating ↓', value: 'rating-desc'},
  ];

  const handleSort = option => {
    setActiveSortOption(option.value);
    onSortChange(option.value);
  };

  return (
    <View style={styles.sortContainer}>
      <Text style={styles.label}>Sort by:</Text>
      <View style={styles.optionsContainer}>
        {sortOptions.map(option => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.sortButton,
              activeSortOption === option.value && styles.activeSortButton,
            ]}
            onPress={() => handleSort(option)}>
            <Text
              style={[
                styles.sortButtonText,
                activeSortOption === option.value &&
                  styles.activeSortButtonText,
              ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ProductSort;

const styles = StyleSheet.create({
  sortContainer: {
    flex: 1,
    marginLeft: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
    marginBottom: 8,
  },
  activeSortButton: {
    backgroundColor: '#f4511e',
  },
  sortButtonText: {
    fontSize: 12,
    color: '#666',
  },
  activeSortButtonText: {
    color: '#fff',
  },
});

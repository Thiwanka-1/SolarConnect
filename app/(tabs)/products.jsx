import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import { getAllProducts } from '../../lib/appwrite'; 
import ProductCard from '../../components/ProductCard';
import { Picker } from '@react-native-picker/picker';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories'); 
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts(); 
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts); 
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-teal-500 mb-4">Products</Text>
      <TextInput
        className="border rounded p-2 mb-4"
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        className="mb-4"
      >
        <Picker.Item label="All Categories" value="All Categories" />
        <Picker.Item label="Solar Panels" value="Solar Panels" />
        <Picker.Item label="Inverters" value="Inverters" />
        <Picker.Item label="Batteries" value="Batteries" />
        <Picker.Item label="Mounting Systems" value="Mounting Systems" />
        <Picker.Item label="Solar Accessories" value="Solar Accessories" />
      </Picker>
      {loading ? (
        <ActivityIndicator size="large" color="#00bfff" />
      ) : (
        <ScrollView>
          {filteredProducts.map(product => (
            <View key={product.productId} className="mb-4">
              <ProductCard product={product} />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Products;

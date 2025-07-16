import { router, useLocalSearchParams } from '@/.expo/types/router';
import { images } from '@/constants';
import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';

const SearchBar = () => {
    const params = useLocalSearchParams<{ query: string }>();
    const [query, setQuery] = useState(params.query);

    // Handle search when user types in the input field
    const handleSearch = (text: string) => {
        setQuery(text);
        // If the input is not empty, set the query parameter
        if(!text) router.setParams({ query: undefined });
    };

    // Handle submit when user presses enter on keyboard
    const handleSubmit = () => {
        if(query.trim()) router.setParams({ query });
    }


  return (
    <View className='searchbar'>
      <TextInput 
        className='flex-1 p-5'
        placeholder='Search For Food'
        value={query}
        onChangeText={handleSearch}
        onSubmitEditing={handleSubmit}
        placeholderTextColor="#A0A0A0"
        returnKeyType='search'
        />
        <TouchableOpacity className='pr-5' onPress={() => router.setParams({query})}>
            <Image source={images.search} className='size-6' resizeMode='contain' tintColor='#5D5F6D' />
        </TouchableOpacity>
    </View>
  )
}

export default SearchBar


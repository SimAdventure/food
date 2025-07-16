<<<<<<< HEAD
import { images } from '@/constants';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const CartButton = () => {
    const totalItems = 10;

  return (
    <TouchableOpacity className='cart-btn' onPress={() => {}}>
        <Image source={images.bag} className='size-5' resizeMode='contain' />
        {totalItems > 0 && (
            <View className='cart-badge'>
                <Text className='small-bold text-white'>{totalItems}</Text>
            </View>
        )}
    </TouchableOpacity>
  )
}

=======
import { images } from '@/constants';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const CartButton = () => {
    const totalItems = 10;

  return (
    <TouchableOpacity className='cart-btn' onPress={() => {}}>
        <Image source={images.bag} className='size-5' resizeMode='contain' />
        {totalItems > 0 && (
            <View className='cart-badge'>
                <Text className='small-bold text-white'>{totalItems}</Text>
            </View>
        )}
    </TouchableOpacity>
  )
}

>>>>>>> c4abd6f9a9d6ea1df3ccb037d3909d4fa852bb0d
export default CartButton
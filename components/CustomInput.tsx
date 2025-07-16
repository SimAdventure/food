import { CustomInputProps } from '@/type';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import cn from "clsx";



const CustomInput = ({placeholder, value, onChangeText, label, secureTextEntry, keyboardType}: CustomInputProps) => {

  const [isFocused, setisFocused] = useState(false)

  return (
    <View className='w-full'>
      <Text className='label'>{label}</Text>

      <TextInput 
        autoCapitalize='none'
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setisFocused(true)}
        onBlur={() => setisFocused(false)}
        placeholder={placeholder}
        placeholderTextColor='#888'
        className={ cn('input',isFocused?'border-primary' : 'border-gray-200') }
      />
    </View>
  )
}

export default CustomInput
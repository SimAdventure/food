import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import { Text, View } from 'react-native'

const SignIn = () => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const [form, setform] = useState({email: '', password: ''});



  return (
    <View className='gap-10 bg-white rounded-lg pb-5 mt-5'>
      <CustomInput
          placeholder='Enter Your Email Address'
          value={''}
          onChangeText={(text) => {}}
          label='Email Address'
          keyboardType='email-address'
        />

      <CustomInput
          placeholder='Enter Your Password'
          value={''}
          onChangeText={(text) => {}}
          label='Password'
          secureTextEntry={true} 
        />


        <CustomButton title='Sign In' />

        <View className='flex justify-center mt-5 flex-row gap-2'>
          <Text className='base-regular text-gray-100'>
            Don&apos;t habe an account? 
          </Text>
          <Link href='/sign_up' className='base-bold text-primary'>
            Sign In
          </Link>
        </View>
        
    </View>
  )
}

export default SignIn
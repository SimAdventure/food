import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { createUser } from '@/lib/AppWrite'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'
import * as Sentry from '@sentry/react-native'

const SignUp = () => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const [form, setform] = useState({email: '', name: '', password: ''});

  const submit = async () => {

    const { name, email, password } = form;
    if(!email || !name || !password)
      return Alert.alert('Error', 'Please enter valid credentials')

    setisSubmitting(true);
    try{
      await createUser({
        email: email,
        password: password,
        name: name
      })

      Alert.alert('Sucess', 'You have successfully Registered');
      router.replace('/');
    } catch (error){
      Alert.alert('Error');
      Sentry.captureEvent(error as Sentry.Event);
    } finally{
      setisSubmitting(false);
    }
  }

  

  return (
    <View className='gap-10 bg-white rounded-lg pb-5 mt-5'>
      <CustomInput
          placeholder='Enter Your Fyll Name'
          value={form.name}
          onChangeText={(text) => setform((prev) => ({...prev, name: text}))}
          label='Full Name'
        />

      <CustomInput
          placeholder='Enter Your Email Address'
          value={form.email}
          onChangeText={(text) => setform((prev) => ({...prev, email: text}))}
          label='Email Address'
          keyboardType='email-address'
        />

      <CustomInput
          placeholder='Enter Your Password'
          value={form.password}
          onChangeText={(text) => setform((prev) => ({...prev, password: text}))}
          label='Password'
          secureTextEntry={true} 
        />


        <CustomButton 
          title='Register'
          isLoading={isSubmitting}
          onPress={submit} />

        <View className='flex justify-center mt-5 flex-row gap-2'>
          <Text className='base-regular text-gray-100'>
            Do have an account? 
          </Text>
          <Link href='/sign_in' className='base-bold text-primary'>
            Login
          </Link>
        </View>
        
    </View>
  )
}

export default SignUp
<<<<<<< HEAD
import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { signIn } from '@/lib/AppWrite'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'
import * as Sentry from '@sentry/react-native'

const SignIn = () => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const [form, setform] = useState({email: '', password: ''});

  const submit = async () => {
    const { email, password } = form;
    if(!email || !password)
      return Alert.alert('Error', 'Please enter valid credentials')

    setisSubmitting(true);
    try{
      //SignIn function from Appwrite
      await signIn({
        email,
        password
      })

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
          title='Login'
          isLoading={isSubmitting}
          onPress={submit} />

        <View className='flex justify-center mt-5 flex-row gap-2'>
          <Text className='base-regular text-gray-100'>
            Don&apos;t have an account? 
          </Text>
          <Link href='/sign_up' className='base-bold text-primary'>
            Register
          </Link>
        </View>
        
    </View>
  )
}

=======
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

>>>>>>> c4abd6f9a9d6ea1df3ccb037d3909d4fa852bb0d
export default SignIn
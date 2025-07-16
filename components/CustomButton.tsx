<<<<<<< HEAD
import { CustomButtonProps } from '@/type'
import cn from 'clsx'
import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'

const CustomButton = ({
  onPress,
  title = 'Click Me',
  style,
  textStyle,
  leftIcon,
  isLoading = false
}: CustomButtonProps) => {
  return (
    <TouchableOpacity className={cn('custom-btn', style)} onPress={onPress}>
      {leftIcon}

      <View className='flex-center flex-row'>
        {isLoading ? (
          <ActivityIndicator size='small' color='white' />
        ) : (
          <Text className={cn('text-white-100 paragraph-semibold', textStyle)}>
            {title}
          </Text>
        )
        }
      </View>

    </TouchableOpacity>
  )
}

=======
import { CustomButtonProps } from '@/type'
import cn from 'clsx'
import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'

const CustomButton = ({
  onPress,
  title = 'Click Me',
  style,
  textStyle,
  leftIcon,
  isLoading = false
}: CustomButtonProps) => {
  return (
    <TouchableOpacity className={cn('custom-btn', style)} onPress={onPress}>
      {leftIcon}

      <View className='flex-center flex-row'>
        {isLoading ? (
          <ActivityIndicator size='small' color='white' />
        ) : (
          <Text className={cn('text-white-100 paragraph-semibold', textStyle)}>
            {title}
          </Text>
        )
        }
      </View>

    </TouchableOpacity>
  )
}

>>>>>>> c4abd6f9a9d6ea1df3ccb037d3909d4fa852bb0d
export default CustomButton

import seed from '@/lib/seed'
import React from 'react'
import { Button, SafeAreaView, Text } from 'react-native'


const search = () => {
  return (
    <SafeAreaView>
      <Text>search</Text>

      <Button title="Seed" onPress={() => seed().catch((error) => console.log(
        "Failed to seed database", error
      ))}/>

      
    </SafeAreaView>
  )
}


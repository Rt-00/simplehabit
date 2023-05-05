import React from 'react'
import { ActivityIndicator, View } from 'react-native'

export default function Loading (): JSX.Element {
  return (
    <View className='flex flex-1 justify-center bg-black'>
      <ActivityIndicator size="large" color={'#FFF'}/>
    </View>
  )
}

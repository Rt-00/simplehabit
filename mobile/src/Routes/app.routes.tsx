import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../Pages/Login/Login'
import MainScreen from '../Pages/MainScreen/MainScreen'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes (): JSX.Element {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='Login' component={Login}/>
      <Screen name='MainScreen' component={MainScreen}/>
    </Navigator>
  )
}

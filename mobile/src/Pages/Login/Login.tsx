/* eslint-disable @typescript-eslint/space-before-function-paren */
import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import TypeWritter from '../../AnimatedComponents/TypeWritter'
import BlinkView from '../../AnimatedComponents/BlinkView'
import { useNavigation } from '@react-navigation/native'

export default function Login(): JSX.Element {
  const [user, setUser] = useState<string>('')
  const [pass, setPass] = useState<string>('')

  const navigation = useNavigation()

  return (
    <View className='flex-1 justify-center items-center bg-zinc-950'>
      <View className='flex-1 justify-center items-center'>
        <Text
          className='text-3xl p-3 text-white'
          style={{ fontFamily: 'PTMono_400Regular' }}>
          # Simple Habits.
        </Text>
        <View className='flex-row text-center justify-center'>
          <TypeWritter>
            A simple App to register your Habits.
          </TypeWritter>
          <BlinkView />
        </View>
      </View>
      <Animated.View entering={FadeInDown.duration(1000)}
        className='flex-2 bg-zinc-300 w-[100%] h-72 rounded-t-3xl'
      >
        <View className='mt-5 mx-10'>
          <Text className='text-lg font-semibold'>Usuário:</Text>
          <TextInput
            onChangeText={(usuario) => {
              setUser(usuario)
            }}
            value={user}
            className='bg-white mt-2 rounded-xl px-2 py-1'
            placeholder='Digite o Usuário.'
          />
          <Text className='text-lg font-semibold mt-2'>Senha:</Text>
          <TextInput
            onChangeText={(password) => {
              setPass(password)
            }}
            value={pass}
            className='bg-white mt-2 rounded-xl px-2 py-1'
            placeholder='Digite sua Senha.'
            secureTextEntry
          />
          <View className='justify-center items-center mt-8'>
            <TouchableOpacity
              activeOpacity={0.7}
              className='px-20 py-2 rounded-xl bg-zinc-900'
              onPress={() => { navigation.navigate('MainScreen' as never) }}
            >
              <Text
                className='text-base font-semibold text-white'
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  )
}

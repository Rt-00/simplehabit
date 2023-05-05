/* eslint-disable @typescript-eslint/space-before-function-paren */
import { View, Text, TouchableOpacity } from 'react-native'
import Checkbox from 'expo-checkbox'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { type ITask } from '../../Pages/MainScreen/MainScreen'

interface ITaskCard {
  task: ITask
  removeItem: () => void
}

export default function TaskCard({ task, removeItem }: ITaskCard): JSX.Element {
  const [isChecked, setChecked] = useState(false)
  return (
    <View className='bg-zinc-300 border-2 border-zinc-600 mb-5 px-2 py-3 rounded-xl flex-row justify-between items-center'>
      <Text className={` w-[65%] text-black font-semibold ${isChecked ? 'line-through' : ''}`}>{task.title}</Text>
      <TouchableOpacity
        onPress={() => { removeItem() }}
      >
        <Feather name='trash-2' size={24} color={'#db2f2f'} />
      </TouchableOpacity>
      <Checkbox
        className='mr-6 h-6 w-6'
        value={isChecked}
        onValueChange={setChecked}
        color={isChecked ? '#10B981' : '#3a3a3a'}
      />
    </View>
  )
}

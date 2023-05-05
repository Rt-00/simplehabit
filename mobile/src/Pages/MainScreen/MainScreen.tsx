/* eslint-disable @typescript-eslint/space-before-function-paren */
import Animated, { FadeInLeft } from 'react-native-reanimated'
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import TaskCard from '../../Components/TaskCard/TaskCard'
import { api } from '../../Services/services'

export interface ITask {
  id: string
  title: string
}

export default function MainScreen(): JSX.Element {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [inputTaskTitle, setInputTaskTitle] = useState<string>('')
  const navigation = useNavigation()

  async function fetchData(): Promise<void> {
    try {
      const response = await api.get('/tasks/baa279aa-c715-472b-b89e-a7d5c14bbfb9')
      setTasks(response.data)
    } catch (error: any) {
      Alert.alert('Ops', error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData().catch((err) => { Alert.alert('Ops', err) })
    }, [tasks])
  )

  async function attTaskList(title: string): Promise<void> {
    if (inputTaskTitle.length === 0) {
      Alert.alert('Ops', 'A tarefa precisa de um titulo.')
      return
    }

    await api.post('/tasks', {
      title: inputTaskTitle,
      userId: 'baa279aa-c715-472b-b89e-a7d5c14bbfb9'
    })
    setInputTaskTitle('')
  }

  async function removeTaskItem(id: string): Promise<void> {
    await api.delete('/tasks/' + id)
  }

  return (
    <>
      <View className='flex-1 bg-zinc-950 justify-between'>
        <View className='h-[10%] items-center flex-row justify-center'>
          <TouchableOpacity
            className='ml-5 rounded-3xl'
            onPress={() => { navigation.goBack() }}
          >
            <Feather name='arrow-left' size={24} color={'#FFF'} />
          </TouchableOpacity>
          <View className='border-b-[1.5px] border-white ml-[31%] mr-auto'>
            <Text
              className='text-white text-xl'
              style={{ fontFamily: 'PTMono_400Regular' }}
            >To-do.
            </Text>
          </View>
        </View>
        <View className='w-[90%] border-[0.5px] border-white m-auto' />

        <FlatList
          className='px-6 py-2 mt-4'
          data={tasks}
          renderItem={({ item }) =>
            <Animated.View
              entering={FadeInLeft}
            >
              <TaskCard
                task={item}
                removeItem={() => { void removeTaskItem(item.id) }} />
            </Animated.View>
          }

          keyExtractor={(item) => item.id}
        />

        <View className='flex-2 h-[13%] flex-row items-center justify-between mb-4 '>
          <TextInput
            className='w-[75%] border-2 border-white ml-5 rounded-lg mr-5 text-white py-1 px-3'
            placeholder='Insira sua tarefa...'
            placeholderTextColor={'white'}
            value={inputTaskTitle}
            onChangeText={(titleOfTask) => { setInputTaskTitle(titleOfTask) }}
          />
          <TouchableOpacity
            className='mr-7 border-2 border-white p-2 items-center justify-center rounded-3xl'
            onPress={() => { void attTaskList(inputTaskTitle) }}
          >
            <Feather name='plus' size={21} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

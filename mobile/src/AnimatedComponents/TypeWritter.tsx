import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'

interface ITypeWritter {
  children: string
}

export default function TypeWritter ({ children }: ITypeWritter): JSX.Element {
  const [text, setText] = useState<string[]>([])

  function write (texto: string): void {
    const newArr: string[] = []
    const textArr = [...texto]
    textArr.forEach((char, index) => {
      setTimeout(() => {
        newArr.push(char)
        setText(newArr => [...newArr, char])
      }, index * 100)
    })
  }

  useEffect(() => {
    setText([])
    write(children)
  }, [])

  return (
    <Text
      className='text-sm text-white'
      style={{ fontFamily: 'PTMono_400Regular' }}>
      {text}
    </Text>
  )
}

import { View } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function BlinkView (): JSX.Element {
  const [showComponent, setShowComponent] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowComponent((showComponent) => !showComponent)
    }, 800)
    return () => { clearInterval(interval) }
  }, [])

  return (
    <>
      {showComponent
        ? (
          <View
            className='border-[1px] border-emerald-500 h-4 w-2'
          />
          )
        : (<View className='h-4 w-2' />)}
    </>
  )
}

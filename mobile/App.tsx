import React from 'react'
import { useFonts, PTMono_400Regular } from '@expo-google-fonts/pt-mono'
import Loading from './src/Components/Loading/Loading'
import Routes from './src/Routes/Routes'
import { StatusBar } from 'react-native'

export default function App (): JSX.Element {
  const [fontsLoaded] = useFonts({
    PTMono_400Regular
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <Routes />
    </>
  )
}

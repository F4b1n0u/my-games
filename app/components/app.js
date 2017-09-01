import React from 'react'
import { UIManager } from 'react-native'
import styled from 'styled-components/native'
import Expo, { Font } from 'expo'
import Background from '@components/background'
import GameExplorer from '@components/game-explorer'

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default class AppComponents extends React.Component {
  async componentDidMount() {
    const {
      isLoaded,
      isLoading,
      startLoad,
      endLoad,
    } = this.props

    if (!isLoaded && !isLoading) {
      startLoad()

      await Font.loadAsync({
        'florentia-extralight': require('../../assets/fonts/florentia.extralight.ttf'),
        'arista-pro-extralight': require('../../assets/fonts/arista-pro-extralight.ttf'),
        'let-that-be-enough-regular': require('../../assets/fonts/let-that-be-enough.regular.ttf'),
      })
  
      endLoad()
    }
  }

  render() {
    const {
      isLoaded,
      isLoading,
    } = this.props

    return (!isLoading && isLoaded) ?
      (
        <App>
          <Background />
          <GameExplorer />
        </App>
      ) : (
        <Expo.AppLoading />
      )
  }
}

const App = styled.View`
  flex: 1;
  flex-direction: row;
`

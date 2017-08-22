import React from 'react'
import {
  UIManager,
} from 'react-native'
import styled from 'styled-components/native'
import Expo, {
  Font
} from 'expo'
import _ from 'lodash'

import Background from '../components/background'
import GameExplorer from '../components/game-explorer'

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)

export default class AppComponents extends React.Component {
  state = {
    isFontLoaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'florentia-extralight': require('../../assets/fonts/florentia.extralight.ttf'),
      'arista-pro-extralight': require('../../assets/fonts/arista-pro-extralight.ttf'),
      'let-that-be-enough-regular': require('../../assets/fonts/let-that-be-enough.regular.ttf'),
    })

    this.setState({ isFontLoaded: true })
  }

  render() {
    const {
      isFontLoaded = true,
    } = this.state

    return (isFontLoaded) ?
      (
        <App>
          <Background />
          <GameExplorer
            {...this.props}
          />
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

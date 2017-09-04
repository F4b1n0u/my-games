import React from 'react'
import { UIManager } from 'react-native'
import styled from 'styled-components/native'
import Expo, { Font } from 'expo'
import {
  Ionicons ,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'

import Background from '@components/background'
import GameExplorer from '@components/game-explorer'
import {
  cacheImages,
  cacheFonts,
} from '@utils'

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default class AppComponents extends React.Component {
  async _loadAssetsAsync() {
    const {
      isLoaded,
      isLoading,
      startLoad,
      endLoad,
    } = this.props

    if (!isLoaded && !isLoading) {
      startLoad()

      const imageAssets = cacheImages([
        require('../../assets/images/all-games-wallpaper.png'),
      ]);

      const fontAssets = cacheFonts([
        Ionicons.font,
        MaterialCommunityIcons.font,
        MaterialIcons.font,
        {
          'florentia-extralight': require('../../assets/fonts/florentia.extralight.ttf'),
          'arista-pro-extralight': require('../../assets/fonts/arista-pro-extralight.ttf'),
          'let-that-be-enough-regular': require('../../assets/fonts/let-that-be-enough.regular.ttf'),
        }
      ]);

      await Promise.all([
        ...imageAssets,
        ...fontAssets,
      ]);

      endLoad()
    }
  }

  constructor(props) {
    super(props)

    this._loadAssetsAsync = this._loadAssetsAsync.bind(this)
  }


  componentWillMount() {
    this._loadAssetsAsync()
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

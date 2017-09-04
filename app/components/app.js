import React from 'react'
import { UIManager } from 'react-native'
import styled from 'styled-components/native'
import Expo, { Font } from 'expo'
import {
  Ionicons ,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from '@expo/vector-icons'

import Background from '@components/background'
import GameExplorer from '@components/game-explorer'
import SettingsComponent from '@components/settings'

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
        require('../../assets/images/giantbomb-logo.png'),
        require('../../assets/images/icon.png'),
      ]);

      const fontAssets = cacheFonts([
        Ionicons.font,
        MaterialCommunityIcons.font,
        MaterialIcons.font,
        Octicons.font,
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
      isSettingsVisible,
      hasDetailedGame,
      toggleSettingsDisplay,
    } = this.props

    return (!isLoading && isLoaded) ?
      (
        <App>
          <Background />
          <GameExplorer />

          {
            hasDetailedGame ? (
              null
            ) : (
              <SettingsIconWrapper
                onPress={toggleSettingsDisplay}
              >
                <SettingsIcon />
              </SettingsIconWrapper>
            )
          }

          {
            isSettingsVisible ? (
              <Settings />
            ) : (
              null
            )
          }
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

// const SettingsOverlay = styled.TouchableWithoutFeedback`
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
// `

const Settings = styled(SettingsComponent)`
  position: absolute;
  top: 60;
  left: 20;
  right: 20;
`

const SettingsIconWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.4,
})`
  position: absolute;
  top: 27;
  left: 13;
  background-color: transparent;
`

const SettingsIcon = styled(Octicons).attrs({
  name: 'settings'
})`
  font-size: 25;
  color: #a3a3a3;
`

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
import GameExplorer from '@containers/game-explorer'
import AboutComponent from '@components/about'

import { cacheImages, cacheFonts } from '@utils'
import { scale, verticalScale } from '@utils/dimension'

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default class AppComponents extends React.Component {
  
  constructor(props) {
    super(props)
  }
  
  componentWillMount() {
    this._loadAssetsAsync()
  }
  
  _loadAssetsAsync = async () => {
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
        require('../../assets/images/arrows.png'),
        require('../../assets/images/giantbomb-logo.png'),
        require('../../assets/images/icon.png'),
      ])

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
      ])

      await Promise.all([
        ...imageAssets,
        ...fontAssets,
      ])

      endLoad()
    }
  }

  render() {
    const {
      isLoaded,
      isLoading,
      isAboutVisible,
      hasDetailedGame,
      toggleAboutDisplay,
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
              <AboutIconWrapper
                onPress={toggleAboutDisplay}
              >
                <AboutIcon />
              </AboutIconWrapper>
            )
          }

          {
            isAboutVisible ? (
              <About
                toggleAboutDisplay={toggleAboutDisplay}
              />
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

const About = styled(AboutComponent)``

const AboutIconWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.4,
})`
  position: absolute;
  top: ${scale(30)};
  left: ${scale(13)};
  background-color: transparent;
`

const AboutIcon = styled(Octicons).attrs({
  name: 'info'
})`
  font-size: ${scale(32)};
  color: #333333;
`

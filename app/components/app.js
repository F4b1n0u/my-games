import React from 'react'
import { UIManager, StatusBar } from 'react-native'
import styled from 'styled-components/native'
import Expo, { Font } from 'expo'
import {
  Ionicons ,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from '@expo/vector-icons'

import Background from '#components/background'
import GameExplorer from '#containers/game-explorer'
import AboutComponent from '#components/about'

import BarcodeScannerContainer from '#containers/barcode-scanner'

import { cacheImages, cacheFonts } from '#utils'
import { scale, verticalScale } from '#utils/dimension'

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default class AppComponents extends React.Component {
  constructor(props) {
    super(props)
  }
  
  componentWillMount() {
    this._loadAssetsAsync()
    StatusBar.setHidden(true)
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

  _handleStopScan = () => {
    const {
      stopScanBarcode,
    } = this.props

    stopScanBarcode()
  }

  render() {
    const {
      isLoaded,
      isLoading,
      isAboutVisible,
      hasDetailedGame,
      toggleAboutDisplay,
      isScanningBarcode,
      stopScanBarcode
    } = this.props

    if (!isLoading && isLoaded) {
      if (isScanningBarcode) {
        return (
          <BarcodeScanner />
        )
      } else {
        return (
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
        )
      }
    } else {
      return (
        <Expo.AppLoading />
      )
    }
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
  top: ${verticalScale(10)};
  left: 0;
  background-color: transparent;  
  width: ${scale(50)};
  height: ${verticalScale(37)};
  justify-content: center;
  align-items: center;
`

const AboutIcon = styled(Octicons).attrs({
  name: 'info'
})`
  font-size: ${verticalScale(32)};
  color: #333333;
`

const BarcodeScanner = styled(BarcodeScannerContainer)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

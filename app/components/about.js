import React from 'react'
import styled from 'styled-components/native'
import { BlurView } from 'expo'
import { Animated } from 'react-native'

import { version } from '../../package.json'

import ProgressiveImage from '#components/progressive-image'

import { scale, verticalScale } from '#utils/dimension'


export default class BlurViewExample extends React.Component {
  state = {
    animationProgress: new Animated.Value(0),
  }

  componentDidMount() {
    this._animate()
  }

  _animate = () => {
    let {
      animationProgress
    } = this.state;

    Animated.timing(
      animationProgress,
      {
        duration: 250,
        toValue: 1
      }
    ).start()
  }

  render() {
    const {
      style,
      toggleAboutDisplay,
    } = this.props

    const {
      animationProgress,
    } = this.state

    const intensityProgress = animationProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100],
    })

    return (
      <Background
        intensity={intensityProgress}
      >
        <Overlay
          onPress={toggleAboutDisplay}
        >
          <About
            style={style}
          >
            <Title>
              {'About'}
            </Title>
            <Paragraph>
              {'This app is designed and developed by:\n\nFabien Behier\n'}
            </Paragraph>
            <Paragraph>
              {'the source code is available on github at:\nhttps://github.com/F4b1n0u/my-games'}
            </Paragraph>
            <Paragraph>
              {'the data source is powered by:'}
            </Paragraph>
            <GiantBombLogo />
            <Paragraph>
              {'hope you like it!\n(*^_^*)'}
            </Paragraph>
            <Version>
              {`version: ${version}`}
            </Version>
          </About>
        </Overlay>
      </Background>
    )
  }
} 

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

const Background = styled(AnimatedBlurView)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

const Overlay = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  justify-content: center;
  align-items: center;
`

const About = styled.View`
  overflow: hidden;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-color: #333333;
  border-width: 1;
  border-radius: 5;
  background-color: #fafafaf0;
  padding-vertical: ${scale(5)};
  padding-horizontal: ${scale(5)};
  padding-bottom: ${scale(20)};
`

const Title = styled.Text`
  font-size: ${scale(20)};
  background-color: transparent;
  margin-bottom: ${scale(10)};
`

const Paragraph = styled.Text`
  margin-top: ${scale(10)};
  text-align: center;
  font-size: ${scale(14)}
`

const GiantBombLogo = styled(ProgressiveImage).attrs({
  imageSource: require('../../assets/images/giantbomb-logo.png'),
  resizeMode: 'contain',
  height: undefined,
  width: undefined,
})`
  height: ${verticalScale(150)};
  width: ${scale(300)};
`

const Version = styled.Text`
  margin-top: ${scale(10)};
  text-align: center;
  font-size: ${scale(10)}
`

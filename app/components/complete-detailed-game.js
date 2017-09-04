import React from 'react'
import styled from 'styled-components/native'
import Carousel from 'react-native-snap-carousel'
import _ from 'lodash'
import {
  Dimensions,
} from 'react-native'
import {
  BlurView,
} from 'expo'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import ProgressiveImage from '@components/progressive-image'
import PlatformComponent from '@components/platform'

const {
  width: viewportWidth,
} = Dimensions.get('window')

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100
  return Math.round(value)
}

const slideHeight = 200
const slideWidth = viewportWidth - wp(15)
const itemHorizontalMargin = wp(2)

const sliderWidth = viewportWidth
const itemWidth = slideWidth + (itemHorizontalMargin * 2)

const amountPlatformSupported = 14
export default class CompleteDetailedGameComponent extends React.Component {
  constructor(props) {
    super(props)

    this._handleCollapse = this._handleCollapse.bind(this)
  }

  _handleCollapse() {
    const {
      hideGameDetails,
    } = this.props

    hideGameDetails()
  }

  render() {
    const {
      completionLevel,
      deck,
      image,
      images,
      name,
      platforms,
      togglePlatformOwnership,
    } = this.props

    let slideshow

    if (completionLevel < 3) {
      slideshow = [image]
    } else {
      slideshow = images.filter(currentImage => currentImage.tags.match('(Screenshots|Wallpaper)'))
    }

    if (_.isEmpty(slideshow)) {
      slideshow = images.filter(currentImage => !currentImage.tags.match('(Fan art|Concept Art)'))
    }
    if (_.isEmpty(slideshow)) {
      slideshow = [image]
    }

    return (
      <Game>
        <Name>
          {name}
        </Name>

        <SlideShow
          ref={(carousel) => { this._carousel = carousel }}
        >
          {
            slideshow.map(currentImage => (
              <Slide
                key={currentImage.thumb_url}
              >
                <ImageContainer>
                  <Picture
                    thumbnailSource={{ uri: currentImage.thumb_url }}
                    imageSource={{ uri: currentImage.super_url }}
                  />
                </ImageContainer>
              </Slide>
            ))
          }
        </SlideShow>

        <Description>
          {deck}
        </Description>

        <PlatformList>
          {(_.slice(platforms, 0, amountPlatformSupported) || []).map(platform => (
            <PlatformWrapper
              key={platform.id}
              onPress={togglePlatformOwnership.bind(this, platform)}
            >
              <Platform
                isDetailed
                {...platform}
              />
            </PlatformWrapper>
          ))}
        </PlatformList>

        <BackButton
          onPress={this._handleCollapse}
        >
          <BackIcon />
        </BackButton>
      </Game>
    )
  }
}

const Game = styled(BlurView).attrs({
  tint: 'light',
  intensity: 60,
})`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 5;
  padding-bottom: 10;
`

const Name = styled.Text.attrs({
  numberOfLines: 2,
  ellipsizeMode: 'tail',
})`
  margin-bottom: 15;
  margin-horizontal: 15;
  font-size: 20;
  text-align: center;
  font-family: 'florentia-extralight';
`

const SlideShow = styled(Carousel).attrs({
  sliderWidth,
  slideHeight,
  itemWidth,
  inactiveSlideScale: 1,
  dotsLength: 4,
  activeDotIndex: 1,
})`
  width: 100%;
`

const Slide = styled.View`
  width: ${itemWidth};
`

const ImageContainer = styled.View`
  flex: 1;
  padding-horizontal: ${itemHorizontalMargin};
`

const Picture = styled(ProgressiveImage)`
  width: ${slideWidth};
  height: ${slideHeight};
  borderRadius: 5;
  background-color: #e3e3e3a0;
`

const Description = styled.Text.attrs({
  numberOfLines: 8,
  ellipsizeMode: 'tail',
  textAlign: 'justify',
})`
  margin-vertical: 10;
  margin-horizontal: ${itemHorizontalMargin};
  font-size: 16;
  font-family: 'florentia-extralight';
  background-color: transparent;
`

const PlatformList = styled.View`
  flex-wrap: wrap;
  width: 100%;
  flex-direction: row;
  align-items: flex-start;
  padding-top: 5;
  margin-bottom: 30;
  overflow: hidden;
  justify-content: center;

`

const PlatformWrapper = styled.TouchableOpacity``

const Platform = styled(PlatformComponent)`
  background-color: transparent;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 35;
  margin-horizontal: 7.5;
  margin-bottom: 12.5;
`

const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  padding-horizontal: 5;
  background-color: transparent;
  overflow: hidden;
`

const BackIcon = styled(MaterialCommunityIcons).attrs({
  name: 'arrow-compress',
})`
  font-size: 35;
  color: #a3a3a3;
`

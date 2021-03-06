import _ from 'lodash'
import React from 'react'
import styled from 'styled-components/native'
import Carousel from 'react-native-snap-carousel'
import { Dimensions } from 'react-native'
import { BlurView, WebBrowser } from 'expo'
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons'

import RatioLessImage from '#components/ratio-less-image'
import PlatformComponent from '#components/platform'

import { scale } from '#utils/dimension'

const {
  width: viewportWidth,
  height: viewportHeight,
} = Dimensions.get('window')

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100
  return Math.round(value)
}

const slideHeight = viewportHeight / 2.5
const slideWidth = viewportWidth - wp(15)
const itemHorizontalMargin = wp(2)

const sliderWidth = viewportWidth
const itemWidth = slideWidth + (itemHorizontalMargin * 2)

const amountPlatformSupported = 14
export default class CompleteDetailedGameComponent extends React.Component {
  _handleBack = () => {
    const {
      hideGameDetails,
    } = this.props

    hideGameDetails()
  }

  _handleSeeMore = () => {
    const {
      site_detail_url: siteDetailUrl,
    } = this.props

    WebBrowser.openBrowserAsync(siteDetailUrl);
  }

  render() {
    const {
      completionLevel,
      deck,
      image,
      images,
      name,
      platforms,
      isOwned,
      togglePlatformOwnership,
      site_detail_url: siteDetailUrl,
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
        <Name
          isOwned={isOwned}
        >
          {name}
        </Name>

        <SlideShow
          ref={(carousel) => { this._carousel = carousel }}
        >
          {
            slideshow.map(currentImage => (
              <Slide
                key={currentImage.tiny_url}
              >
                <ImageContainer>
                  <Picture
                    image={currentImage}
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

        <Back
          onPress={this._handleBack}
        >
          <BackIcon />
        </Back>
        {
          siteDetailUrl ? (
            <SeeMore
              onPress={this._handleSeeMore}
            >
              <SeeMoreIcon />
            </SeeMore>
          ) : (
            null
          )
        }
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
  margin-bottom: ${scale(15)};
  margin-horizontal: ${scale(40)};
  font-size: ${scale(20)};
  text-align: center;
  font-family: 'florentia-extralight';
`

const SlideShow = styled(Carousel).attrs({
  sliderWidth,
  slideHeight,
  itemWidth,
  inactiveSlideScale: 1,
})`
  width: 100%;
`

const Slide = styled.View`
  width: ${itemWidth};
`

const ImageContainer = styled.View`
  height: ${slideHeight};
  borderRadius: 5;
  padding-horizontal: ${itemHorizontalMargin};
`

const Picture = styled(RatioLessImage)`
  background-color: #33333350;
`

const Description = styled.Text.attrs({
  numberOfLines: 8,
  ellipsizeMode: 'tail',
  textAlign: 'justify',
})`
  margin-vertical: ${scale(10)};
  margin-horizontal: ${itemHorizontalMargin};
  font-size: ${scale(16)};
  font-family: 'florentia-extralight';
  background-color: transparent;
`

const PlatformList = styled.View`
  flex-wrap: wrap;
  width: 100%;
  flex-direction: row;
  align-items: flex-start;
  padding-top: ${scale(5)};
  margin-bottom: ${scale(30)};
  overflow: hidden;
  justify-content: center;

`

const PlatformWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})``

const Platform = styled(PlatformComponent).attrs({
  iconFontSize: 40,
  textFontSize: 20,
})`
  background-color: transparent;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: ${scale(35)};
  margin-horizontal: ${scale(7.5)};
  margin-bottom: ${scale(12.5)};
`

const Back = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  padding-horizontal: ${scale(5)};
  background-color: transparent;
  overflow: hidden;
`

const BackIcon = styled(MaterialCommunityIcons).attrs({
  name: 'arrow-compress',
})`
  font-size: ${scale(35)};
  color: #333333;
`

const SeeMore = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  bottom: 0;
  padding-horizontal: ${scale(5)};
  background-color: transparent;
  overflow: hidden;
`

const SeeMoreIcon = styled(Octicons).attrs({
  name: 'link-external',
})`
  font-size: ${scale(35)};
  color: #333333;
`

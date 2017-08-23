import React from 'react'
import styled from 'styled-components/native'
import Carousel from 'react-native-snap-carousel'
import {
  Dimensions,
} from 'react-native'
import {
  BlurView,
} from 'expo'
import {
  MaterialCommunityIcons,
} from '@expo/vector-icons'

import PlatformList from './platform-list'

const image = require('../../assets/images/zelda.png')

const {
  width: viewportWidth,
  height: viewportHeight,
} = Dimensions.get('window')

function wp (percentage) {
  const value = (percentage * viewportWidth) / 100
  return Math.round(value)
}

const slideHeight = 200
const slideWidth = viewportWidth - wp(15)
const itemHorizontalMargin = wp(2)

const sliderWidth = viewportWidth
const itemWidth = slideWidth + itemHorizontalMargin * 2

export default class DetailedGameComponent extends React.Component {
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
      name,
      deck,
      images,
		} = this.props

    return (
      <Game>
        <Name>
          {name}
        </Name>

        <SlideShow
          ref={(carousel) => { this._carousel = carousel }}
        >
          {images
            .filter(image => image.tags.match('(Screenshots|Wallpaper)'))
            .map((image, index) => {
              return (
                <Slide
                  key={index}
                >
                  <ImageContainer>
                    <Picture
                      source={{uri: image.super_url}}
                    />
                  </ImageContainer>
                </Slide>
                )}
              )
          }
        </SlideShow>

        <Description>
          {deck}
        </Description>

        <PlatformList
          isDetailed={true}
          {...this.props}
        />

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
`;

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

const StyledImage = styled.Image`
  flex: 1;
  resize-mode: cover;
`;

const Picture = styled.Image.attrs({
  blurRadius: 0,
})`
  width: ${slideWidth};
  height: ${slideHeight};
  resizeMode: cover;
  borderRadius: 5;
  background-color: #e3e3e3a0;
`

const Description = styled.Text.attrs({
  numberOfLines: 6,
  ellipsizeMode: 'tail',
  textAlign: 'justify',
})`
  margin-vertical: 10;
  margin-horizontal: ${itemHorizontalMargin};
  font-size: 16;
  font-family: 'florentia-extralight';
  background-color: transparent;
`

const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  padding-horizontal: 5;
  background-color: transparent;
  overflow: hidden;
`;

const BackIcon = styled(MaterialCommunityIcons).attrs({
  name: 'arrow-compress',
})`
  font-size: 35;
  color: #a3a3a3;
`

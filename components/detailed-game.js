import React from 'react';
import styled from 'styled-components/native';
import Carousel from 'react-native-snap-carousel';
import {
  Dimensions,
} from 'react-native';
import {
  BlurView,
} from 'expo'

import PlatformList from './platform-list';

const image = require('../assets/images/zelda.png')

const {
  width: viewportWidth,
  height: viewportHeight,
} = Dimensions.get('window');

function wp (percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.4;
const slideWidth = viewportWidth - wp(15);
const itemHorizontalMargin = wp(2);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

export default class DetailedGameComponent extends React.Component {
  render() {
    const {
			name,
		} = this.props;
    
    return (
      <Game
        tint="light"
        intensity={60}
      >
        <Name
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {name}
        </Name>

        <SlideShow
          ref={(carousel) => { this._carousel = carousel; }}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideScale={1}
        >
          {[1,2,3,4].map(index => (
            <Slide
              key={index}
            >
              <ImageContainer>
                <Picture
                  source={image}
                >
                  <Plop>
                    {index}
                  </Plop>
                </Picture>
              </ImageContainer>
            </Slide>
          ))}
        </SlideShow>

        <PlatformList
          isDetailed={true}
          {...this.props}
        />
      </Game>
    )
  }
}

const Game = styled(BlurView)`
  flex: 1;
  border-color: #e3e3e3;
  border-width: 3;
  border-radius: 5;
  margin-horizontal: 5;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Name = styled.Text`
  margin-top: 5;
  margin-horizontal: 15;
  font-size: 20;
  text-align: center;
  font-family: 'florentia-extralight';
`;

const SlideShow = styled(Carousel)`
  flex: 1;
`

const Slide = styled.View`
  width: ${itemWidth};
  background-color: #e3e3e3c0;
`

const ImageContainer = styled.View`
  flex: 1;
  padding-horizontal: ${itemHorizontalMargin};
`

const StyledImage = styled.Image`
  flex: 1;
  resize-mode: cover;
`;

const Plop = styled.Text``

const Picture = styled.Image`
  width: ${slideWidth};;
  resizeMode: cover;
  borderRadius: 5;
`

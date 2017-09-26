import React from 'react'
import styled from 'styled-components/native'
import ProgressiveImage from '#components/progressive-image'

export default ({
  image,
  children,
  style,
}) => (
  <RatioLessImage
    style={style}
  >
    <BackgroundImage
      imageSource={{ uri: image.tiny_url }}
    />
    <Image
      imageSource={{ uri: image.medium_url }}
    />
    {children}
  </RatioLessImage>
)

const RatioLessImage = styled.View`
  flex: 1;
`

const BackgroundImage = styled(ProgressiveImage).attrs({
  resizeMode: 'cover',
  imageBlurRadius: 5,
})`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: transparent;
`

const Image = styled(ProgressiveImage).attrs({
  resizeMode: 'contain',
  height: undefined,
  width: undefined,
})`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: transparent;
`

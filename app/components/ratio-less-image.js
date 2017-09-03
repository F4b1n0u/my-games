import React from 'react'
import styled from 'styled-components/native'
import ProgressiveImage from '@components/progressive-image'

export default ({
  image,
  children,
}) => (
  <RatioLessImage>
    <BackgroundImage
      imageSource={{ uri: image.thumb_url }}
    />
    <Image
      thumbnailSource={{ uri: image.thumb_url }}
      imageSource={{ uri: image.super_url }}
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
})`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: transparent;
`

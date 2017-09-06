import React from 'react'
import styled from 'styled-components/native'

import ProgressiveImage from '@components/progressive-image'

import { scale, verticalScale } from '@utils/dimension'

export default ({
  style,
}) => (
  <About
    style={style}
  >
    <Title>
      {'About'}
    </Title>
    <Paragraph>
      {'This app is design and developed by:\n\nFabien BEHIER\n'}
    </Paragraph>
    <Paragraph>
      {'the source are available on github at\nhttps://github.com/F4b1n0u/my-games'}
    </Paragraph>
    <Paragraph>
      {'powerded by:'}
    </Paragraph>
    <GiantBombLogo />
  </About>
)

const About = styled.View`
  flex: 1;
  overflow: hidden;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #e3e3e3;
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

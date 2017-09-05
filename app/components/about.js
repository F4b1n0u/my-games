import React from 'react'
import styled from 'styled-components/native'

import ProgressiveImage from '@components/progressive-image'

import { scale } from '@utils/dimension'

export default ({
  style,
}) => (
  <Settings
    style={style}
  >
    <Title>
      {'About'}
    </Title>
    <Paragraph>
      {'This app is design and developed by Fabien BEHIER'}
    </Paragraph>
    <Paragraph>
      {'the source are available on github at \nhttps://github.com/F4b1n0u/my-games'}
    </Paragraph>
    <Paragraph>
      {'powerded by:'}
    </Paragraph>
    <GiantBombLogo />
  </Settings>
)

const Settings = styled.View`
  border-radius: 5;
  overflow: hidden;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #e3e3e3;
  padding-vertical: 5;
  padding-horizontal: 5;
`

const Title = styled.Text`
  font-size: ${scale(20)};
  background-color: transparent;
  margin-bottom: 10;
`

const Paragraph = styled.Text`
  margin-vertical: 10;
  text-align: center;
`

const GiantBombLogo = styled(ProgressiveImage).attrs({
  imageSource: require('../../assets/images/giantbomb-logo.png'),
  resizeMode: 'contain',
  height: undefined,
  width: undefined,
})`
  height: 150;
  width: 300;
`


import React from 'react'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'

import { scale } from '#utils/dimension'

// TODO add a displayName for debug purpose to all the pure component
export default ({
  abbreviation,
  isDetailed,
  isOwned,
  style,
  iconFontSize,
  textFontSize,
}) => (
  <Platform
    style={style}
  >
    <Icon
      isDetailed={isDetailed}
      isOwned={isOwned}
      iconFontSize={iconFontSize}
    />
    <Abbreviation
      isDetailed={isDetailed}
      textFontSize={textFontSize}
    >
      {abbreviation.toUpperCase()}
    </Abbreviation>
  </Platform>
)

const Platform = styled.View``

const Icon = styled(Ionicons).attrs({
  name: 'ios-game-controller-b-outline',
})`
  opacity:    ${props => props.isOwned ? '1' : '0.5'};
  font-size:  ${props => {
    console.log(props)
    return scale(props.iconFontSize)
  }};
  color:      ${props => props.isDetailed ? '#000000' : '#fafafa'};
`

const Abbreviation = styled.Text`
  background-color: transparent;
  font-family: 'florentia-extralight';
  font-size:  ${props => scale(props.textFontSize)};
  color:      ${props => props.isDetailed ? '#000000' : '#fafafa'};
`

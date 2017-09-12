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
}) => (
  <Platform
    style={style}
  >
    <Icon
      isDetailed={isDetailed}
      isOwned={isOwned}
    />
    <Abbreviation
      isDetailed={isDetailed}
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
  font-size:  ${props => props.isDetailed ? `${scale(40)}` : `${scale(20)}`};
  color:      ${props => props.isDetailed ? '#000000' : '#fafafa'};
`

const Abbreviation = styled.Text`
  background-color: transparent;
  font-family: 'florentia-extralight';
  color:      ${props => props.isDetailed ? '#000000' : '#fafafa'};
  font-size:  ${props => props.isDetailed ? `${scale(18)}` : `${scale(15)}`};
`

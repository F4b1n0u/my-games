import React from 'react'
import styled from 'styled-components/native'

import Platform from './platform'

export default ({
  platforms,
  isDetailed,
}) => (
  <PlatformList
    isDetailed={isDetailed}
  >
    {(platforms || []).map(platform => (
      <Platform
        key={platform.id}
        isDetailed={isDetailed}
        {...platform}
      />
    ))}
  </PlatformList>
)

const PlatformList = styled.View`
  justify-content:  ${props => props.isDetailed ? 'center' : 'flex-start'};
  flex-wrap: wrap;
  width: 100%;
  flex-direction: row;
  align-items: center;
`

import React from 'react'
import styled from 'styled-components/native'

import Platform from '@components/platform'

export default ({
  platforms,
  isDetailed,
  style,
  togglePlatformOwnership = () => {},
}) => (
  <PlatformList
    style={style}
    isDetailed={isDetailed}
  >
    {(platforms || []).map(platform => (
      <Platform
        key={platform.id}
        isDetailed={isDetailed}
        {...platform}
        togglePlatformOwnership={togglePlatformOwnership.bind(this, platform)}
      />
    ))}
  </PlatformList>
)

const PlatformList = styled.View`
  flex-wrap: wrap;
  width: 100%;
  flex-direction: row;
  align-items: center;
`

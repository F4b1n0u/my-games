import _ from 'lodash'
import React from 'react'
import { LinearGradient } from 'expo'
import styled from 'styled-components/native'

import RatioLessImage from '#components/ratio-less-image'
import PlatformComponent from '#components/platform'

import { scale } from '#utils/dimension'

const amountPlatformSupported = 14
export default class CompleteNotDetailedGameComponent extends React.Component {
  _handlePressHide = () => {
    const {
      showGameDetails,
    } = this.props

    showGameDetails()
  }

  _renderPlatformList = () => {
    const {
      hasDetailedGame,
      platforms,
    } = this.props

    return (hasDetailedGame) ?
      null
      : (
        <PlatformList>
          {(_.slice(platforms, 0, amountPlatformSupported) || []).map(platform => (
            <Platform
              key={platform.id}
              {...platform}
            />
          ))}
        </PlatformList>
      )
  }

  render() {
    const {
      name,
      image,
    } = this.props

    return (
      <Game
        onPress={this._handlePressHide}
      >
        <NameWrapper>
          <Name>
            {name}
          </Name>
        </NameWrapper>
        {
          image ? (
            <Cover
              image={image}
            >
              <Overlay>
                {this._renderPlatformList()}
              </Overlay>
            </Cover>
          ) : null
        }
      </Game>
    )
  }
}

const Game = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  flex: 1;
  background-color: transparent;
  border-radius: 2;
  overflow: hidden;
`

const NameWrapper = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  justify-content: center;
  align-items: center;
`

const Name = styled.Text.attrs({
  numberOfLines: 3,
  ellipsizeMode: 'tail',
  })`
    background-color: transparent;
    color: #333333;
    textAlign: center;
    fontSize: ${scale(20)};
    width: 100%;
    font-family: 'florentia-extralight';
  `
  

const PlatformList = styled.View`
  flex: 1;
  flex-wrap: wrap;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const Platform = styled(PlatformComponent)`
  background-color: transparent;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: ${scale(30)};
  margin-horizontal: ${scale(4)};
  margin-bottom: 0;
`


const Cover = styled(RatioLessImage).attrs({
})`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  overflow: hidden;
`

const Overlay = styled(LinearGradient).attrs({
  colors: ['transparent', 'rgba(0,0,0,0.7)'],
})`
  position: absolute;
  left: 0;
  right: 0;
  top: 70%;
  bottom: 0;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding-vertical: ${scale(5)};
  padding-horizontal: ${scale(5)};
`

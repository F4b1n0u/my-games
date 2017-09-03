import React from 'react'
import {
  LinearGradient,
} from 'expo'
import styled from 'styled-components/native'

import RatioLessImage from '@components/ratio-less-image'
import PlatformList from '@components/platform-list'

export default class CompleteNotDetailedGameComponent extends React.Component {
  constructor(props) {
    super(props)

    this._handlePressHide = this._handlePressHide.bind(this)
    this._renderPlatformList = this._renderPlatformList.bind(this)
  }

  _handlePressHide() {
    const {
      showGameDetails,
    } = this.props

    showGameDetails()
  }

  _renderPlatformList() {
    const {
      hasDetailedGame,
    } = this.props

    return (hasDetailedGame) ?
      null
      : (
        <PlatformList
          {...this.props}
        />
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
        <Name>
          {name}
        </Name>
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
  activeOpacity: 0.5,
})`
  flex: 1;
  background-color: transparent;
  border-radius: 2;
  overflow: hidden;
`

const Name = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  position: absolute;
  top: -14;
  width: 100%;
  background-color: transparent;
  paddingLeft: 2;
  color: black;
  textAlign: left;
  fontSize: 8;
  font-family: 'florentia-extralight';
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
  padding-vertical: 5;
  padding-horizontal: 5;
`

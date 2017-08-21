import React from 'react';
import {
	LinearGradient,
} from 'expo';
import styled from 'styled-components/native';

import FitImage from './fit-image'
import PlatformList from './platform-list';

const image = require('../../assets/images/zelda.png')

export default class NotDetailedGameComponent extends React.Component {
  constructor(props) {
    super(props)

    this._handleToggle = this._handleToggle.bind(this)
    this._renderPlatformList = this._renderPlatformList.bind(this);
  }

  _handleToggle = () => {
    const {
      toggleGameDetails = () => {},
    } = this.props;

    toggleGameDetails(this.props);
  }

  _renderPlatformList() {
    const {
      hasDetailed,
    } = this.props;
    
    return (hasDetailed) ?
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
		} = this.props;
    
    return (
      <Game
        onPress={this._handleToggle}        
      >
        <Name>
          {name}
        </Name>
        {
          image ? (
            <Cover
              uri={image.super_url}
              fallbackUri={image.thumb_url}
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
  activeOpacity: .5
})`
  flex: 1;
  background-color: transparent;
  border-radius: 5;
  overflow: hidden;
`;

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
`;

const Cover = styled(FitImage).attrs({
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
`;

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

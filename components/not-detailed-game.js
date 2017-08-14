import React from 'react';
import {
	LinearGradient,
} from 'expo';
import styled from 'styled-components/native';

import PlatformList from './platform-list';

const image = require('../assets/images/zelda.png')

export default class NotDetailedGameComponent extends React.Component {
  constructor(props) {
    super(props)

    this._handleToggle = this._handleToggle.bind(this)
    this._renderPlatformList = this._renderPlatformList.bind(this);
  }

  _handleToggle = () => {
    const {
      toggleGameDetails,
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
		} = this.props;
    
    return (
      <Game
        activeOpacity={.5}
        onPress={this._handleToggle}        
      >
        <Name
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {name}
        </Name>
        <Cover
          resizeMode="cover"
          source={image}
        >
          <Overlay
            colors={['transparent', 'rgba(0,0,0,0.7)']}
          >
            {this._renderPlatformList()}
          </Overlay>
        </Cover>
      </Game>
    )
  }
}

const Game = styled.TouchableOpacity`
  flex: 1;
	border-color: #e3e3e3;
	border-width: 3;
	border-radius: 5;
	background-color: transparent;
`;

const Name = styled.Text`
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

const Cover = styled.Image`
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

const Overlay = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  top: 70%;
  bottom: 0;
`

// TODO try to extend platformList style to avoid to use props

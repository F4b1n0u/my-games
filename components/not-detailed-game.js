import React from 'react';
import {
	LinearGradient,
} from 'expo';
import styled from 'styled-components/native';

import PlatformList from './platform-list';

const image = require('../assets/images/zelda.png')

export default class GameComponent extends React.Component {
  render() {
    const {
			name,
		} = this.props;
    
    return (
      <Game>
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
          /> 
        </Cover>
        <PlatformList
          {...this.props}
        />
      </Game>
    )
  }
}

const Game = styled.View`
  flex: 1;
	margin-top: 15;
	border-color: #e3e3e3;
	border-width: 3;
	border-radius: 5;
	background-color: transparent;
	overflow: hidden; // to avoid the image to be on top of the border
`;

const Name = styled.Text`
	position: absolute;
	top: 5;
	width: 100%;
	textAlign: left;
	color: black;
	background-color: transparent;
	alignItems: center;
	fontSize: 8;
	paddingLeft: 5;
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
`;

const Overlay = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  top: 70%;
  bottom: 0;
`

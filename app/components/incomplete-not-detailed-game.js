import React from 'react';
import {
	LinearGradient,
} from 'expo';
import styled from 'styled-components/native';

import FitImage from './fit-image'
import PlatformList from './platform-list';

const image = require('../../assets/images/zelda.png')

export default class IncompleteNotDetailedGameComponent extends React.Component {
  render() {
    const {
      name,
		} = this.props;
    
    return (
      <Game>
        <Name>
          {name}
        </Name>
      </Game>
    )
  }
}

const Game = styled.View`
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

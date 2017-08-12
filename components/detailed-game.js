import React from 'react';
import styled from 'styled-components/native';
import {
  BlurView,
} from 'expo'

import PlatformList from './platform-list';

export default class GameComponent extends React.Component {
  render() {
    const {
			name,
		} = this.props;
    
    return (
      <Game
        tint="light"
        intensity={60}
      >
        <Name
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {name}
        </Name>
        <PlatformList
          isDetailed={true}
          {...this.props}
        />
      </Game>
    )
  }
}

const Game = styled(BlurView)`
  flex: 1;
  border-color: #e3e3e3;
  border-width: 3;
  border-radius: 5;
  margin-left: 5;
  margin-right: 5;
`;

const Name = styled.Text`
  margin-top: 5;
  margin-left: 15;
  margin-right: 15;
  font-size: 20;
  text-align: center;
  font-family: 'florentia-extralight';
  flex: 1;
`;

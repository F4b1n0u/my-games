import React from 'react';
import styled from 'styled-components/native';

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
  flex: 1;
`;

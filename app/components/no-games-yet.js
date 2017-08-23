import React from 'react';
import styled from 'styled-components/native';

const arrows = require('../../assets/images/arrows.png')

export default class NoResultComponent extends React.Component {
	render() {
    return (
      <NoResult>
        <Arrows />
        <Instructions>
          No game yet ?! :)
          Start your search !!!
        </Instructions>
      </NoResult>
		);
	}
}

const NoResult = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const Arrows = styled.Image.attrs({
  source: arrows,
  resizeMode: 'contain',
})`
  height: 150;
`

const Instructions = styled.Text`
  font-size: 30;
  text-align: center;
  font-family: 'florentia-extralight';
`
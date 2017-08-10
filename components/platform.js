import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

export default class PlatformComponent extends React.Component {
  constructor(props) {
		super(props)
  }

  render() {
    const {
      id,
      abbreviation,
    } = this.props;

		return (
			<Platform
        key={id}
			>
        <Icon
          name="ios-game-controller-b-outline"
          size={20}
          color='#fafafa'
        />
        <Abbreviation>
          {abbreviation.toLowerCase()}
        </Abbreviation>
      </Platform>
    );
  }
}

const Platform = styled.View`
  background-color: transparent;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 30;
  margin-left: 2.5;
  margin-right: 2.5;
`

const Icon = styled(Ionicons)`
  opacity: .65;
`

const Abbreviation = styled.Text`
  background-color: transparent;
  color: #fafafa;
  font-size: 10;
`

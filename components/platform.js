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
      isDetailed,
    } = this.props;

		return (
			<Platform
        key={id}
        isDetailed={isDetailed}
			>
        <Icon
          name="ios-game-controller-b-outline"
          isDetailed={isDetailed}
        />
        <Abbreviation
          isDetailed={isDetailed}
        >
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
  height:             ${props => props.isDetailed ? '35' 	: '30'};
  margin-horizontal:  ${props => props.isDetailed ? '7.5' 	: '4'};
  margin-bottom:      ${props => props.isDetailed ? '12.5' 	: '0'};
`

const Icon = styled(Ionicons)`
  opacity:    ${props => props.isOwned ? '1' 	: '.5'};
  font-size:  ${props => props.isDetailed ? '40' 	: '20'};
  color:      ${props => props.isDetailed ? '#000000' 	: '#fafafa'};
`

const Abbreviation = styled.Text`
  background-color: transparent;
  font-family: 'florentia-extralight';
  color:      ${props => props.isDetailed ? '#000000' 	: '#fafafa'};
  font-size:  ${props => props.isDetailed ? '20' 	: '15'};
`

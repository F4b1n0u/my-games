import React from 'react';
import {
	FlatList,
} from 'react-native';
import styled from 'styled-components/native';

import Platform from './platform';

export default class platformListComponent extends React.Component {
  constructor(props) {
		super(props)
  }

	render() {
    const {
			platforms,
			isDetailed,
		} = this.props;

		return (
			<PlatformList
				isDetailed={isDetailed}
			>
        {(platforms || []).map(platform =>
          <Platform
            key={platform.id}
						isDetailed={isDetailed}
            {...platform}
          />
        )}
			</PlatformList>
		);
	}
}

const PlatformList = styled.View`
	justify-content:	${props => props.isDetailed ? 'center' 		: 'flex-start'};
	flex-wrap: wrap;
	width: 100%;
	flex-direction: row;
	align-items: center;
`

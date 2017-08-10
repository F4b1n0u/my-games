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
			platforms = []
		} = this.props;

    return (
			<PlatformList>
        {platforms.map(platform =>
          <Platform
            key={platform.id}
            {...platform}
          />
        )}
			</PlatformList>
		);
	}
}

const PlatformList = styled.View`
	position: absolute;
	bottom: 0;
	left: 0;
	margin-left: 5;
	margin-bottom: 5;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
`

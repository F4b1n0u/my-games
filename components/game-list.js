import React from 'react';
import styled from 'styled-components/native';

import Game from './game'

export default class GameListComponent extends React.Component {
  constructor(props) {
		super(props)
		
		this._renderItem = this._renderItem.bind(this)
  }

	_keyExtractor = item => item.id

	_renderItem({item}) {
		const {
			games,
			toggleGameDetails,
			detailedGameId,
		} = this.props;

		return (
			<Game
				{...item}
				toggleGameDetails={toggleGameDetails}
				isDetailed={detailedGameId === item.id}
				hasDetailed={!!detailedGameId}
			/>
		);
	}

  render() {
    const {
			games,
    } = this.props;

		return (
			<GameList
				data={games}
				keyExtractor={this._keyExtractor}
				renderItem={this._renderItem.bind(this)}
			/>
    );
  }
}

const GameList = styled.FlatList`
	flex: 1;
	margin-top: 45;
	bottom: 0;
	width: 90%;
	background-color: transparent;
	overflow: visible;
`;

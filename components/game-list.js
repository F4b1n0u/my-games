import React from 'react';
import {
	FlatList,
	View,
	Text,
	Image,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Game from './game'

export default class GameList extends React.Component {
  constructor(props) {
		super(props)
		
		this._renderItem = this._renderItem.bind(this)
  }

	_keyExtractor = item => item.id

	_renderItem({item}) {
		return (
			<Game
				{...item}
			/>
		);
	}

  render() {
    const {
      games,
    } = this.props;

		return (
			<FlatList
				style={styles.gameList}
				data={games}
				keyExtractor={this._keyExtractor}
				renderItem={this._renderItem}
			/>
    );
  }
}

const styles = EStyleSheet.create({
  gameList: {
		flex: 1,
		marginTop: 45,
		marginLeft: 5,
		marginRight: 5,
		width: '100% - 20',
		backgroundColor: "transparent",
		overflow: 'visible',
	},
});

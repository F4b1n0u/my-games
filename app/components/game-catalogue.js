import React from 'react';
import styled from 'styled-components/native';
import {
	Dimensions,
} from 'react-native';
import GameWrapper from './game-wrapper'

const {
	height,
} = Dimensions.get('window');

const normalHeight = height / 2.3
const detailedHeight = height - 50 // should depend of the ratio of the screen, the idea is to allow the user to have it in full screen

export default class GameListComponent extends React.Component {
  constructor(props) {
		super(props)
		
		this._scrollToGame = this._scrollToGame.bind(this)
		this._renderItem = this._renderItem.bind(this)
		this._renderFooter = this._renderFooter.bind(this)
		this._handleEndReached = this._handleEndReached.bind(this)
		this._setRef = this._setRef.bind(this)
  }

	_keyExtractor = item => item.game.id

	_setRef = (ref) => {
		this.flatListRef = ref
	}

	_getItemLayout = (data, index) => ({
		length: normalHeight,
		offset: normalHeight * index,
		index
	})

	_scrollToGame = (index) => {
		this.flatListRef.root.scrollToIndex({animated: true, index: "" + index});
  }

	_handleEndReached = () => {
		const {
			requestMoreGames,
			hasMore,
			isPending,
		} = this.props

		if (hasMore && !isPending) {
			requestMoreGames()
		}
	}
	
	_renderItem({
		item,
		index,
	}) {
		const {
			toggleGameDetails,
			collapseDetailedGames,
			requestGameCompletion,
			detailedGameId,
			showGameDetails,
			hideGameDetails,
		} = this.props;

		return (
			<GameWrapper
				{...item}
				scrollToMe={this._scrollToGame.bind(this, index)}
				normalHeight={normalHeight}
				detailedHeight={detailedHeight}
				showGameDetails={showGameDetails.bind(this, item.game)}
				hideGameDetails={hideGameDetails}
				requestGameCompletion={requestGameCompletion.bind(this, item.game)}
				isDetailed={detailedGameId === item.game.id}
				hasDetailedGame={!!detailedGameId}
			/>
		);
	}

	_renderFooter = () => {
		const {
			isPending,
		} = this.props

		return (isPending) ? (
			<Footer>
        <Spinner />
      </Footer>
		) : null
  };

  render() {
    const {
			list,
			detailedGameId,
    } = this.props;

		const hasDetailedGame = !!detailedGameId

		return (
			<GameList
				hasDetailedGame={hasDetailedGame}
				ref={this._setRef}
				data={list}
				keyExtractor={this._keyExtractor}
				getItemLayout={this._getItemLayout}
				renderItem={this._renderItem.bind(this)}
				ListFooterComponent={this._renderFooter}
				onEndReached={this._handleEndReached}
				scrollEnabled={!hasDetailedGame}
			/>
    );
  }
}

const GameList = styled.FlatList`
	flex: 1;
	background-color: transparent;
	overflow: visible;
	margin-top: ${props => props.hasDetailedGame ? 10 : 50};
	bottom: 0;
	width: 100%;
`;

const Game = styled(GameWrapper)`
`

const Footer = styled.View`
	padding-vertical: 20;
`

const Spinner = styled.ActivityIndicator.attrs({
	animating: true,
	size: 'large',
})``

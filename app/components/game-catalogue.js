import React from 'react'
import styled from 'styled-components/native'
import {
  Dimensions,
} from 'react-native'
import GameWrapper from '@components/game-wrapper'

const {
  height,
} = Dimensions.get('window')

const normalHeight = height / 2.3
// should depend of the ratio of the screen, the idea is to allow the user to have it in full screen
const detailedHeight = height - 50

export default class GameCatalogueComponent extends React.Component {
  static _keyExtractor(item) {
    return item.game.id
  }

  static _getItemLayout(data, index) {
    return {
      length: normalHeight,
      offset: normalHeight * index,
      index,
    }
  }

  _setRef = (ref) => {
    this.flatListRef = ref
  }

  _scrollToGame = (index) => {
    this.flatListRef.root.scrollToIndex({
      animated: true,
      index: `${index}`,
    })
  }

  _handleEndReached = () => {
    const {
      requestMoreGames,
      hasMoreGame,
      isGamePending,
    } = this.props

    if (hasMoreGame && !isGamePending) {
      requestMoreGames()
    }
  }

  _renderItem = ({
    item,
    index,
  }) => {
    const {
      detailedGameId,
      hasDetailedGame,
      hideGameDetails,
      showGameDetails,
      requestGamePartialCompletion,
      togglePlatformOwnership,
    } = this.props

    return (
      <Game
        detailedHeight={detailedHeight}
        hasDetailedGame={hasDetailedGame}
        isDetailed={detailedGameId === item.game.id}
        normalHeight={normalHeight}
        {...item}

        hideGameDetails={hideGameDetails}
        requestGamePartialCompletion={requestGamePartialCompletion.bind(this, item.game)}
        scrollToMe={this._scrollToGame.bind(this, index)}
        showGameDetails={showGameDetails.bind(this, item.game)}
        togglePlatformOwnership={togglePlatformOwnership.bind(this, item.game)}
      />
    )
  }

  _renderFooter = () => {
    const {
      isGamePending,
    } = this.props

    return (isGamePending) ? (
      <Footer>
        <Spinner />
      </Footer>
    ) : null
  }

  render() {
    const {
      list,
      detailedGameId,
      style
    } = this.props

    const hasDetailedGame = !!detailedGameId

    return (
      <GameCatalogue
        hasDetailedGame={hasDetailedGame}
        ref={this._setRef}
        data={list}
        keyExtractor={GameCatalogueComponent._keyExtractor}
        getItemLayout={GameCatalogueComponent._getItemLayout}
        renderItem={this._renderItem}
        ListFooterComponent={this._renderFooter}
        onEndReached={this._handleEndReached}
        scrollEnabled={!hasDetailedGame}
        style={style}
      />
    )
  }
}

const GameCatalogue = styled.FlatList`
  flex: 1;
  margin-top: ${props => props.hasDetailedGame ? 10 : 50};
  background-color: transparent;
`

// TODO extract the style from the wrapper because it have sense only in the list context
const Game = styled(GameWrapper)`
  margin-bottom: 10;
  border-color: #333333;
  border-width: 1;
  border-radius: 5;
`

const Footer = styled.View`
  padding-vertical: 20;
`

const Spinner = styled.ActivityIndicator.attrs({
  animating: true,
  size: 'large',
})``

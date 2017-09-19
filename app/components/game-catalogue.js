import React from 'react'
import styled from 'styled-components/native'
import { Dimensions, PixelRatio } from 'react-native'

import GameWrapper from '#components/game-wrapper'

import { scale, verticalScale } from '#utils/dimension'

const {
  height,
} = Dimensions.get('window')

const normalHeight = PixelRatio.roundToNearestPixel(height / 2.3)
const detailedHeight = height - verticalScale(45) // minus height of the status bar + pixel a marge

export default class GameCatalogueComponent extends React.Component {
  static _keyExtractor(item) {
    return item.id
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
    item: game,
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
        isDetailed={detailedGameId === game.id}
        normalHeight={normalHeight}
        {...game}

        hideGameDetails={hideGameDetails}
        requestGamePartialCompletion={requestGamePartialCompletion.bind(this, game)}
        scrollToMe={this._scrollToGame.bind(this, index)}
        showGameDetails={showGameDetails.bind(this, game)}
        togglePlatformOwnership={togglePlatformOwnership.bind(this, game)}
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
      games,
      detailedGameId,
      style
    } = this.props

    const hasDetailedGame = !!detailedGameId

    return (
      <GameCatalogue
        hasDetailedGame={hasDetailedGame}
        ref={this._setRef}
        data={games}
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
  background-color: transparent;
`

// TODO extract the style from the wrapper because it have sense only in the list context
const Game = styled(GameWrapper)`
  border-color: #333333;
  border-width: 1;
  border-radius: 5;
  margin-bottom: ${verticalScale(10)};
`

const Footer = styled.View`
  padding-vertical: 20;
`

const Spinner = styled.ActivityIndicator.attrs({
  animating: true,
  size: 'large',
})``

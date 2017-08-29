import React from 'react';
import { connect } from 'react-redux'

import { 
  getDetailedGameId,
  hasDetailedGame,
} from '@selectors/game-explorer'

import {
  showGameDetails,
  hideGameDetails,
} from '@actions/game-explorer'

import { 
  getList,
  isPending,
  hasMore,
} from '@selectors/game-catalogue'

import {
  requestMoreGames,
  requestGameCompletion,
} from '@actions/game-catalogue'

import GameCatalogue from '@components/game-catalogue'

const mapStateToProps = state => {
  return ({
    list: getList(state.gameCatalogue),
    hasMore: hasMore(state.gameCatalogue),
    isPending: isPending(state.gameCatalogue),
    detailedGameId: getDetailedGameId(state.gameExplorer),
    hasDetailedGame: hasDetailedGame(state.gameExplorer),
  })
}

const mapDispatchToProps = dispatch => ({
  requestMoreGames: () => dispatch(requestMoreGames()),
  requestGameCompletion: game => dispatch(requestGameCompletion(game)),
  showGameDetails: game => dispatch(showGameDetails(game)),
  hideGameDetails: () => dispatch(hideGameDetails()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameCatalogue)

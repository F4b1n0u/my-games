import React from 'react';
import { connect } from 'react-redux'

import { 
  getDetailedGameId,
} from '@selectors/app'

import { 
  getList,
  isPending,
  hasMore,
} from '@selectors/game-catalogue'

import {
  requestMoreGames,
  requestGameCompletion,
} from '@actions/game-catalogue'

import {
  showGameDetails,
  hideGameDetails,
} from '@actions/app'

import GameCatalogue from '@components/game-catalogue'

const mapStateToProps = state => {
  return ({
    list: getList(state.gameCatalogue),
    hasMore: hasMore(state.gameCatalogue),
    isPending: isPending(state.gameCatalogue),
    detailedGameId: getDetailedGameId(state.app),
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

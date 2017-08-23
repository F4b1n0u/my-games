import React from 'react';
import { connect } from 'react-redux'

import { 
  getDetailedGameId,
} from '@selectors/app'

import { 
  getList,
} from '@selectors/game-catalogue'

import {
  requestGameCompletion,
} from '@actions/game-catalogue'

import {
  showGameDetails,
  hideGameDetails,
} from '@actions/app'

import GameList from '@components/game-list'

const mapStateToProps = state => {
  return ({
    list: getList(state.gameCatalogue),
    detailedGameId: getDetailedGameId(state.app),
  })
}

const mapDispatchToProps = dispatch => ({
  requestGameCompletion: game => dispatch(requestGameCompletion(game)),
  showGameDetails: game => dispatch(showGameDetails(game)),
  hideGameDetails: () => dispatch(hideGameDetails()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameList)

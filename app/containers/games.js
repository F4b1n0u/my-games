import React from 'react';
import { connect } from 'react-redux'

import { 
  getDetailedGameId,
} from '@selectors/app'

import { 
  getList,
  getStatus as getListStatus,
} from '@selectors/games'

import {
  requestGameCompletion,
} from '@actions/games'

import {
  showGameDetails,
  hideGameDetails,
} from '@actions/app'

import GameList from '@components/game-list'

const mapStateToProps = state => {
  return ({
    list: getList(state.games),
    status: getListStatus(state.games),
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

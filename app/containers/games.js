import React from 'react';
import { connect } from 'react-redux'

import { 
  getList,
  getListStatus,
  getDetailedGameId,
} from '@selectors/games'

import {
  requestGameCompletion,
  showGameDetails,
  hideGameDetails,
} from '@actions/games'

import GameList from '@components/game-list'

const mapStateToProps = state => {
  return ({
    list: getList(state.games),
    status: getListStatus(state.games),
    detailedGameId: getDetailedGameId(state.games),
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

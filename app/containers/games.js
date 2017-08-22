import React from 'react';
import { connect } from 'react-redux'

import { 
  getList,
  getListStatus,
} from '@selectors/games'

import {
  requestGameCompletion,
} from '@actions/games'

import GameList from '@components/game-list'

const mapStateToProps = state => {
  return ({
    list: getList(state.games),
    status: getListStatus(state.games)
  })
}

const mapDispatchToProps = dispatch => ({
  requestGameCompletion: game => dispatch(requestGameCompletion(game)),
  // showDetailedGame: franchise => {
  //   dispatch(showDetailedGame(game))
  // },
  // hideDetailedGame: franchise => {
  //   dispatch(hideDetailedGame())
  // }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameList)

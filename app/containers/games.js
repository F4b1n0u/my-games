import React from 'react';
import { connect } from 'react-redux'

import { 
  getGames,
  getGamesStatus,
} from '@selectors/games'

import GameList from '@components/game-list'

const mapStateToProps = state => {
  return ({
    games: getGames(state.games),
    status: getGamesStatus(state.games)
  })
}

const mapDispatchToProps = dispatch => ({
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

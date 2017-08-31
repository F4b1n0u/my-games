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
  requestGamePartialCompletion,
} from '@actions/game-catalogue'

import {
  togglePlatformOwnership,
} from '@actions/owned-game-catalogue'

import GameCatalogue from '@components/game-catalogue'

const mapStateToProps = state => ({
  list: getList(state.gameCatalogue),
  hasMore: hasMore(state.gameCatalogue),
  isPending: isPending(state.gameCatalogue),
  detailedGameId: getDetailedGameId(state.gameExplorer),
  hasDetailedGame: hasDetailedGame(state.gameExplorer),
})

const mapDispatchToProps = dispatch => ({
  requestMoreGames: () => dispatch(requestMoreGames()),
  requestGamePartialCompletion: game => dispatch(requestGamePartialCompletion(game)),
  showGameDetails: game => dispatch(showGameDetails(game)),
  hideGameDetails: () => dispatch(hideGameDetails()),
  togglePlatformOwnership: (game, platform) => dispatch(togglePlatformOwnership(game, platform)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameCatalogue)

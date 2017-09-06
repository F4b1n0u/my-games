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
  hasGames,
} from '@selectors/game-catalogue'

import {
  requestMoreGames,
  requestGamePartialCompletion,
} from '@actions/game-catalogue'

import {
  hasOwnedGame,
} from '@selectors/owned-game-catalogue'

import {
  togglePlatformOwnership,
} from '@actions/owned-game-catalogue'

import GameExplorer from '@components/game-explorer'

const mapStateToProps = (state) => {
  const {
    gameCatalogue,
    gameExplorer,
    ownedGameCatalogue,
  } = state

  return {
    list: getList(gameCatalogue),
    hasMore: hasMore(gameCatalogue),
    isPending: isPending(gameCatalogue),
    hasGamesToDisplay: hasGames(gameCatalogue),
    detailedGameId: getDetailedGameId(gameExplorer),
    hasDetailedGame: hasDetailedGame(gameExplorer),
    hasOwnedGame: hasOwnedGame(ownedGameCatalogue),
  }
}

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
)(GameExplorer)

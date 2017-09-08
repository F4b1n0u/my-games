import { connect } from 'react-redux'

import { getGames, isPending as isGamePending, hasMore as hasMoreGame, hasGames } from '@selectors/game-catalogue'
import { getDetailedGameId, hasDetailedGame } from '@selectors/game-explorer'
import { hasOwnedGame, getMarkedGames } from '@selectors/owned-game-catalogue'
import { isCurrentSearchSubmitted } from '@selectors/search-engine'

import { requestMoreGames, requestGamePartialCompletion } from '@actions/game-catalogue'
import { togglePlatformOwnership } from '@actions/owned-game-catalogue'
import { showGameDetails, hideGameDetails } from '@actions/game-explorer'

import GameExplorer from '@components/game-explorer'

const mapStateToProps = (state) => {
  const {
    gameCatalogue,
    gameExplorer,
    ownedGameCatalogue,
    searchEngine,
  } = state


  const games = getGames(gameCatalogue)

  return {
    games: getMarkedGames(ownedGameCatalogue, games),
    hasMoreGame: hasMoreGame(gameCatalogue),
    isGamePending: isGamePending(gameCatalogue),
    hasGamesToDisplay: hasGames(gameCatalogue),
    detailedGameId: getDetailedGameId(gameExplorer),
    hasDetailedGame: hasDetailedGame(gameExplorer),
    hasOwnedGame: hasOwnedGame(ownedGameCatalogue),
    isCurrentSearchSubmitted: isCurrentSearchSubmitted(searchEngine)
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

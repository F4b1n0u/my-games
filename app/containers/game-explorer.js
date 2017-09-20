import { connect } from 'react-redux'

import { isPending as isGamePending, hasMore as hasMoreGame, hasGames } from '#selectors/game-catalogue'
import { getDetailedGameId, hasDetailedGame, isDisplayingOnlyOwnedGames } from '#selectors/game-explorer'
import { hasOwnedGame, getMarkedGames } from '#selectors/owned-game-catalogue'
import { isCurrentSearchSubmitted } from '#selectors/search-engine'

import { requestMoreGames } from '#modules/game-catalogue'
import { requestGamePartialCompletion } from '#modules/game-catalogue/item/game'
import { togglePlatformOwnership } from '#modules/owned-game-catalogue'
import { showGameDetails, hideGameDetails, markDisplayingOnlyOwnedGames } from '#modules/game-explorer'

import GameExplorer from '#components/game-explorer'

const mapStateToProps = state => ({
  games: getMarkedGames(state),
  hasMoreGame: hasMoreGame(state),
  isGamePending: isGamePending(state),
  hasGamesToDisplay: hasGames(state),
  detailedGameId: getDetailedGameId(state),
  hasDetailedGame: hasDetailedGame(state),
  hasOwnedGame: hasOwnedGame(state),
  isCurrentSearchSubmitted: isCurrentSearchSubmitted(state),
  isDisplayingOnlyOwnedGames: isDisplayingOnlyOwnedGames(state),
})

const mapDispatchToProps = dispatch => ({
  requestMoreGames: () => dispatch(requestMoreGames()),
  requestGamePartialCompletion: game => dispatch(requestGamePartialCompletion(game)),
  showGameDetails: game => dispatch(showGameDetails(game)),
  hideGameDetails: () => dispatch(hideGameDetails()),
  togglePlatformOwnership: (game, platform) => dispatch(togglePlatformOwnership(game, platform)),
  displayOnlyOwnedGame: () => dispatch(markDisplayingOnlyOwnedGames())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameExplorer)

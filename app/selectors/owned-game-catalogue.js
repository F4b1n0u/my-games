import _ from 'lodash'
import { createSelector } from 'reselect'

import { getGames } from '#selectors/game-catalogue'

export const getOwnedGameList = state => state.ownedGameCatalogue.games

export const getOwnedGameIds = state => Object.keys(getOwnedGameList(state))

export const getOwnedGames = createSelector(
  [getOwnedGameIds],
  ownedGameIds => ownedGameIds.map(id => ({ id }))
)

export const getOwnedPlatformIds = (ownedGamesList, game) => ownedGamesList[game.id] || []

export const hasOwnedGame = state => !_.isEmpty(state.ownedGameCatalogue.games)

export const isPlatformOwned = createSelector(
  [(ownedGamesList, game, platform) => ({ ownedGamesList, game, platform })],
  ({ ownedGamesList, game, platform }) => {
    const ownedPlatformIds = getOwnedPlatformIds(ownedGamesList, game)
    const platformIds = [platform.id]
    const commonPlatformIds = _.intersection(
      ownedPlatformIds,
      platformIds
    )
    return !_.isEmpty(commonPlatformIds)
  }
)

export const isGameOwned = (ownedGamesList, game) => game.platforms.some(isPlatformOwned.bind(null, ownedGamesList, game))

export const getMarkedPlatform = (ownedGamesList, game, platform) => {
  const ownedPlatformIds = getOwnedPlatformIds(ownedGamesList, game)

  const isOwned = ownedPlatformIds.includes(platform.id)
  return _.merge(
    {},
    platform,
    {
      isOwned,
    }
  )
}


export const getMarkedGame = createSelector(
  [isGameOwned, (ownedGamesList, game) => ({ ownedGamesList, game })],
  (isOwned, { ownedGamesList, game }) => {
    const markedGame = _.merge(
      {},
      game,
      {
        isOwned,
        platforms: game.platforms.map(getMarkedPlatform.bind(null, ownedGamesList, game))
      }
    )
    return markedGame
  }
)

export const getMarkedGames = createSelector(
  [getGames, getOwnedGameList],
  (games, ownedGamesList) => games.map(getMarkedGame.bind(null, ownedGamesList))
)

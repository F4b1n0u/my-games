import _ from 'lodash'
import { createSelector } from 'reselect'

import { STATE_KEY as OWNED_GAME_CATALOGUE_KEY } from '#modules/owned-game-catalogue'
import { STATE_KEY as PLATFORMS_KEY } from '#modules/game-catalogue/item/game/platforms'
import { getGames } from '#selectors/game-catalogue'

export const getOwnedGameList = state => state[OWNED_GAME_CATALOGUE_KEY].games

export const getOwnedGameIds = state => Object.keys(getOwnedGameList(state))

export const getOwnedGames = createSelector(
  [getOwnedGameIds],
  ownedGameIds => ownedGameIds.map(id => ({ id }))
)

export const getOwnedPlatformIds = (ownedGamesList, game) => {
  return ownedGamesList[game.id] || []
}

export const hasOwnedGame = state => !_.isEmpty(state[OWNED_GAME_CATALOGUE_KEY].games)

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

export const isGameOwned = (ownedGamesList, game) => {
  return game[PLATFORMS_KEY].some(isPlatformOwned.bind(null, ownedGamesList, game))
}

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
        [PLATFORMS_KEY]: game[PLATFORMS_KEY].map(getMarkedPlatform.bind(null, ownedGamesList, game))
      }
    )
    return markedGame
  }
)

export const getMarkedGames = createSelector(
  [getGames, getOwnedGameList],
  (games, ownedGamesList) => games.map(getMarkedGame.bind(null, ownedGamesList))
)

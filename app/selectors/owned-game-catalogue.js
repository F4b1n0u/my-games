import _ from 'lodash'

import { getGames } from '@selectors/game-catalogue'

export const getOwnedGames = state => Object.keys(state.ownedGameCatalogue.games).map(id => ({ id }))

export const getOwnedPlatformIds = (state, game) => state.ownedGameCatalogue.games[game.id] || []

export const hasOwnedGame = state => !_.isEmpty(state.ownedGameCatalogue.games)

export const isPlatformOwned = (state, game, platform) => {
  const ownedPlatformIds = getOwnedPlatformIds(state, game)
  const platformIds = [platform.id]
  const commonPlatformIds = _.intersection(
    ownedPlatformIds,
    platformIds
  )

  return !_.isEmpty(commonPlatformIds)
}

export const isGameOwned = (state, game) => game.platforms.some(isPlatformOwned.bind(null, state, game))

export const getMarkedPlatform = (state, game, platform) => {
  const ownedPlatformIds = getOwnedPlatformIds(state, game)

  const isOwned = ownedPlatformIds.includes(platform.id)
  return _.merge(
    {},
    platform,
    {
      isOwned,
    }
  )
}

export const getMarkedGame = (state, game) => {
  const markedGame = _.merge(
    {},
    game,
    {
      isOwned: isGameOwned(state, game),
      platforms: game.platforms.map(getMarkedPlatform.bind(null, state, game))
    }
  )

  return markedGame
}

export const getMarkedGames = state => getGames(state).map(getMarkedGame.bind(null, state))

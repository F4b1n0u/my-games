import _ from 'lodash'

export const getOwnedGames = state => Object.keys(state.ownedGames).map(id => ({ id }))

export const getOwnedPlatformIds = (state, game) => state.ownedGames[game.id] || []

export const hasOwnedGame = state => !_.isEmpty(state.ownedGames)

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

export const getMarkedGames = (state, games) => games.map(getMarkedGame.bind(null, state))

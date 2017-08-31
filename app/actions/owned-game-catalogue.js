export const MARK_GAME_OWNERSHIP = 'my-games/owned-game-catalogue/MARK_GAME_OWNERSHIP'
export const TOGGLE_PLATFORM_OWNERSHIP = 'my-games/owned-game-catalogue/TOGGLE_PLATFORM_OWNERSHIP'

export const markGameOwnership = (game, ownedPlatforms) => ({
  type: MARK_GAME_OWNERSHIP,
  game,
  ownedPlatforms,
})

export const togglePlatformOwnership = (game, platform) => ({
  type: TOGGLE_PLATFORM_OWNERSHIP,
  game,
  platform,
})

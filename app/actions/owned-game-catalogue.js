export const TOGGLE_PLATFORM_OWNERSHIP = 'my-games/owned-game-catalogue/TOGGLE_PLATFORM_OWNERSHIP'

export const togglePlatformOwnership = (game, platform) => ({
  type: TOGGLE_PLATFORM_OWNERSHIP,
  game,
  platform,
})

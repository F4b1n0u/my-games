export const MARK_GAME_OWNERSHIP = 'my-games/owned-game-catalogue/MARK_GAME_OWNERSHIP'
export const TOGGLE_OWNERSHIP = 'my-games/owned-game-catalogue/TOGGLE_OWNERSHIP'

export const markGameOwnership = (game, ownedPlatforms) => ({
  type: MARK_GAME_OWNERSHIP,
  game,
  ownedPlatforms,
})

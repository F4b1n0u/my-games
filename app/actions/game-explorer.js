export const SHOW_GAME_DETAILS = 'my-games/game-explorer/SHOW_GAME_DETAILS'
export const HIDE_GAME_DETAILS = 'my-games/game-explorer/HIDE_GAME_DETAILS'

export const showGameDetails = detailedGame => ({
  type: SHOW_GAME_DETAILS,
  detailedGame,
})

export const hideGameDetails = () => ({
  type: HIDE_GAME_DETAILS,
})

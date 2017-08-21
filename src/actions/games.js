export const REQUEST_GAMES          = 'my-games/game-list/REQUEST_GAMES'
export const RECEIVE_GAMES_SUCCESS  = 'my-games/game-list/RECEIVE_GAMES_SUCCESS'
export const RECEIVE_GAMES_FAILURE  = 'my-games/game-list/RECEIVE_GAMES_FAILURE'
export const SHOW_GAME_DETAILS      = 'my-games/game-list/SHOW_GAME_DETAILS'

export const selectFranchise = (selectedFranchise) => ({
  type: SELECT_FRANCHISE,
  selectedFranchise,
})

export const stopSearching = () => ({
  type: STOP_SEARCHING,
})

export const requestGames = () => ({
  type: REQUEST_GAMES,
})

export const receiveGames = (games) => ({
  type: RECEIVE_games_SUCCESS,
  games,
})

export const receiveGamesFailure = (error) => ({
  type: RECEIVE_GAMES_FAILURE,
  error,
})

export const showGameDetails = (detailedGame) => ({
  type: SHOW_GAME_DETAILS,
  detailedGame,
})
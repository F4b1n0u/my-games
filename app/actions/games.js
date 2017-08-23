export const REQUEST_GAMES                    = 'my-games/game-list/REQUEST_GAMES'
export const RECEIVE_GAMES_SUCCESS            = 'my-games/game-list/RECEIVE_GAMES_SUCCESS'
export const RECEIVE_GAMES_FAILURE            = 'my-games/game-list/RECEIVE_GAMES_FAILURE'
export const REQUEST_GAME_COMPLETION          = 'my-games/game-list/REQUEST_GAME_COMPLETION'
export const RECEIVE_GAME_COMPLETION_SUCCESS  = 'my-games/game-list/RECEIVE_GAME_COMPLETION_SUCCESS'
export const RECEIVE_GAME_COMPLETION_FAILURE  = 'my-games/game-list/RECEIVE_GAME_COMPLETION_FAILURE'
export const REQUEST_MORE_GAMES               = 'my-games/game-list/REQUEST_MORE_GAMES'
export const RECEIVE_MORE_GAMES_SUCCESS       = 'my-games/game-list/RECEIVE_MORE_GAMES_SUCCESS'
export const RECEIVE_MORE_GAMES_FAILURE       = 'my-games/game-list/RECEIVE_MORE_GAMES_FAILURE'

export const selectFranchise = selectedFranchise => ({
  type: SELECT_FRANCHISE,
  selectedFranchise,
})

export const stopSearching = () => ({
  type: STOP_SEARCHING,
})

export const requestGames = () => ({
  type: REQUEST_GAMES,
})

export const receiveGames = (
  games,
  pagination,
) => ({
  type: RECEIVE_GAMES_SUCCESS,
  games,
  pagination,
})

export const receiveGamesFailure = error => ({
  type: RECEIVE_GAMES_FAILURE,
  error,
})

export const requestGameCompletion = game => ({
  type: REQUEST_GAME_COMPLETION,
  game,
})

export const receiveGameCompletion = completedGame => ({
  type: RECEIVE_GAME_COMPLETION_SUCCESS,
  completedGame,
})

export const receiveGameCompletionFailure = error => ({
  type: RECEIVE_GAME_COMPLETION_FAILURE,
  error,
})

export const requestMoreGame = () => ({
  type: REQUEST_MORE_GAMES,
})

export const receiveMoreGame = games => ({
  type: RECEIVE_MORE_GAMES_SUCCESS,
  games,
})

export const receiveMoreGameFailure = error => ({
  type: RECEIVE_MORE_GAMES_FAILURE,
  error,
})

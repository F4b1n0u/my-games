export const REQUEST_GAMES = 'my-games/game-catalogue/REQUEST_GAMES'
export const RECEIVE_GAMES_SUCCESS = 'my-games/game-catalogue/RECEIVE_GAMES_SUCCESS'
export const RECEIVE_GAMES_FAILURE = 'my-games/game-catalogue/RECEIVE_GAMES_FAILURE'
export const REQUEST_GAME_PARTIAL_COMPLETION = 'my-games/game-catalogue/REQUEST_GAME_PARTIAL_COMPLETION'
export const REQUEST_GAME_FULL_COMPLETION = 'my-games/game-catalogue/REQUEST_GAME_FULL_COMPLETION'
export const REQUEST_GAMES_COMPLETION = 'my-games/game-catalogue/REQUEST_GAMES_COMPLETION'
export const RECEIVE_GAME_COMPLETION_SUCCESS = 'my-games/game-catalogue/RECEIVE_GAME_COMPLETION_SUCCESS'
export const RECEIVE_GAME_COMPLETION_FAILURE = 'my-games/game-catalogue/RECEIVE_GAME_COMPLETION_FAILURE'
export const REQUEST_MORE_GAMES = 'my-games/game-catalogue/REQUEST_MORE_GAMES'
export const RECEIVE_MORE_GAMES_SUCCESS = 'my-games/game-catalogue/RECEIVE_MORE_GAMES_SUCCESS'
export const RECEIVE_MORE_GAMES_FAILURE = 'my-games/game-catalogue/RECEIVE_MORE_GAMES_FAILURE'
export const RECEIVE_GAME_SUCCESS = 'my-games/game-catalogue/RECEIVE_GAME_SUCCESS'

export const requestGames = games => ({
  type: REQUEST_GAMES,
  games,
})

export const receiveGames = (games, pagination) => ({
  type: RECEIVE_GAMES_SUCCESS,
  games,
  pagination,
})

export const receiveGamesFailure = error => ({
  type: RECEIVE_GAMES_FAILURE,
  error,
})

export const requestGamePartialCompletion = game => ({
  type: REQUEST_GAME_PARTIAL_COMPLETION,
  game,
})

export const requestGameFullCompletion = game => ({
  type: REQUEST_GAME_FULL_COMPLETION,
  game,
})

export const requestGamesCompletion = games => ({
  type: REQUEST_GAMES_COMPLETION,
  games,
})

export const receiveGameCompletion = completedGame => ({
  type: RECEIVE_GAME_COMPLETION_SUCCESS,
  completedGame,
})

export const receiveGameCompletionFailure = error => ({
  type: RECEIVE_GAME_COMPLETION_FAILURE,
  error,
})

export const requestMoreGames = () => ({
  type: REQUEST_MORE_GAMES,
})

export const receiveMoreGames = (games, pagination) => ({
  type: RECEIVE_MORE_GAMES_SUCCESS,
  games,
  pagination,
})

export const receiveMoreGamesFailure = error => ({
  type: RECEIVE_MORE_GAMES_FAILURE,
  error,
})

export const receiveGame = game => ({
  type: RECEIVE_GAME_SUCCESS,
  game,
})

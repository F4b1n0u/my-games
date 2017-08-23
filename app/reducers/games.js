import {
  combineReducers,
} from 'redux'
import {
  REQUEST_GAMES,
  RECEIVE_GAMES_SUCCESS,
  RECEIVE_GAMES_FAILURE,
  REQUEST_GAME_COMPLETION,
  RECEIVE_GAME_COMPLETION_SUCCESS,
  SHOW_GAME_DETAILS,
  HIDE_GAME_DETAILS,
} from '@actions/games'

import {
  SELECT_FRANCHISE,
  RECEIVE_GAME_COMPLETION_FAILURE,
  RECEIVE_FRANCHISE_COMPLETION_SUCCESS,
  RECEIVE_FRANCHISE_COMPLETION_FAILURE,
} from '@actions/search-engine'

import {
  default as gameReducer,
} from '@reducers/game'

const initialState = {
  list: [],
  listStatus: {
    pending: false,
    error: null
  },
  detailedGameId: null,
}

function list(
  state = initialState.list,
  action,
) {
  switch (action.type) {    
    case REQUEST_GAME_COMPLETION:
    case RECEIVE_GAME_COMPLETION_SUCCESS:
    case RECEIVE_GAME_COMPLETION_FAILURE:
      return state.map(
        item => gameReducer(
          item,
          action,
        )
      )
    case RECEIVE_GAMES_SUCCESS:
      return action.games.map(
        game => gameReducer(
          {
            game,
          },
          action,
        )
      )
    case RECEIVE_FRANCHISE_COMPLETION_SUCCESS:
      return action.completedFranchise.games.map(
        game => gameReducer(
          {
            game,
          },
          action,
        )
      )
    case REQUEST_GAMES:
    case SELECT_FRANCHISE:
    case RECEIVE_FRANCHISE_COMPLETION_FAILURE:
    case RECEIVE_GAMES_FAILURE:
      return []
    default:
      return state
  }
}

function listStatus(
  state = initialState.listStatus,
  action,
) {
  switch (action.type) {
    case REQUEST_GAMES:
    case SELECT_FRANCHISE:
      return {
        pending: true,
        error: null
      }
    case RECEIVE_GAMES_SUCCESS:
      return initialState.listStatus;
    case RECEIVE_GAMES_FAILURE:
      return {
        pending: false,
        error: action.error
      }
    default:
      return state
  }
}

function detailedGameId(
  state = initialState.detailedGameId,
  action,
) {
  switch (action.type) {
    case SHOW_GAME_DETAILS:
      return action.detailedGame.id
    case HIDE_GAME_DETAILS:
      return initialState.detailedGameId
    default:
      return state
  }
}

export default combineReducers({
  list,
  listStatus,
  detailedGameId,
})

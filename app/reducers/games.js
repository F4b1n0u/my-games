import {
  combineReducers,
} from 'redux'

import {
  REQUEST_GAMES,
  RECEIVE_GAMES_SUCCESS,
  RECEIVE_GAMES_FAILURE,
  REQUEST_GAME_COMPLETION,
  RECEIVE_GAME_COMPLETION_SUCCESS,
} from '@actions/games'
import {
  SHOW_GAME_DETAILS,
  HIDE_GAME_DETAILS,
} from '@actions/app'
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
  status: {
    pending: false,
    error: null
  },
  pagintion: {
    max: 10, 
    amount: 0,
    total: 0,
    offset: 0,
  },
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

function status(
  state = initialState.status,
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
      return initialState.status;
    case RECEIVE_GAMES_FAILURE:
      return {
        pending: false,
        error: action.error
      }
    default:
      return state
  }
}

function listPagination(

) {
  
}

export default combineReducers({
  list,
  status,
})

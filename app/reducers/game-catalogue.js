import {
  combineReducers,
} from 'redux'
import _ from 'lodash'

import {
  REQUEST_GAMES,
  RECEIVE_GAMES_SUCCESS,
  RECEIVE_GAMES_FAILURE,
  REQUEST_MORE_GAMES,
  RECEIVE_MORE_GAMES_SUCCESS,
  RECEIVE_MORE_GAMES_FAILURE,
  REQUEST_GAME_PARTIAL_COMPLETION,
  REQUEST_GAME_FULL_COMPLETION,
  RECEIVE_GAME_COMPLETION_SUCCESS,
} from '@actions/game-catalogue'
import {
  SHOW_GAME_DETAILS,
  HIDE_GAME_DETAILS,
} from '@actions/game-explorer'
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
  pagination: {
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
    case REQUEST_GAME_PARTIAL_COMPLETION:
    case REQUEST_GAME_FULL_COMPLETION:
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
    case RECEIVE_MORE_GAMES_SUCCESS:
      return _.concat(
        state,
        action.games.map(game => gameReducer(
          {
            game,
          },
          action,
        )),
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
    case REQUEST_MORE_GAMES:
    case SELECT_FRANCHISE:
      return {
        pending: true,
        error: null
      }
    case RECEIVE_GAMES_SUCCESS:
    case RECEIVE_MORE_GAMES_SUCCESS:
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

function pagination(
  state = initialState.pagination,
  action,
) {
  switch (action.type) {
    case RECEIVE_GAMES_SUCCESS:
    case RECEIVE_MORE_GAMES_SUCCESS:
      return action.pagination
    case RECEIVE_GAMES_FAILURE:
      return initialState.pagination
    default:
      return state
  }
}

export default combineReducers({
  list,
  status,
  pagination,
})

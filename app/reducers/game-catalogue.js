import {
  combineReducers,
} from 'redux'
import _ from 'lodash'

import {
  RECEIVE_GAME_COMPLETION_SUCCESS,
  RECEIVE_GAME_SUCCESS,
  RECEIVE_GAMES_FAILURE,
  RECEIVE_GAMES_SUCCESS,
  RECEIVE_MORE_GAMES_SUCCESS,
  REQUEST_GAMES,
  REQUEST_MORE_GAMES,
} from '@actions/game-catalogue'
import {
  MARK_GAME_OWNERSHIP,
} from '@actions/owned-game-catalogue'
import {
  SELECT_FRANCHISE,
  RECEIVE_FRANCHISE_COMPLETION_FAILURE,
} from '@actions/search-engine'

import itemReducer from '@reducers/item'

const initialState = {
  list: [],
  status: {
    pending: false,
    error: null,
  },
  pagination: {
    max: 10,
    amount: 0,
    total: 0,
    offset: 0,
  },
  item: {
    game: {},
    status: {},
  },
}

function list(
  state = initialState.list,
  action
) {
  const nextState = _.merge(
    [],
    state
  )
  let itemPosition

  switch (action.type) {
    case RECEIVE_GAME_SUCCESS:
      return _.concat(
        state,
        itemReducer(
          initialState.item,
          action
        )
      )
    case RECEIVE_GAME_COMPLETION_SUCCESS:
      itemPosition = _.findIndex(state, item => item.game.id === action.completedGame.id)
      if (itemPosition >= 0) {
        nextState[itemPosition] = itemReducer(
          state[itemPosition],
          action
        )
      }

      return nextState
    case MARK_GAME_OWNERSHIP:
      itemPosition = _.findIndex(state, item => item.game.id === action.game.id)
      if (itemPosition >= 0) {
        nextState[itemPosition] = itemReducer(
          state[itemPosition],
          action
        )
      }

      return nextState
    case REQUEST_GAMES:
    case SELECT_FRANCHISE:
      return []
    case RECEIVE_FRANCHISE_COMPLETION_FAILURE:
    case RECEIVE_GAMES_FAILURE:
    default:
      return state
  }
}

function status(
  state = initialState.status,
  action
) {
  switch (action.type) {
    case REQUEST_GAMES:
    case REQUEST_MORE_GAMES:
    case SELECT_FRANCHISE:
      return {
        pending: true,
        error: null,
      }
    case RECEIVE_GAMES_SUCCESS:
    case RECEIVE_MORE_GAMES_SUCCESS:
      return initialState.status
    case RECEIVE_GAMES_FAILURE:
      return {
        pending: false,
        error: action.error,
      }
    default:
      return state
  }
}

function pagination(
  state = initialState.pagination,
  action
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

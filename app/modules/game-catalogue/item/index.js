import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

import gameReducer, {
  RECEIVE_GAME_COMPLETION_SUCCESS,
  REQUEST_GAME_PARTIAL_COMPLETION,
  REQUEST_GAME_FULL_COMPLETION,
  RECEIVE_GAME_COMPLETION_FAILURE,

  epic as gameEpic,
} from '#modules/game-catalogue/item/game'


// state key
export const STATE_KEY = 'item'


// State
const initialState = {
  status: {
    pending: false,
    error: null
  },
}


// Actions


// Reducers
function statusReducer(state = initialState.status, action) {
  switch (action.type) {
    case REQUEST_GAME_PARTIAL_COMPLETION:
    case REQUEST_GAME_FULL_COMPLETION:
      return {
        pending: true,
        error: null
      }
    case RECEIVE_GAME_COMPLETION_SUCCESS:
      return initialState.status
    case RECEIVE_GAME_COMPLETION_FAILURE:
      return {
        pending: false,
        error: action.error
      }
    default:
      return state
  }
}

export default combineReducers({
  game: gameReducer,
  status: statusReducer,
})


// Action Creators


// Epics
export const epic = combineEpics(
  gameEpic
)

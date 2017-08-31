import {
  combineReducers,
} from 'redux'
import _ from 'lodash'
import {
  REQUEST_GAME_PARTIAL_COMPLETION,
  REQUEST_GAME_FULL_COMPLETION,
  RECEIVE_GAME_COMPLETION_SUCCESS,
  RECEIVE_GAME_COMPLETION_FAILURE,
} from '@actions/game-catalogue'
import {
  MARK_GAME_OWNERSHIP,
} from '@actions/owned-game-catalogue'

import game from '@reducers/game'

const initialState = {
  status: {
    pending: false,
    error: null
  },
}
function status(
  state = initialState.status,
  action,
) {
  switch (action.type) {
    case REQUEST_GAME_PARTIAL_COMPLETION:
    case REQUEST_GAME_FULL_COMPLETION:
      return {
        pending: true,
        error: null
      }
    case RECEIVE_GAME_COMPLETION_SUCCESS:
      return initialState.status;
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
  game,
  status,
})
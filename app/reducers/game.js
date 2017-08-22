import {
  combineReducers,
} from 'redux'
import _ from 'lodash'
import {
  REQUEST_GAME_COMPLETION,
  RECEIVE_GAME_COMPLETION_SUCCESS,
  RECEIVE_GAME_COMPLETION_FAILURE,
} from '@actions/games'

const initialState = {
  game: {},
  status: {
    pending: false,
    error: null
  },
}

function game(
  state = initialState.game,
  action,
) {
  switch (action.type) {
    case RECEIVE_GAME_COMPLETION_SUCCESS:
      let nextState = state

      if (action.completedGame.id === state.id) {
        nextState = _.merge(
          {},
          state,
          action.completedGame,
          {
            isComplete: true,
          }
        )
      }

      return nextState
    default:
      return state
  }
}


function status(
  state = initialState.status,
  action,
) {
  switch (action.type) {
    case REQUEST_GAME_COMPLETION:
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
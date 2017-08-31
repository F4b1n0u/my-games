import {
  combineReducers,
} from 'redux'

import {
  SHOW_GAME_DETAILS,
  HIDE_GAME_DETAILS,
} from '@actions/game-explorer'

const initialState = {
  detailedGameId: null,
}

function detailedGameId(
  state = initialState.detailedGameId,
  action
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
  detailedGameId,
})

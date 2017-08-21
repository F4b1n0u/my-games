import {
  combineReducers,
} from 'redux'
import {
  REQUEST_GAMES,
  RECEIVE_GAMES_SUCCESS,
  RECEIVE_GAMES_FAILURE,
} from '../actions/games'

const initialState = {
  list: [],
  listStatus: {
    pending: false,
    error: null
  },
}

function list(
  state = initialState.list,
  action,
) {
  const {
    type
  } = action
  
  switch (action.type) {    
    case RECEIVE_GAMES_SUCCESS:
      console.log(action.games)
      return action.games;
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

export default combineReducers({
  list,
  listStatus,
})

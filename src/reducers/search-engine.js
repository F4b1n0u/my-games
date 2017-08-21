import {
  combineReducers,
} from 'redux'
import {
  START_SEARCHING,
  UPDATE_SEARCHTEXT,
  REQUEST_FRANCHISES,
  RECEIVE_FRANCHISES_SUCCESS,
  RECEIVE_FRANCHISES_FAILURE,
  SELECT_FRANCHISE,
  STOP_SEARCHING,
} from '../actions/search-engine'

const initialState = {
  searchText: '',
  franchises: [],
  franchisesStatus: {
    pending: false,
    error: null
  },
}

function searchText(
  state = initialState.searchText,
  action,
) {
  const {
    type
  } = action
  
  switch (type) {
    case UPDATE_SEARCHTEXT:
      return action.searchText
    case SELECT_FRANCHISE:
      return action.selectedFranchise.name
    default:
      return state
  }
}

function franchises(
  state = initialState.franchises,
  action,
) {
  switch (action.type) {    
    case RECEIVE_FRANCHISES_SUCCESS:
      return action.franchises;
    case RECEIVE_FRANCHISES_FAILURE:
    case STOP_SEARCHING:
      return []
    default:
      return state
  }
}

function franchisesStatus(
  state = initialState.franchisesStatus,
  action,
) {
  switch (action.type) {
    case REQUEST_FRANCHISES:
      return {
        pending: true,
        error: null
      }
    case RECEIVE_FRANCHISES_SUCCESS:
      return initialState.franchisesStatus;
    case RECEIVE_FRANCHISES_FAILURE:
      return {
        pending: false,
        error: action.error
      }
    default:
      return state
  }
}

export default combineReducers({
  searchText,
  franchises,
  franchisesStatus,
})

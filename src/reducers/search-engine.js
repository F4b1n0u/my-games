import {
  combineReducers,
} from 'redux'
import {
  UPDATE_SEARCHTEXT,
  REQUEST_SUGGESTIONS,
  RECEIVE_SUGGESTIONS_SUCCESS,
  RECEIVE_SUGGESTIONS_FAILURE,
} from '../actions'

const initialState = {
  searchText: 'zelda',
  suggestions: [],
  suggestionsStatus: {
    pending: false,
    error: null
  },
}

function searchText(
  state = initialState.searchText,
  action,
) {
  const {
    type,
    searchText,
  } = action
  
  switch (type) {
    case UPDATE_SEARCHTEXT:
    return searchText;
    default:
    return state
  }
}

function suggestions(
  state = initialState.suggestions,
  action,
) {
  switch (action.type) {
    case REQUEST_SUGGESTIONS:
    case RECEIVE_SUGGESTIONS_FAILURE:
      return []
    case RECEIVE_SUGGESTIONS_SUCCESS:
      return action.suggestions;
    default:
      return state
  }
}

function suggestionsStatus(
  state = initialState.suggestionsStatus,
  action,
) {
  switch (action.type) {
    case REQUEST_SUGGESTIONS:
      return {
        pending: true,
        error: null
      }
    case RECEIVE_SUGGESTIONS_SUCCESS:
      return initialState.suggestionsStatus;
    case RECEIVE_SUGGESTIONS_FAILURE:
      return {
        pending: false,
        error: action.error
      }
    default:
      return state
  }
}

export default combineReducers({
  suggestionsStatus,
  searchText,
})

import {
  combineReducers,
} from 'redux'
import {
  START_SEARCHING,
  UPDATE_SEARCHTEXT,
  REQUEST_SUGGESTIONS,
  RECEIVE_SUGGESTIONS_SUCCESS,
  RECEIVE_SUGGESTIONS_FAILURE,
  SELECT_SUGGESTION,
  STOP_SEARCHING,
} from '../actions'

const initialState = {
  searchText: '',
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
    type
  } = action
  
  switch (type) {
    case UPDATE_SEARCHTEXT:
      return action.searchText
    case SELECT_SUGGESTION:
      return action.selectedSuggestion.name
    default:
      return state
  }
}

function suggestions(
  state = initialState.suggestions,
  action,
) {
  switch (action.type) {    
    case RECEIVE_SUGGESTIONS_FAILURE:
    case STOP_SEARCHING:
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
  console.log(action.type)
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
  searchText,
  suggestions,
  suggestionsStatus,
})

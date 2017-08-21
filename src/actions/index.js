export const START_SEARCHING              = 'my-games/search-engine/START_SEARCHING'
export const UPDATE_SEARCHTEXT            = 'my-games/search-engine/UPDATE_SEARCHTEXT'
export const REQUEST_SUGGESTIONS          = 'my-games/search-engine/REQUEST_SUGGESTIONS'
export const RECEIVE_SUGGESTIONS_SUCCESS  = 'my-games/search-engine/RECEIVE_SUGGESTIONS_SUCCESS'
export const RECEIVE_SUGGESTIONS_FAILURE  = 'my-games/search-engine/RECEIVE_SUGGESTIONS_FAILURE'
export const SELECT_SUGGESTION            = 'my-games/search-engine/SELECT_SUGGESTION'
export const STOP_SEARCHING               = 'my-games/search-engine/STOP_SEARCHING'

export function startSearching() {
  return {
    type: START_SEARCHING,
  }
}

export function updateSearchText(searchText) {
  return {
    type: UPDATE_SEARCHTEXT,
    searchText,
  }
}

export function requestSuggestions() {
  return {
    type: REQUEST_SUGGESTIONS,
  }
}

export function receiveSuggestions(suggestions) {
  return {
    type: RECEIVE_SUGGESTIONS_SUCCESS,
    suggestions,
  }
}

export function receiveSuggestionsFailure(error) {
  return {
    type: RECEIVE_SUGGESTIONS_FAILURE,
    error,
  }
}

export function selectSuggestion(selectedSuggestion) {
  return {
    type: SELECT_SUGGESTION,
    selectedSuggestion,
  }
}

export function stopSearching() {
  return {
    type: STOP_SEARCHING,
  }
}
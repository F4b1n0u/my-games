import { createSelector } from 'reselect'

export function getSearchText(state) {
  return state.searchText || '';
}

export function getSuggestions(state) {
  return state.suggestions;
}

export function isSuggestionsRequestFailed(state) {
  return state.cart.suggestionsStatus.error
}

export function isSuggestionsPending(state) {
  return state.cart.suggestionsStatus.pending
}

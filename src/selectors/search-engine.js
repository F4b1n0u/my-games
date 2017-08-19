import { createSelector } from 'reselect'

export function getSearchText(state) {
  return state.searchText || '';
}

export function getGameSuggestions(state) {
  return state.suggestions.filter(suggestion => suggestion.resource_type === 'game')
}

export function getFranchiseSuggestions(state) {
  return state.suggestions.filter(suggestion => suggestion.resource_type === 'franchise')
}

export function getSuggestionsStatus(state) {
  return state.suggestionsStatus
}

import React from 'react';
import { connect } from 'react-redux'

import {
  startSearching,
  updateSearchText,
  selectSuggestion,
  stopSearching,
} from '../actions'
import { 
  getSearchText,
  getGameSuggestions,
  getFranchiseSuggestions,
  getSuggestionsStatus,
} from '../selectors/search-engine'

import SearchEngine from '../components/search-engine'

const mapStateToProps = state => {
  return ({
    searchText: getSearchText(state.searchEngine),
    franchiseSuggestions: getFranchiseSuggestions(state.searchEngine),
    gameSuggestions: getGameSuggestions(state.searchEngine),
    status: getSuggestionsStatus(state.searchEngine)
  })
}

const mapDispatchToProps = dispatch => ({
  startSearching: () => {
    dispatch(startSearching())
  },
  updateSearchText: searchText => {
    dispatch(updateSearchText(searchText))
  },
  selectSuggestion: suggestion => {
    dispatch(selectSuggestion(suggestion))
  },
  stopSearching: () => {
    dispatch(stopSearching())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchEngine)

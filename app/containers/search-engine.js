import React from 'react';
import { connect } from 'react-redux'

import {
  startSearching,
  updateSearchText,
  selectFranchise,
  submitSearch,
  stopSearching,
} from '@actions/search-engine'
import { 
  getSearchText,
  getFranchises,
  getFranchisesStatus,
} from '@selectors/search-engine'
import { 
  isPending as isCataloguePending,
} from '@selectors/game-catalogue'
import { 
  hasDetailedGame,
} from '@selectors/app'

import SearchEngine from '@components/search-engine'

const mapStateToProps = state => {
  const {
    app,
    searchEngine,
    gameCatalogue,
  } = state

  return ({
    searchText: getSearchText(state.searchEngine),
    franchises: getFranchises(state.searchEngine),
    status: getFranchisesStatus(state.searchEngine),
    hasLoadingGames: isCataloguePending(state.gameCatalogue),
    hasDetailedGame: hasDetailedGame(state.app),
  })
}

const mapDispatchToProps = dispatch => ({
  startSearching: () => {
    dispatch(startSearching())
  },
  updateSearchText: searchText => {
    dispatch(updateSearchText(searchText))
  },
  selectFranchise: franchise => {
    dispatch(selectFranchise(franchise))
  },
  submitSearch: () => {
    dispatch(submitSearch())
  },
  stopSearching: () => {
    dispatch(stopSearching())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchEngine)

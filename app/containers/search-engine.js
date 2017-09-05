import { connect } from 'react-redux'

import {
  startSearching,
  updateSearchText,
  selectFranchise,
  submitSearch,
  stopSearching,
  clearSearch,
} from '@actions/search-engine'
import {
  getSearchText,
  getFranchises,
  isFranchisesPending,
} from '@selectors/search-engine'
import {
  isPending as isCataloguePending,
} from '@selectors/game-catalogue'
import {
  hasDetailedGame,
} from '@selectors/game-explorer'

import SearchEngine from '@components/search-engine'

const mapStateToProps = (state) => {
  const {
    gameCatalogue,
    gameExplorer,
    searchEngine,
  } = state

  return ({
    franchises: getFranchises(searchEngine),
    hasDetailedGame: hasDetailedGame(gameExplorer),
    hasLoadingGames: isCataloguePending(gameCatalogue),
    searchText: getSearchText(searchEngine),
    isFranchisesPending: isFranchisesPending(searchEngine),
  })
}

const mapDispatchToProps = dispatch => ({
  selectFranchise: franchise => dispatch(selectFranchise(franchise)),
  startSearching: () => dispatch(startSearching()),
  stopSearching: () => dispatch(stopSearching()),
  submitSearch: () => dispatch(submitSearch()),
  updateSearchText: searchText => dispatch(updateSearchText(searchText)),
  clearSearch: () => dispatch(clearSearch()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchEngine)

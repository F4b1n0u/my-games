import { connect } from 'react-redux'

import {
  startSearching,
  updateSearchText,
  selectFranchise,
  submitSearch,
  stopSearching,
  clearSearch,
} from '#modules/search-engine'
import {
  getSearchText,
  getFranchises,
  isFranchisesPending,
  isSearching,
} from '#selectors/search-engine'
import {
  isPending as isCataloguePending,
} from '#selectors/game-catalogue'
import {
  hasDetailedGame,
} from '#selectors/game-explorer'

import SearchEngine from '#components/search-engine'

const mapStateToProps = state => ({
  franchises: getFranchises(state),
  hasDetailedGame: hasDetailedGame(state),
  hasLoadingGames: isCataloguePending(state),
  searchText: getSearchText(state),
  isFranchisesPending: isFranchisesPending(state),
  isSearching: isSearching(state)
})

const mapDispatchToProps = dispatch => ({
  selectFranchise: franchise => dispatch(selectFranchise(franchise)),
  startSearching: () => dispatch(startSearching()),
  stopSearching: () => dispatch(stopSearching()),
  submitSearch: () => dispatch(submitSearch()),
  updateSearchText: searchText => dispatch(updateSearchText(searchText)),
  clearSearch: () => dispatch(clearSearch()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchEngine)

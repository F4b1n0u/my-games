export const START_SEARCHING = 'my-games/search-engine/START_SEARCHING'
export const UPDATE_SEARCHTEXT = 'my-games/search-engine/UPDATE_SEARCHTEXT'
export const REQUEST_FRANCHISES = 'my-games/search-engine/REQUEST_FRANCHISES'
export const RECEIVE_FRANCHISES_SUCCESS = 'my-games/search-engine/RECEIVE_FRANCHISES_SUCCESS'
export const RECEIVE_FRANCHISES_FAILURE = 'my-games/search-engine/RECEIVE_FRANCHISES_FAILURE'
export const SELECT_FRANCHISE = 'my-games/search-engine/SELECT_FRANCHISE'
export const SUBMIT_SEARCH = 'my-games/search-engine/SUBMIT_SEARCH'
export const REQUEST_FRANCHISE_COMPLETION = 'my-games/search-engine/REQUEST_FRANCHISE_COMPLETION'
export const RECEIVE_FRANCHISE_COMPLETION_SUCCESS = 'my-games/search-engine/RECEIVE_FRANCHISE_COMPLETION_SUCCESS'
export const RECEIVE_FRANCHISE_COMPLETION_FAILURE = 'my-games/search-engine/RECEIVE_FRANCHISE_COMPLETION_FAILURE'
export const STOP_SEARCHING = 'my-games/search-engine/STOP_SEARCHING'

export const startSearching = () => ({
  type: START_SEARCHING,
})

export const updateSearchText = searchText => ({
  type: UPDATE_SEARCHTEXT,
  searchText,
})

export const requestFranchises = () => ({
  type: REQUEST_FRANCHISES,
})

export const receiveFranchises = franchises => ({
  type: RECEIVE_FRANCHISES_SUCCESS,
  franchises,
})

export const receiveFranchisesFailure = error => ({
  type: RECEIVE_FRANCHISES_FAILURE,
  error,
})

export const selectFranchise = selectedFranchise => ({
  type: SELECT_FRANCHISE,
  selectedFranchise,
})

export const requestFranchiseCompletion = selectedFranchise => ({
  type: REQUEST_FRANCHISE_COMPLETION,
  selectedFranchise,
})

export const receiveFranchiseCompletion = completedFranchise => ({
  type: RECEIVE_FRANCHISE_COMPLETION_SUCCESS,
  completedFranchise,
})

export const receiveFranchiseCompletionFailure = error => ({
  type: RECEIVE_FRANCHISE_COMPLETION_FAILURE,
  error,
})

export const submitSearch = () => ({
  type: SUBMIT_SEARCH,
})

export const stopSearching = () => ({
  type: STOP_SEARCHING,
})

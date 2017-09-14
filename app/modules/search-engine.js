import 'rxjs'
import { Observable } from 'rxjs/Observable'
import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

import {
  fetchFranchises,
  fetchFranchiseCompletion,
  extractPagination,
} from '#services/giant-bomb'

import {
  requestGames,
  receiveGames,
  removeAllGames,
} from '#modules/game-catalogue'

import { getOwnedGames } from '#selectors/owned-game-catalogue'
import { getSearchText } from '#selectors/search-engine'
import { isPending as isCataloguePending } from '#selectors/game-catalogue'

// state key
export const STATE_KEY = 'searchEngine'


// State
const initialState = {
  searchText: '',
  isCurrentSearchSubmitted: false,
  franchises: [],
  franchisesStatus: {
    pending: false,
    error: null,
  },
}

// Actions
export const START_SEARCHING = `my-games/${STATE_KEY}/START_SEARCHING`
export const UPDATE_SEARCHTEXT = `my-games/${STATE_KEY}/UPDATE_SEARCHTEXT`
export const REQUEST_FRANCHISES = `my-games/${STATE_KEY}/REQUEST_FRANCHISES`
export const RECEIVE_FRANCHISES_SUCCESS = `my-games/${STATE_KEY}/RECEIVE_FRANCHISES_SUCCESS`
export const RECEIVE_FRANCHISES_FAILURE = `my-games/${STATE_KEY}/RECEIVE_FRANCHISES_FAILURE`
export const SELECT_FRANCHISE = `my-games/${STATE_KEY}/SELECT_FRANCHISE`
export const SUBMIT_SEARCH = `my-games/${STATE_KEY}/SUBMIT_SEARCH`
export const REQUEST_FRANCHISE_COMPLETION = `my-games/${STATE_KEY}/REQUEST_FRANCHISE_COMPLETION`
export const RECEIVE_FRANCHISE_COMPLETION_SUCCESS = `my-games/${STATE_KEY}/RECEIVE_FRANCHISE_COMPLETION_SUCCESS`
export const RECEIVE_FRANCHISE_COMPLETION_FAILURE = `my-games/${STATE_KEY}/RECEIVE_FRANCHISE_COMPLETION_FAILURE`
export const STOP_SEARCHING = `my-games/${STATE_KEY}/STOP_SEARCHING`
export const CLEAR_SEARCH = `my-games/${STATE_KEY}/CLEAR_SEARCH`
export const REMOVE_ALL_FRANCHISE = `my-games/${STATE_KEY}/REMOVE_ALL_FRANCHISE`

// Reducers
function searchTextReducer(
  state = initialState.searchText,
  action
) {
  const {
    type,
  } = action

  switch (type) {
    case UPDATE_SEARCHTEXT:
      return action.searchText
    case SELECT_FRANCHISE:
      return action.selectedFranchise.name
    case CLEAR_SEARCH:
      return initialState.searchText
    default:
      return state
  }
}

function franchisesReducer(
  state = initialState.franchises,
  action
) {
  switch (action.type) {
    case RECEIVE_FRANCHISES_SUCCESS:
      return action.franchises
    case RECEIVE_FRANCHISES_FAILURE:
    case REMOVE_ALL_FRANCHISE: // maybe a hide could be better to avoid to request the api again :s
      return []
    default:
      return state
  }
}

function franchisesStatusReducer(
  state = initialState.franchisesStatus,
  action
) {
  switch (action.type) {
    case REQUEST_FRANCHISES:
      return {
        pending: true,
        error: null,
      }
    case RECEIVE_FRANCHISES_SUCCESS:
    case REMOVE_ALL_FRANCHISE:
      return initialState.franchisesStatus
    case RECEIVE_FRANCHISES_FAILURE:
      return {
        pending: false,
        error: action.error,
      }
    default:
      return state
  }
}

function isCurrentSearchSubmittedReducer(
  state = initialState.isCurrentSearchSubmitted,
  action
) {
  switch (action.type) {
    case SUBMIT_SEARCH:
      return true
    case UPDATE_SEARCHTEXT:
    case CLEAR_SEARCH:
      return false
    default:
      return state
  }
}

export default combineReducers({
  searchText: searchTextReducer,
  isCurrentSearchSubmitted: isCurrentSearchSubmittedReducer,
  franchises: franchisesReducer,
  franchisesStatus: franchisesStatusReducer,
})

// Action Creators
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

export const clearSearch = () => ({
  type: CLEAR_SEARCH,
})

export const removeAllFranchise = () => ({
  type: REMOVE_ALL_FRANCHISE,
})


// Epics
const updateSearchTextEpic = action$ => action$
  .ofType(UPDATE_SEARCHTEXT)
  .debounceTime(250)
  .mapTo(requestFranchises())

// TODO
// Req G
// Res G <-|
// Req F   |-- inferior to 250, due to the debounce, not even sure this case is possible
// Res F <-|

// check if a request game is pending
// Req G
// Req F <- game is pending
// Res G
// Res F
const requestFranchisesEpic = (action$, store) => action$
  .ofType(REQUEST_FRANCHISES)
  .switchMap(() => {
    const state = store.getState()
    const searchText = getSearchText(state)
    const isPending = isCataloguePending(state)

    let observable = Observable.empty()

    if (!isPending && searchText) {
      observable = fetchFranchises(searchText)
        .map(response => receiveFranchises(response.results))
        // check if a request game is pending
        // Req F
        // Req G <- similar to STOP_SEARCHING here due to requestGamesToStopEpic
        // Res G
        // Res F
        .takeUntil(action$.ofType(STOP_SEARCHING))
        .catch(error => Observable.of(receiveFranchisesFailure(error)))
    } else {
      observable = Observable.of(receiveFranchises([]))
    }

    return observable
  })

const selectFranchiseToStopEpic = action$ => action$
  .ofType(SELECT_FRANCHISE)
  .flatMap(() => [
    stopSearching(),
    removeAllGames(),
  ])

const selectFranchiseTofetchEpic = action$ => action$
  .ofType(SELECT_FRANCHISE)
  .flatMap(action => Observable.of(requestFranchiseCompletion(action.selectedFranchise)))

const requestFranchiseCompletionEpic = action$ => action$
  .ofType(REQUEST_FRANCHISE_COMPLETION)
  .mergeMap(action => fetchFranchiseCompletion(action.selectedFranchise)
    .map(response => receiveGames(
      response.results.games,
      extractPagination(response)
    ))
    .takeUntil(action$.ofType(SUBMIT_SEARCH))
    .catch(error => Observable.of(receiveFranchiseCompletionFailure(error)))
  )

// TODO check when we stop to search, if the search is empty then we display owned games
const clearSearchEpic = (action$, store) => action$
  .ofType(CLEAR_SEARCH)
  .flatMap(() => {
    const ownedGames = getOwnedGames(store.getState())

    return [
      removeAllGames(),
      stopSearching(),
      requestGames(ownedGames),
    ]
  })

const submitSearchEpic = (action$, store) => action$
  .ofType(SUBMIT_SEARCH)
  .flatMap(() => {
    const actions = [
      removeAllGames(),
      stopSearching(),
    ]

    const searchText = getSearchText(store.getState()).trim()

    if (searchText) {
      actions.push(requestGames())
    }

    return actions
  })

const stopSearchingEpic = action$ => action$
  .ofType(STOP_SEARCHING)
  .mapTo(removeAllFranchise())

export const epic = combineEpics(
  updateSearchTextEpic,
  requestFranchisesEpic,
  selectFranchiseToStopEpic,
  selectFranchiseTofetchEpic,
  requestFranchiseCompletionEpic,
  clearSearchEpic,
  submitSearchEpic,
  stopSearchingEpic
)

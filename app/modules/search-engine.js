import 'rxjs'
import _ from 'lodash'
import { Observable } from 'rxjs/Observable'
import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

import { fetchFranchises, fetchFranchiseCompletion } from '#services/giant-bomb'
import { fetchGameName } from '#services/amazon'

import { markIsDisplayingAnyGames } from '#modules/game-explorer'

import { requestGames, removeAllGames } from '#modules/game-catalogue'

import {
  SEARCHTEXT_SOURCE,
  GAMES_SOURCE,

  updateSearchText as updateSearchTextSource,
  updateGames,
  updateActiveSourceType,
} from '#modules/game-source'

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
  isSearching: false,
  isScanningBarcode: false,
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
export const START_SCAN_BARCODE = `my-games/${STATE_KEY}/START_SCAN_BARCODE`
export const STOP_SCAN_BARCODE = `my-games/${STATE_KEY}/STOP_SCAN_BARCODE`
export const RECEIVE_SCAN_RESULT_SUCCESS = `my-games/${STATE_KEY}/RECEIVE_SCAN_RESULT_SUCCESS`
export const RECEIVE_SCAN_RESULT_FAILURE = `my-games/${STATE_KEY}/RECEIVE_SCAN_RESULT_FAILURE`

// Reducers
function searchTextReducer(state = initialState.searchText, action) {
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

function franchisesReducer(state = initialState.franchises, action) {
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

function franchisesStatusReducer(state = initialState.franchisesStatus, action) {
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

function isCurrentSearchSubmittedReducer(state = initialState.isCurrentSearchSubmitted, action) {
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

function isSearchingReducer(state = initialState.isSearching, action) {
  switch (action.type) {
    case START_SEARCHING:
      return true
    case STOP_SEARCHING:
      return false
    default:
      return state
  }
}

function isScanningBarcodeReducer(state = initialState.isScanningBarcode, action) {
  switch (action.type) {
    case START_SCAN_BARCODE:
      return true
    case STOP_SCAN_BARCODE:
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
  isSearching: isSearchingReducer,
  isScanningBarcode: isScanningBarcodeReducer,
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


export const startScanBarcode = () => ({
  type: START_SCAN_BARCODE,
})

export const stopScanBarcode = () => ({
  type: STOP_SCAN_BARCODE
})

export const receiveScanResult = barcode => ({
  type: RECEIVE_SCAN_RESULT_SUCCESS,
  barcode,
})

export const receiveScanResultFailure = barcode => ({
  type: RECEIVE_SCAN_RESULT_FAILURE,
  barcode,
})

// Epics
const updateSearchTextEpic = action$ => action$
  .ofType(UPDATE_SEARCHTEXT)
  .debounceTime(500)
  .mapTo(requestFranchises())

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
    const searchText = getSearchText(state).trim()
    const isPending = isCataloguePending(state)

    let observable = Observable.empty()

    if (!isPending && searchText) {
      observable = fetchFranchises(searchText)
        .mergeMap(response => Observable.of(receiveFranchises(response.results)))
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

const selectFranchiseEpic = action$ => action$
  .ofType(SELECT_FRANCHISE)
  .mergeMap(action => [
    stopSearching(),
    removeAllGames(),
    markIsDisplayingAnyGames(),
    // TODO not very clear, maybe something like requestGameFromFranchise could make more sense
    requestFranchiseCompletion(action.selectedFranchise)
  ])

const requestFranchiseCompletionEpic = action$ => action$
  .ofType(REQUEST_FRANCHISE_COMPLETION)
  .mergeMap(action => fetchFranchiseCompletion(action.selectedFranchise)
    .mergeMap(response => [
      updateGames(response.results.games),
      updateActiveSourceType(GAMES_SOURCE),
      requestGames(),
    ])
    .takeUntil(action$.ofType(SUBMIT_SEARCH))
    .catch(error => Observable.of(receiveFranchiseCompletionFailure(error)))
  )

const submitSearchEpic = (action$, store) => action$
  .ofType(SUBMIT_SEARCH)
  .mergeMap(() => {
    let actions = []

    const searchText = getSearchText(store.getState()).trim()

    if (searchText) {
      actions = _.concat(
        actions, [
          stopSearching(),
          markIsDisplayingAnyGames(),
          updateSearchTextSource(searchText),
          updateActiveSourceType(SEARCHTEXT_SOURCE),
          removeAllGames(),
          requestGames()
        ]
      )
    } else {
      actions.push(clearSearch())
    }

    return actions
  })

const clearSearchEpic = action$ => action$
  .ofType(CLEAR_SEARCH)
  .mapTo(updateSearchText(''))

const startSearchingEpic = action$ => action$
  .ofType(START_SEARCHING)
  .mapTo(requestFranchises())

const stopSearchingEpic = action$ => action$
  .ofType(STOP_SEARCHING)
  .mapTo(removeAllFranchise())

const receiveScanResultEpic = action$ => action$
  .ofType(RECEIVE_SCAN_RESULT_SUCCESS)
  .switchMap(action => fetchGameName(action.barcode)
    .mergeMap(gameName => {
      if (gameName) {
        return [
          updateSearchText(gameName),
          submitSearch()
        ]
      }
      return Observable.empty()
    })
    .catch(error => Observable.of(receiveScanResultFailure(error)))
  )


export const epic = combineEpics(
  updateSearchTextEpic,
  requestFranchisesEpic,
  selectFranchiseEpic,
  requestFranchiseCompletionEpic,
  submitSearchEpic,
  clearSearchEpic,
  startSearchingEpic,
  stopSearchingEpic,
  receiveScanResultEpic
)

import 'rxjs'
import { Alert } from 'react-native'
import { Observable } from 'rxjs/Observable'
import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

import {
  RECEIVE_FRANCHISES_FAILURE,
  RECEIVE_FRANCHISE_COMPLETION_FAILURE,
  RECEIVE_SCAN_RESULT_FAILURE,
} from '#modules/search-engine'

import {
  RECEIVE_GAMES_FAILURE,
  RECEIVE_GAME_COMPLETION_FAILURE,
  RECEIVE_MORE_GAMES_FAILURE,
} from '#modules/game-catalogue'

import { markDisplayingOnlyOwnedGames } from '#modules/game-explorer'

// state key
export const STATE_KEY = 'app'


// State
const initialState = {
  isFontLoaded: false,
  isLoaded: false,
  status: {
    isLoading: false,
  },
  isAboutVisible: false,
}


// Actions
export const START_LOAD = `my-games/${STATE_KEY}/START_LOAD`
export const END_LOAD_SUCCESS = `my-games/${STATE_KEY}/END_LOAD_SUCCESS`
export const END_LOAD_FAILURE = `my-games/${STATE_KEY}/END_LOAD_FAILURE`
export const TOGGLE_ABOUT_DISPLAY = `my-games/${STATE_KEY}/TOGGLE_ABOUT_DISPLAY`
export const DISPLAY_GENERIC_ERROR = `my-games/${STATE_KEY}/DISPLAY_GENERIC_ERROR`


// Reducers
function isLoadedReducer(
  state = initialState.isLoaded,
  action
) {
  switch (action.type) {
    case END_LOAD_SUCCESS:
      return true
    case END_LOAD_FAILURE:
      return false
    default:
      return state
  }
}

function statusReducer(
  state = initialState.status,
  action
) {
  switch (action.type) {
    case START_LOAD:
      return {
        pending: true,
        error: null,
      }
    case END_LOAD_SUCCESS:
      return initialState.status
    case END_LOAD_FAILURE:
      return {
        pending: false,
        error: action.error,
      }
    default:
      return state
  }
}

function isAboutVisibleReducer(
  state = initialState.isAboutVisible,
  action
) {
  switch (action.type) {
    case TOGGLE_ABOUT_DISPLAY:
      return !state
    default:
      return state
  }
}

export default combineReducers({
  isLoaded: isLoadedReducer,
  status: statusReducer,
  isAboutVisible: isAboutVisibleReducer,
})


// Action Creators
export const startLoad = () => ({
  type: START_LOAD,
})
export const endLoad = () => ({
  type: END_LOAD_SUCCESS,
})
export const endLoadFailure = () => ({
  type: END_LOAD_FAILURE,
})
export const toggleAboutDisplay = () => ({
  type: TOGGLE_ABOUT_DISPLAY,
})
export const displayGenericError = error => ({
  type: DISPLAY_GENERIC_ERROR,
  error,
})


// Epics
const receiveFranchiseFailureEpic = action$ => action$
  .ofType(RECEIVE_FRANCHISES_FAILURE)
  .mergeMap(() => Observable.of(displayGenericError()))

const receiveFranchiseCompletionFailureEpic = action$ => action$
  .ofType(RECEIVE_FRANCHISE_COMPLETION_FAILURE)
  .mergeMap(() => Observable.of(displayGenericError()))

const receiveGamesFailureEpic = action$ => action$
  .ofType(RECEIVE_GAMES_FAILURE)
  .mergeMap(() => Observable.of(displayGenericError()))

const receiveGamesCompletionFailureEpic = action$ => action$
  .ofType(RECEIVE_GAME_COMPLETION_FAILURE)
  .mergeMap(() => Observable.of(displayGenericError()))

const requestMoreGamesFailureEpic = action$ => action$
  .ofType(RECEIVE_MORE_GAMES_FAILURE)
  .mergeMap(() => Observable.of(displayGenericError()))

const requestScanResultFailureEpic = action$ => action$
  .ofType(RECEIVE_SCAN_RESULT_FAILURE)
  .mergeMap(() => Observable.of(displayGenericError()))

const displayGenericErrorEpic = action$ => action$
  .ofType(DISPLAY_GENERIC_ERROR)
  .mergeMap(() => {
    Alert.alert(
      'Oops !!',
      'it looks like something \nwent wrong :/\nmaybe try later?',
      {
        cancelable: true,
      }
    )

    return Observable.empty()
  })

const appEndLoadEpic = action$ => action$
  .ofType(END_LOAD_SUCCESS)
  .mapTo(markDisplayingOnlyOwnedGames())

export const epic = combineEpics(
  receiveFranchiseFailureEpic,
  receiveFranchiseCompletionFailureEpic,
  receiveGamesFailureEpic,
  receiveGamesCompletionFailureEpic,
  requestMoreGamesFailureEpic,
  requestScanResultFailureEpic,
  displayGenericErrorEpic,
  appEndLoadEpic
)

import 'rxjs'
import { Alert } from 'react-native'
import { Observable } from 'rxjs/Observable'
import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

import {
  RECEIVE_FRANCHISES_FAILURE,
  RECEIVE_FRANCHISE_COMPLETION_FAILURE,
} from '#modules/search-engine'

import {
  RECEIVE_GAMES_FAILURE,
  RECEIVE_GAME_COMPLETION_FAILURE,
  RECEIVE_MORE_GAMES_FAILURE,
} from '#modules/game-catalogue'

import { getOwnedGames } from '#selectors/owned-game-catalogue'
import { requestGames } from '#modules/game-catalogue'

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
export const START_LOAD = 'my-games/app/START_LOAD'
export const END_LOAD_SUCCESS = 'my-games/app/END_LOAD_SUCCESS'
export const END_LOAD_FAILURE = 'my-games/app/END_LOAD_FAILURE'
export const TOGGLE_ABOUT_DISPLAY = 'my-games/app/TOGGLE_ABOUT_DISPLAY'
export const DISPLAY_GENERIC_ERROR = 'my-games/app/DISPLAY_GENERIC_ERROR'

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
const receiveFranchiseErrorEpic = action$ => action$
  .ofType(RECEIVE_FRANCHISES_FAILURE)
  .flatMap(() => Observable.of(displayGenericError()))

const receiveFranchiseCompletionErrorEpic = action$ => action$
  .ofType(RECEIVE_FRANCHISE_COMPLETION_FAILURE)
  .flatMap(() => Observable.of(displayGenericError()))

const receiveGamesErrorEpic = action$ => action$
  .ofType(RECEIVE_GAMES_FAILURE)
  .flatMap(() => Observable.of(displayGenericError()))

const receiveGamesCompletionErrorEpic = action$ => action$
  .ofType(RECEIVE_GAME_COMPLETION_FAILURE)
  .flatMap(() => Observable.of(displayGenericError()))

const requestMoreGamesErrorEpic = action$ => action$
  .ofType(RECEIVE_MORE_GAMES_FAILURE)
  .flatMap(() => Observable.of(displayGenericError()))

const displayGenericErrorEpic = action$ => action$
  .ofType(DISPLAY_GENERIC_ERROR)
  .flatMap(() => {
    Alert.alert(
      'Something went wrong',
      'Oops, apparently something didn\'t end up very well\n can you please, try later ?',
      {
        cancelable: true,
      }
    )

    return Observable.empty()
  })

const appEndLoadEpic = (action$, store) => action$
  .ofType(END_LOAD_SUCCESS)
  .flatMap(() => {
    const ownedGames = getOwnedGames(store.getState())

    return Observable.of(requestGames(ownedGames))
  })

export const epic = combineEpics(
  receiveFranchiseErrorEpic,
  receiveFranchiseCompletionErrorEpic,
  receiveGamesErrorEpic,
  receiveGamesCompletionErrorEpic,
  requestMoreGamesErrorEpic,
  displayGenericErrorEpic,
  appEndLoadEpic
)

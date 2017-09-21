import 'rxjs'
import { Observable } from 'rxjs/Observable'
import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

import { fetchFullGame } from '#services/giant-bomb'

import { clearSearch } from '#modules/search-engine'

import { getOwnedGames } from '#selectors/owned-game-catalogue'

import {
  // SEARCHTEXT_SOURCE,
  GAMES_SOURCE,

  updateActiveSourceType,
  updateGames,
} from '#modules/game-source'

import {
  requestGames,
  removeAllGames,
} from '#modules/game-catalogue'

import {
  REQUEST_GAME_FULL_COMPLETION,

  requestGameFullCompletion,
  receiveGameCompletion,
  receiveGameCompletionFailure,
} from '#modules/game-catalogue/item/game'


// state key
export const STATE_KEY = 'gameExplorer'


// State
const initialState = {
  detailedGameId: null,
  isDisplayingOnlyOwnedGames: false,
}


// Actions
export const SHOW_GAME_DETAILS = `my-games/${STATE_KEY}/SHOW_GAME_DETAILS`
export const HIDE_GAME_DETAILS = `my-games/${STATE_KEY}/HIDE_GAME_DETAILS`
export const MARK_DISPLAYING_ONLY_OWNED_GAMES = `my-games/${STATE_KEY}/MARK_DISPLAYING_ONLY_OWNED_GAMES`
export const MARK_IS_DISPLAYING_ANY_GAMES = `my-games/${STATE_KEY}/MARK_IS_DISPLAYING_ANY_GAMES`


// Reducers
function detailedGameIdReducer(state = initialState.detailedGameId, action) {
  switch (action.type) {
    case SHOW_GAME_DETAILS:
      return action.detailedGame.id
    case HIDE_GAME_DETAILS:
      return initialState.detailedGameId
    default:
      return state
  }
}

function isDisplayingOnlyOwnedGamesReducer(state = initialState.isDisplayingOnlyOwnedGames, action) {
  switch (action.type) {
    case MARK_DISPLAYING_ONLY_OWNED_GAMES:
      return true
    case MARK_IS_DISPLAYING_ANY_GAMES:
      return false
    default:
      return state
  }
}

export default combineReducers({
  detailedGameId: detailedGameIdReducer,
  isDisplayingOnlyOwnedGames: isDisplayingOnlyOwnedGamesReducer,
})


// Action Creators
export const showGameDetails = detailedGame => ({
  type: SHOW_GAME_DETAILS,
  detailedGame,
})
export const hideGameDetails = () => ({
  type: HIDE_GAME_DETAILS,
})
export const markDisplayingOnlyOwnedGames = () => ({
  type: MARK_DISPLAYING_ONLY_OWNED_GAMES,
})
export const markIsDisplayingAnyGames = () => ({
  type: MARK_IS_DISPLAYING_ANY_GAMES,
})


// Epics
const showGameDetailsEpic = action$ => action$
  .ofType(SHOW_GAME_DETAILS)
  .mergeMap((action) => {
    let observable = Observable.empty()

    if (action.detailedGame.completionLevel < 3) {
      observable = Observable.of(requestGameFullCompletion(action.detailedGame))
    }

    return observable
  })

const requestGameFullCompletionEpic = action$ => action$
  .ofType(REQUEST_GAME_FULL_COMPLETION)
  .mergeMap(action => fetchFullGame(action.game)
    .mergeMap(response => Observable.of(receiveGameCompletion(response.results)))
    .takeUntil(action$.ofType(HIDE_GAME_DETAILS))
    .catch(error => Observable.of(receiveGameCompletionFailure(error)))
  )

const markDisplayingOnlyOwnedGamesEpic = (action$, store) => action$
  .ofType(MARK_DISPLAYING_ONLY_OWNED_GAMES)
  .mergeMap(() => {
    const state = store.getState()
    const ownedGames = getOwnedGames(state)

    return [
      clearSearch(),
      updateActiveSourceType(GAMES_SOURCE),
      updateGames(ownedGames),
      removeAllGames(),
      requestGames()
    ]
  })


export const epic = combineEpics(
  showGameDetailsEpic,
  requestGameFullCompletionEpic,
  markDisplayingOnlyOwnedGamesEpic
)

import 'rxjs'
import { Observable } from 'rxjs/Observable'
import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

import { fetchFullGame } from '#services/giant-bomb'

import { getOwnedGames } from '#selectors/owned-game-catalogue'

import { requestGames, removeAllGames } from '#modules/game-catalogue'
import { clearSearch } from '#modules/search-engine'

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
export const DISPLAY_ONLY_OWNED_GAMES = `my-games/${STATE_KEY}/DISPLAY_ONLY_OWNED_GAMES`
export const DISPLAY_ANY_GAMES = `my-games/${STATE_KEY}/DISPLAY_ANY_GAMES`

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
    case DISPLAY_ONLY_OWNED_GAMES:
      return true
    case DISPLAY_ANY_GAMES:
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
export const displayOnlyOwnedGames = () => ({
  type: DISPLAY_ONLY_OWNED_GAMES,
})
export const displayAnyGames = () => ({
  type: DISPLAY_ANY_GAMES,
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

const displayOnlyOwnedGamesEpic = (action$, store) => action$
  .ofType(DISPLAY_ONLY_OWNED_GAMES)
  .mergeMap(() => {
    const state = store.getState()
    const ownedGames = getOwnedGames(state)

    return [
      clearSearch(),
      removeAllGames(),
      requestGames(ownedGames),
    ]
  })


export const epic = combineEpics(
  showGameDetailsEpic,
  requestGameFullCompletionEpic,
  displayOnlyOwnedGamesEpic
)

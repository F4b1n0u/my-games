import 'rxjs'
import { Observable } from 'rxjs/Observable'
import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

import {
  fetchFullGame,
} from '#services/giant-bomb'

import {
  REQUEST_GAME_FULL_COMPLETION,

  requestGameFullCompletion,
  receiveGameCompletion,
  receiveGameCompletionFailure,
} from '#modules/game-catalogue/item/game'


// State
const initialState = {
  detailedGameId: null,
}


// Actions
export const SHOW_GAME_DETAILS = 'my-games/game-explorer/SHOW_GAME_DETAILS'
export const HIDE_GAME_DETAILS = 'my-games/game-explorer/HIDE_GAME_DETAILS'


// Reducers
function detailedGameIdReducer(
  state = initialState.detailedGameId,
  action
) {
  switch (action.type) {
    case SHOW_GAME_DETAILS:
      return action.detailedGame.id
    case HIDE_GAME_DETAILS:
      return initialState.detailedGameId
    default:
      return state
  }
}

export default combineReducers({
  detailedGameId: detailedGameIdReducer,
})


// Action Creators
export const showGameDetails = detailedGame => ({
  type: SHOW_GAME_DETAILS,
  detailedGame,
})

export const hideGameDetails = () => ({
  type: HIDE_GAME_DETAILS,
})


// Epics
const showGameDetailsEpic = action$ => action$
  .ofType(SHOW_GAME_DETAILS)
  .flatMap((action) => {
    let observable = Observable.empty()

    if (action.detailedGame.completionLevel < 3) {
      observable = Observable.of(requestGameFullCompletion(action.detailedGame))
    }

    return observable
  })

const requestGameFullCompletionEpic = action$ => action$
  .ofType(REQUEST_GAME_FULL_COMPLETION)
  .switchMap(action => fetchFullGame(action.game)
    .map(response => receiveGameCompletion(response.results))
    .takeUntil(action$.ofType(HIDE_GAME_DETAILS))
    .catch(error => Observable.of(receiveGameCompletionFailure(error)))
  )

export const epic = combineEpics(
  showGameDetailsEpic,
  requestGameFullCompletionEpic
)

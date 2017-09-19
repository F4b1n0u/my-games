import 'rxjs'
import _ from 'lodash'
import { Observable } from 'rxjs/Observable'
import { combineEpics } from 'redux-observable'

import platformsReducer, {
  STATE_KEY as PLATFORMS_KEY,
} from '#modules/game-catalogue/item/game/platforms'
import { requestGamesCompletion } from '#modules/game-catalogue'


// state key
export const STATE_KEY = 'game'


// State
const initialState = {}


// Actions
export const RECEIVE_GAME_SUCCESS = `my-games/${STATE_KEY}/RECEIVE_GAME_SUCCESS`
export const REQUEST_GAME_PARTIAL_COMPLETION = `my-games/${STATE_KEY}/REQUEST_GAME_PARTIAL_COMPLETION`
export const REQUEST_GAME_FULL_COMPLETION = `my-games/${STATE_KEY}/REQUEST_GAME_FULL_COMPLETION`
export const RECEIVE_GAME_COMPLETION_SUCCESS = `my-games/${STATE_KEY}/RECEIVE_GAME_COMPLETION_SUCCESS`
export const RECEIVE_GAME_COMPLETION_FAILURE = `my-games/${STATE_KEY}/RECEIVE_GAME_COMPLETION_FAILURE`


// Reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_GAME_SUCCESS:
      return action.game
    case RECEIVE_GAME_COMPLETION_SUCCESS:
      return _.merge(
        {},
        action.completedGame,
        {
          [PLATFORMS_KEY]: platformsReducer(state.platforms, action),
        }
      )
    default:
      return state
  }
}

// Action Creators
export const requestGamePartialCompletion = game => ({
  type: REQUEST_GAME_PARTIAL_COMPLETION,
  game,
})
export const requestGameFullCompletion = game => ({
  type: REQUEST_GAME_FULL_COMPLETION,
  game,
})
export const receiveGameCompletion = completedGame => ({
  type: RECEIVE_GAME_COMPLETION_SUCCESS,
  completedGame,
})
export const receiveGameCompletionFailure = error => ({
  type: RECEIVE_GAME_COMPLETION_FAILURE,
  error,
})
export const receiveGame = game => ({
  type: RECEIVE_GAME_SUCCESS,
  game,
})


// Epics
const requestGamePartialCompletionEpic = action$ => action$
  .ofType(REQUEST_GAME_PARTIAL_COMPLETION)
  .bufferTime(1000)
  .map(requests => requests.map(request => request.game))
  .mergeMap((games) => {
    let observable = Observable.empty()

    if (!_.isEmpty(games)) {
      observable = Observable.of(requestGamesCompletion(games))
    }

    return observable
  })
export const epic = combineEpics(
  requestGamePartialCompletionEpic
)

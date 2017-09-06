import 'rxjs'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Observable'

import {
  fetchFullGame,
} from '@services/giant-bomb'

import {
  HIDE_GAME_DETAILS,
  SHOW_GAME_DETAILS,
} from '@actions/game-explorer'

import {
  REQUEST_GAME_FULL_COMPLETION,

  requestGameFullCompletion,
  receiveGameCompletion,
  receiveGameCompletionFailure,
} from '@actions/game-catalogue'

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

export default combineEpics(
  showGameDetailsEpic,
  requestGameFullCompletionEpic
)

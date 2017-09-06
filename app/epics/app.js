import { Observable } from 'rxjs/Observable'
import { Alert } from 'react-native'
import { combineEpics } from 'redux-observable'

import {
  DISPLAY_GENERIC_ERROR,
  displayGenericError,
} from '@actions/app'

import {
  RECEIVE_FRANCHISES_FAILURE,
  RECEIVE_FRANCHISE_COMPLETION_FAILURE,
} from '@actions/search-engine'

import {
  RECEIVE_GAMES_FAILURE,
  RECEIVE_GAME_COMPLETION_FAILURE,
  RECEIVE_MORE_GAMES_FAILURE,
} from '@actions/game-catalogue'

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

export default combineEpics(
  receiveFranchiseErrorEpic,
  receiveFranchiseCompletionErrorEpic,
  receiveGamesErrorEpic,
  receiveGamesCompletionErrorEpic,
  requestMoreGamesErrorEpic,
  displayGenericErrorEpic
)

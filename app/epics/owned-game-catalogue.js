import 'rxjs'
import _ from 'lodash'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Observable'

import {
  RECEIVE_GAME_SUCCESS,
} from '@actions/game-catalogue'

import {
  getOwnedPlatforms,
} from '@selectors/owned-game-catalogue'

import {
  markGameOwnership,
} from '@actions/owned-game-catalogue'

const receiveGamesEpic = (action$, store) => action$
  .ofType(RECEIVE_GAME_SUCCESS)
  .flatMap((action) => {
    let observable = Observable.empty()

    const ownedGameCatatlogueState = store.getState().ownedGameCatalogue
    const ownedPlatforms = getOwnedPlatforms(ownedGameCatatlogueState, action.game)

    if (!_.isEmpty(ownedPlatforms)) {
      observable = Observable.of(markGameOwnership(action.game, ownedPlatforms))
    }

    return observable
  })

export default combineEpics(
  receiveGamesEpic
)

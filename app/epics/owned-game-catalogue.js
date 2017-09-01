import 'rxjs'
import _ from 'lodash'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Observable'

import {
  RECEIVE_GAME_SUCCESS,
  requestGames,
} from '@actions/game-catalogue'

import {
  SUBMIT_SEARCH,
} from '@actions/search-engine'
import {
  getSearchText,
} from '@selectors/search-engine'

import {
  TOGGLE_PLATFORM_OWNERSHIP,
  markGameOwnership,
} from '@actions/owned-game-catalogue'
import {
  getOwnedPlatforms,
  getOwnedGames,
} from '@selectors/owned-game-catalogue'


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

const togglePlatformOwnershipEpic = (action$, store) => action$
  .ofType(TOGGLE_PLATFORM_OWNERSHIP)
  .flatMap((action) => {
    const ownedGameCatatlogueState = store.getState().ownedGameCatalogue
    const ownedPlatforms = getOwnedPlatforms(ownedGameCatatlogueState, action.game)

    return Observable.of(markGameOwnership(action.game, ownedPlatforms))
  })

const submitSearchEpic = (action$, store) => action$
  .ofType(SUBMIT_SEARCH)
  .flatMap(() => {
    let observable = Observable.empty()

    const searchEngineState = store.getState().searchEngine
    const searchText = getSearchText(searchEngineState).trim()

    const ownedGameCatalogueState = store.getState().ownedGameCatalogue
    const ownedGames = getOwnedGames(ownedGameCatalogueState)

    if (!searchText) {
      observable = Observable.of(requestGames(ownedGames))
    }

    return observable
  })

export default combineEpics(
  receiveGamesEpic,
  togglePlatformOwnershipEpic,
  submitSearchEpic
)

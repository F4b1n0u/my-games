import 'rxjs'
import _ from 'lodash'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Observable'

import {
  fetchGamesBySearch,
  fetchGamesByBulk,
  extractPagination,
} from '@services/giant-bomb'

import {
  SUBMIT_SEARCH,
  stopSearching,
} from '@actions/search-engine'
import {
  getSearchText,
} from '@selectors/search-engine'

import {
  getOwnedGames,
} from '@selectors/owned-game-catalogue'

import {
  END_LOAD_SUCCESS,
} from '@actions/app'

import {
  REQUEST_GAMES,
  REQUEST_MORE_GAMES,
  REQUEST_GAME_PARTIAL_COMPLETION,
  REQUEST_GAMES_COMPLETION,
  RECEIVE_GAMES_SUCCESS,
  RECEIVE_MORE_GAMES_SUCCESS,

  requestGames,
  receiveGames,
  receiveGamesFailure,
  receiveMoreGames,
  receiveMoreGamesFailure,
  requestGamesCompletion,
  receiveGameCompletion,
  receiveGameCompletionFailure,
  receiveGame,
} from '@actions/game-catalogue'
import {
  getNextOffset,
} from '@selectors/game-catalogue'

const receiveGamesEpic = action$ => action$
  .ofType(RECEIVE_MORE_GAMES_SUCCESS)
  .flatMap(action => action.games.map(receiveGame))

const receiveMoreGamesEpic = action$ => action$
  .ofType(RECEIVE_GAMES_SUCCESS)
  .flatMap(action => action.games.map(receiveGame))

const submitSearchEpic = (action$, store) => action$
  .ofType(SUBMIT_SEARCH)
  .flatMap(() => {
    let observable = Observable.empty()

    const searchText = getSearchText(store.getState()).trim()

    if (searchText) {
      observable = Observable.of(requestGames())
    }

    return observable
  })

const requestGamesToStopEpic = action$ => action$
  .ofType(REQUEST_GAMES)
  .mapTo(stopSearching())

const requestGamesToFetchEpic = (action$, store) => action$
  .ofType(REQUEST_GAMES)
  .switchMap((action) => {
    let observable

    if (action.games) {
      observable = fetchGamesByBulk(action.games)
        .map(response => receiveGames(
          response.results,
          extractPagination(response)
        ))
        // .takeUntil(action$.ofType(REQUEST_FRANCHISES))
        .catch(error => Observable.of(receiveGameCompletionFailure(error)))
    } else {
      const searchText = getSearchText(store.getState()).trim()

      if (searchText) {
        observable = fetchGamesBySearch(searchText)
          .map(response => receiveGames(
            response.results,
            extractPagination(response)
          ))
          .catch(error => Observable.of(receiveGamesFailure(error)))
      } else {
        observable = Observable.of(receiveGames(
          [],
          extractPagination()
        ))
      }
    }

    return observable
  })

const requestMoreGameEpic = (action$, store) => action$
  .ofType(REQUEST_MORE_GAMES)
  .switchMap(() => {
    const state = store.getState();
    const searchText = getSearchText(state)
    const offset = getNextOffset(state)

    let observable

    if (searchText) {
      observable = fetchGamesBySearch(searchText, {
        offset,
      })
        .map(response => receiveMoreGames(
          response.results,
          extractPagination(response)
        ))
        .catch(error => Observable.of(receiveMoreGamesFailure(error)))
    } else {
      observable = Observable.of(
        [],
        extractPagination()
      )
    }

    return observable
  })

const requestGamePartialCompletionEpic = action$ => action$
  .ofType(REQUEST_GAME_PARTIAL_COMPLETION)
  .bufferTime(1000)
  .switchMap((requests) => {
    const games = requests.map(request => request.game)
    let observable = Observable.empty()

    if (!_.isEmpty(games)) {
      observable = Observable.of(requestGamesCompletion(games))
    }

    return observable
  })

const requestGamesCompletionEpic = action$ => action$
  .ofType(REQUEST_GAMES_COMPLETION)
  .switchMap(action => fetchGamesByBulk(action.games)
    // no need of an observable Oo
    
    // TODO is it really a receiveGameCompletion I need to do here and not a simple receiveGames ??
    .flatMap(response => response.results.map(receiveGameCompletion))
    // .takeUntil(action$.ofType(REQUEST_FRANCHISES))
    .catch(error => Observable.of(receiveGameCompletionFailure(error)))
  )

// TODO maybe a proper action like DISPLAY_OWNED_GAMES, could be better
// because this action could be reused coule of times
// clear search, search for en empty string, etc
const appEndLoadEpic = (action$, store) => action$
  .ofType(END_LOAD_SUCCESS)
  .flatMap(() => {
    const ownedGames = getOwnedGames(store.getState())

    return Observable.of(requestGames(ownedGames))
  })

export default combineEpics(
  receiveGamesEpic,
  receiveMoreGamesEpic,
  submitSearchEpic,
  requestGamesToStopEpic,
  requestGamesToFetchEpic,
  requestGamePartialCompletionEpic,
  requestGamesCompletionEpic,
  requestMoreGameEpic,
  appEndLoadEpic,
)

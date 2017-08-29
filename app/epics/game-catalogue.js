import 'rxjs';
import _ from 'lodash'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Observable'


import {
  fetchGamesBySearch,
  fetchFullGame,
  fetchGamesByBulk,
  extractPagination,
} from '@services/giant-bomb'

import {
  REQUEST_FRANCHISES,
  SUBMIT_SEARCH,
} from '@actions/search-engine'
import {
  stopSearching,
} from '@actions/search-engine'
import {
  getSearchText,
} from '@selectors/search-engine'

import {
  REQUEST_GAMES,
  REQUEST_MORE_GAMES,
  REQUEST_GAME_COMPLETION,
  REQUEST_GAMES_COMPLETION,
} from '@actions/game-catalogue'
import {
  requestGames,
  receiveGames,
  receiveGamesFailure,
  receiveMoreGames,
  receiveMoreGamesFailure,
  requestGamesCompletion,
  receiveGameCompletion,
  receiveGameCompletionFailure,
} from '@actions/game-catalogue'
import { 
  getNextOffset,
} from '@selectors/game-catalogue'

const submitSearchEpic = action$ => action$
  .ofType(SUBMIT_SEARCH)
  .mapTo(requestGames())

const requestGamesToStopEpic = action$ => action$
  .ofType(REQUEST_GAMES)
  .mapTo(stopSearching())

const requestGamesToFetchEpic = (action$, store) => action$
  .ofType(REQUEST_GAMES)
  .switchMap(() => {
    const searchEngineState = store.getState().searchEngine
    const searchText = getSearchText(searchEngineState);

    let observable

    if (searchText) {
      observable = fetchGamesBySearch(searchText)
        .map(response => receiveGames(
          response.results,
          extractPagination(response),
        ))
        .catch(error => Observable.of(receiveGamesFailure(error)))
    } else {
      observable = Observable.of(receiveGames([]))
    }

    return observable
  })

const requestMoreGameEpic = (action$, store) => action$
  .ofType(REQUEST_MORE_GAMES)
  .switchMap(() => {
    const searchEngineState = store.getState().searchEngine
    const gameCatalogueState = store.getState().gameCatalogue

    const searchText = getSearchText(searchEngineState);
    const offset = getNextOffset(gameCatalogueState)

    let observable

    if (searchText) {
      observable = fetchGamesBySearch(searchText, {
        offset,
      })
        .map(response => receiveMoreGames(
          response.results,
          extractPagination(response),
        ))
        .catch(error => Observable.of(receiveMoreGamesFailure(error)))
    } else {
      observable = Observable.of(receiveGames([]))
    }

    return observable
  })

const requestGameCompletionEpic = action$ => action$
  .ofType(REQUEST_GAME_COMPLETION)
  .bufferTime(1000)
  .switchMap(requests => {
    const games = requests.map(request => request.game)
    let observable = Observable.empty()

    if (!_.isEmpty(games)) {
      observable = Observable.of(requestGamesCompletion(games))
    }

    return observable
  })

const requestGamesCompletionEpic  = action$ => action$
  .ofType(REQUEST_GAMES_COMPLETION)
  .switchMap(action => fetchGamesByBulk(action.games)
    .flatMap(response => response.results.map(
      result => receiveGameCompletion(result)
    ))
    // .takeUntil(REQUEST_FRANCHISES)
    .catch(error => Observable.of(receiveGameCompletionFailure(error)))
  )

export default combineEpics(
  submitSearchEpic,
  requestGamesToStopEpic,
  requestGamesToFetchEpic,
  requestGameCompletionEpic,
  requestGamesCompletionEpic,
  requestMoreGameEpic,
)

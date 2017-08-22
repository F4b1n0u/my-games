import 'rxjs';
import _ from 'lodash'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { getSearchText } from '@selectors/search-engine'
import { fetchGames } from '@services/giant-bomb'
import {
  SUBMIT_SEARCH
} from '@actions/search-engine'
import {
  stopSearching,
} from '@actions/search-engine'
import {
  REQUEST_GAMES,
} from '@actions/games'
import {
  requestGames,
  receiveGames,
  receiveGamesFailure,
} from '@actions/games'

const submitSearchEpic = (action$, store) => {
  return action$
    .ofType(SUBMIT_SEARCH)
    .mapTo(requestGames())
}

const requestGamesToStopEpic = (action$, store) => {
  return action$
    .ofType(REQUEST_GAMES)
    .mapTo(stopSearching())
}

const requestGamesToFetchEpic = (action$, store) => {
  return action$
    .ofType(REQUEST_GAMES)
    .mapTo(stopSearching())
    .switchMap(() => {
      const searchEngineState = store.getState().searchEngine
      const searchText = getSearchText(searchEngineState);

      let observable

      if (searchText) {
        observable = fetchGames(searchText)
          .map(response => {
            return receiveGames(response.results)
          })
          .catch(error => Observable.of(receiveGamesFailure(error)))
      } else {
        observable = Observable.of(receiveGames([]))
      }

      return observable
    })
}

export default combineEpics(
  submitSearchEpic,
  requestGamesToStopEpic,
  requestGamesToFetchEpic,
)

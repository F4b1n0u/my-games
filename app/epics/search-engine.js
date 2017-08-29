import 'rxjs';
import _ from 'lodash'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { getSearchText } from '@selectors/search-engine'
import { fetchFranchises } from '@services/giant-bomb'
import {
  fetchFranchiseCompletion,
  extractPagination,
} from '@services/giant-bomb'
import {
  isPending as isCataloguePending,
} from '@selectors/game-catalogue'
import {
  UPDATE_SEARCHTEXT,
  REQUEST_FRANCHISES,
  SUBMIT_SEARCH,
  SELECT_FRANCHISE,
  REQUEST_FRANCHISE_COMPLETION,
  STOP_SEARCHING,
} from '@actions/search-engine'
import {
  requestFranchises,
  receiveFranchises,
  receiveFranchisesFailure,
  stopSearching,
  requestFranchiseCompletion,
  receiveFranchiseCompletion,
  receiveFranchiseCompletionFailure,
} from '@actions/search-engine'
import {
  receiveGames,
} from '@actions/game-catalogue'

const updateSearchTextEpic = (action$, store) => {
  return action$
    .ofType(UPDATE_SEARCHTEXT)
    .debounceTime(250)
    .mapTo(requestFranchises())
}

// TODO
// Req G
// Res G <-|
// Req F   |-- inferior to 250, due to the debounce, not even sure this case is possible
// Res F <-|
const requestFranchisesEpic = (action$, store) => {
  // check if a request game is pending
  // Req G
  // Req F <- game is pending
  // Res G
  // Res F
  return action$
    .ofType(REQUEST_FRANCHISES)
    .switchMap(() => {
      const searchEngineState = store.getState().searchEngine
      const gameCatalogueState = store.getState().gameCatalogue
      
      const searchText = getSearchText(searchEngineState);
      const isPending = isCataloguePending(gameCatalogueState)

      let observable = Observable.empty()

      if (!isPending && searchText) {
        observable = fetchFranchises(searchText)
          .map(response => receiveFranchises(response.results))
          // check if a request game is pending
          // Req F
          // Req G <- similar to STOP_SEARCHING here due to requestGamesToStopEpic
          // Res G
          // Res F
          .takeUntil(action$.ofType(STOP_SEARCHING))
          .catch(error => Observable.of(receiveFranchisesFailure(error)))
      } else {
        observable = Observable.of(receiveFranchises([]))
      }

      return observable
    })
}

const selectFranchiseToStopEpic = (action$, store) => {
  return action$
    .ofType(SELECT_FRANCHISE)
    .mapTo(stopSearching())
}

const selectFranchiseTofetchEpic = (action$, store) => {
  return action$
    .ofType(SELECT_FRANCHISE)
    .flatMap(action => Observable.of(requestFranchiseCompletion(action.selectedFranchise)))
}

const requestFranchiseCompletionEpic = (action$, store) => action$
  .ofType(REQUEST_FRANCHISE_COMPLETION)
  .mergeMap(action => fetchFranchiseCompletion(action.selectedFranchise)
    .map(response => receiveGames(
      response.results.games,
      extractPagination(response),
    ))
    .takeUntil(action$.ofType(SUBMIT_SEARCH))
    .catch(error => Observable.of(receiveFranchiseCompletionFailure(error))
  )
)

export default combineEpics(
  updateSearchTextEpic,
  requestFranchisesEpic,
  selectFranchiseToStopEpic,
  selectFranchiseTofetchEpic,
  requestFranchiseCompletionEpic,
)

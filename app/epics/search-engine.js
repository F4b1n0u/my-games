import 'rxjs';
import _ from 'lodash'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { getSearchText } from '@selectors/search-engine'
import { fetchFranchiseFranchises } from '@services/giant-bomb'
import {
  getListStatus,
} from '@selectors/games'
import {
  UPDATE_SEARCHTEXT,
  REQUEST_FRANCHISES,
  SELECT_FRANCHISE,
  SUBMIT_SEARCH,
  STOP_SEARCHING,
} from '@actions/search-engine'
import {
  requestFranchises,
  receiveFranchises,
  receiveFranchisesFailure,
  stopSearching,
} from '@actions/search-engine'

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
    .flatMap(() => {
      const searchEngineState = store.getState().searchEngine
      const searchText = getSearchText(searchEngineState);

      const gamesState = store.getState().games
      const gamesStatus = getListStatus(gamesState)
      const isGamesPending = gamesStatus.pending

      let observable

      if(isGamesPending) {
        observable = Observable.of({
          type: 'DO_NOTHING'
        })
      } else if (searchText) {
        observable = fetchFranchiseFranchises(searchText)
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

export default combineEpics(
  updateSearchTextEpic,
  requestFranchisesEpic,
)

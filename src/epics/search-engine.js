import 'rxjs';
import _ from 'lodash'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { getSearchText } from '../selectors/search-engine'
import { fetchFranchiseFranchises } from '../services/giant-bomb'
import {
  UPDATE_SEARCHTEXT,
  REQUEST_FRANCHISES,
  SELECT_FRANCHISE,
  SUBMIT_SEARCH,
  STOP_SEARCHING,
} from '../actions/search-engine'
import {
  requestFranchises,
  receiveFranchises,
  receiveFranchisesFailure,
  stopSearching,
} from '../actions/search-engine'

const updateSearchTextEpic = (action$, store) => {
  return action$
    .ofType(UPDATE_SEARCHTEXT)
    .debounceTime(250)
    .mapTo(requestFranchises())
}

const requestFranchisesEpic = (action$, store) => {
  return action$
    .ofType(REQUEST_FRANCHISES)
    .flatMap(() => {
      const searchEngineState = store.getState().searchEngine
      const searchText = getSearchText(searchEngineState);

      let observable

      if (searchText) {
        observable = fetchFranchiseFranchises(searchText)
          .map(response => receiveFranchises(response.results))
          .takeUntil(action$.ofType(STOP_SEARCHING))
          .catch(error => Observable.of(receiveFranchisesFailure(error)))
      } else {
        observable = Observable.of(receiveFranchises([]))
      }

      return observable
    })
}

const selectFranchiseEpic = (action$, store) => {
  return action$
    .ofType(SELECT_FRANCHISE)
    .mapTo(stopSearching())
}

export default combineEpics(
  selectFranchiseEpic,
  updateSearchTextEpic,
  requestFranchisesEpic,
)

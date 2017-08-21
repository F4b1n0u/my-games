import 'rxjs';
import _ from 'lodash'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { getSearchText } from '../selectors/search-engine'
import { fetchSuggestions } from '../services/giant-bomb'
import * as actions from '../actions'

import _suggestions from '../services/suggestions'

const updateSearchTextEpic = (action$, store) => {
  return action$
    .ofType(actions.UPDATE_SEARCHTEXT)
    .debounceTime(250)
    .mapTo(actions.requestSuggestions())
}

const requestSuggestionsEpic = (action$, store) => {
  return action$
    .ofType(actions.REQUEST_SUGGESTIONS)
    .switchMap(() => {
      const searchEngineState = store.getState().searchEngine
      const searchText = getSearchText(searchEngineState);

      let observable

      if (searchText) {
        observable = fetchSuggestions(searchText)
          .map(response => actions.receiveSuggestions(response.results))
          .catch(error => Observable.of(actions.receiveSuggestionsFailure(error)))
      } else {
        observable = Observable.of(actions.receiveSuggestions([]))
      }

      return observable
    })
}

export default combineEpics(
  updateSearchTextEpic,
  requestSuggestionsEpic,
)

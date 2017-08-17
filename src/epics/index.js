import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import { getSearchText } from '../reducers';
import { giantBomb } from '../services';
import * as actions from '../actions';

const requestSuggestions = (action$, store) => {
  return action$
    .ofType(actions.REQUEST_SUGGESTIONS)
    .switchMap(q => {
      const searchText = getSearchText(store.getState());
      return giantBomb
        .getSuggestions(searchText)
        .map(actions.receiveSuggestionsSuccess)
        .catch(error => Observable.of(actions.receiveSuggestionsFailure(error)))
    });
};

export const rootEpic = combineEpics(
  requestSuggestions,
);





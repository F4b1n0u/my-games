export const UPDATE_SEARCHTEXT = 'my-ganes/search-engine/UPDATE_SEARCHTEXT';
export const REQUEST_SUGGESTIONS = 'my-ganes/search-engine/REQUEST_SUGGESTIONS';
export const RECEIVE_SUGGESTIONS_SUCCESS = 'my-ganes/search-engine/RECEIVE_SUGGESTIONS_SUCCESS';
export const RECEIVE_SUGGESTIONS_FAILURE = 'my-ganes/search-engine/RECEIVE_SUGGESTIONS_FAILURE';

export function updateSearchText(searchText) {
  return {
    type: UPDATE_SEARCHTEXT,
    searchText,
  }
}

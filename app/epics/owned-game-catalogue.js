import 'rxjs'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Observable'

import { SUBMIT_SEARCH } from '@actions/search-engine'
import { requestGames } from '@actions/game-catalogue'

import { getSearchText } from '@selectors/search-engine'
import { getOwnedGames } from '@selectors/owned-game-catalogue'

const submitSearchEpic = (action$, store) => action$
  .ofType(SUBMIT_SEARCH)
  .flatMap(() => {
    let observable = Observable.empty()

    const searchEngineState = store.getState().searchEngine
    const searchText = getSearchText(searchEngineState).trim()

    if (!searchText) {
      const ownedGameCatalogueState = store.getState().ownedGameCatalogue
      const ownedGames = getOwnedGames(ownedGameCatalogueState)
      
      observable = Observable.of(requestGames(ownedGames))
    }

    return observable
  })

export default combineEpics(
  submitSearchEpic
)

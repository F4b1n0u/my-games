
import 'rxjs'
import _ from 'lodash'
import { Observable } from 'rxjs/Observable'
import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

import {
  fetchGamesBySearch,
  fetchGamesByBulk,
  extractPagination,
} from '#services/giant-bomb'

import {
  RECEIVE_GAME_SUCCESS,
  RECEIVE_GAME_COMPLETION_SUCCESS,

  receiveGame,
  receiveGameCompletion,
  receiveGameCompletionFailure,
} from '#modules/game-catalogue/item/game'

import itemReducer, {
  epic as itemEpic
} from '#modules/game-catalogue/item'

import {
  SEARCHTEXT_SOURCE,
  GAMES_SOURCE,
} from '#modules/game-source'

import { getNextOffset, getNextPage } from '#selectors/game-catalogue'
import { getActiveSourceType, getActiveSource } from '#selectors/game-source'

// state key
export const STATE_KEY = 'gameCatalogue'


// State
const initialState = {
  entities: {
    items: {
      byId: {},
      allIds: []
    }
  },
  status: {
    pending: false,
    error: null,
  },
  pagination: {
    max: 10,
    amount: 0,
    total: 0,
    offset: 0,
  },
  item: {
    game: {},
    status: {},
  },
}


// Actions
export const REQUEST_GAMES = `my-games/${STATE_KEY}/REQUEST_GAMES`
export const RECEIVE_GAMES_SUCCESS = `my-games/${STATE_KEY}/RECEIVE_GAMES_SUCCESS`
export const RECEIVE_GAMES_FAILURE = `my-games/${STATE_KEY}/RECEIVE_GAMES_FAILURE`
export const REQUEST_GAMES_COMPLETION = `my-games/${STATE_KEY}/REQUEST_GAMES_COMPLETION`
export const REQUEST_MORE_GAMES = `my-games/${STATE_KEY}/REQUEST_MORE_GAMES`
export const RECEIVE_MORE_GAMES_SUCCESS = `my-games/${STATE_KEY}/RECEIVE_MORE_GAMES_SUCCESS`
export const RECEIVE_MORE_GAMES_FAILURE = `my-games/${STATE_KEY}/RECEIVE_MORE_GAMES_FAILURE`
export const REMOVE_ALL_GAMES = `my-games/${STATE_KEY}/REMOVE_ALL_GAMES`

// TODO split this reducer in dedicated modules, to finish the duck pattern 
function itemsByIdReducer(state = initialState.entities.items.byId, action) {
  switch (action.type) {
    case REMOVE_ALL_GAMES:
      return initialState.entities.items.byId
    case RECEIVE_GAME_SUCCESS:
      return _.merge(
        {},
        state,
        {
          [action.game.id]: itemReducer(
            initialState.item,
            action
          )
        }
      )
    case RECEIVE_GAME_COMPLETION_SUCCESS:
      return _.merge(
        {},
        state,
        {
          [action.completedGame.id]: itemReducer(
            initialState.item,
            action
          )
        }
      )
    default:
      return state
  }
}

// TODO split this reducer in dedicated modules, to finish the duck pattern 
function itemsAllIdsReducer(state = initialState.entities.items.allIds, action) {
  switch (action.type) {
    case REMOVE_ALL_GAMES:
      return initialState.entities.items.allIds
    case RECEIVE_GAME_SUCCESS:
      return _.uniq(
        _.concat(
          state,
          action.game.id
        )
      )
    default:
      return state
  }
}

// TODO split this reducer in dedicated modules, to finish the duck pattern 
function statusReducer(state = initialState.status, action) {
  switch (action.type) {
    case REQUEST_GAMES:
    case REQUEST_MORE_GAMES:
    case REMOVE_ALL_GAMES:
      return {
        pending: true,
        error: null,
      }
    case RECEIVE_GAMES_SUCCESS:
    case RECEIVE_MORE_GAMES_SUCCESS:
      return initialState.status
    case RECEIVE_GAMES_FAILURE:
      return {
        pending: false,
        error: action.error,
      }
    default:
      return state
  }
}
// TODO split this reducer in dedicated modules, to finish the duck pattern 
function paginationReducer(state = initialState.pagination, action) {
  switch (action.type) {
    case RECEIVE_GAMES_SUCCESS:
    case RECEIVE_MORE_GAMES_SUCCESS:
      return action.pagination
    case RECEIVE_GAMES_FAILURE:
      return initialState.pagination
    default:
      return state
  }
}

const itemsReducer = combineReducers({
  byId: itemsByIdReducer,
  allIds: itemsAllIdsReducer,
})

const entitiesReducer = combineReducers({
  items: itemsReducer
})

// TODO once split, use the STATE_KEY instead
export default combineReducers({
  entities: entitiesReducer,
  status: statusReducer,
  pagination: paginationReducer,
})


// Action Creators
export const requestGames = games => ({
  type: REQUEST_GAMES,
  games,
})
export const receiveGames = (games, pagination) => ({
  type: RECEIVE_GAMES_SUCCESS,
  games,
  pagination,
})
export const receiveGamesFailure = error => ({
  type: RECEIVE_GAMES_FAILURE,
  error,
})
export const requestGamesCompletion = games => ({
  type: REQUEST_GAMES_COMPLETION,
  games,
})
export const requestMoreGames = () => ({
  type: REQUEST_MORE_GAMES,
})
export const receiveMoreGames = (games, pagination) => ({
  type: RECEIVE_MORE_GAMES_SUCCESS,
  games,
  pagination,
})
export const receiveMoreGamesFailure = error => ({
  type: RECEIVE_MORE_GAMES_FAILURE,
  error,
})
export const removeAllGames = () => ({
  type: REMOVE_ALL_GAMES,
})

// Epics
const requestGamesEpic = (action$, store) => action$
  .ofType(REQUEST_GAMES)
  .mergeMap(() => {
    const state = store.getState()
    const activeSourceType = getActiveSourceType(state)

    let observable
    let searchText
    let games

    switch (activeSourceType) {
      case SEARCHTEXT_SOURCE:
        searchText = getActiveSource(state).trim()

        if (searchText) {
          observable = fetchGamesBySearch(searchText)
            .mergeMap(response => Observable.of(receiveGames(
              response.results,
              extractPagination(response)
            )))
            .catch(error => Observable.of(receiveGamesFailure(error)))
        } else {
          observable = Observable.of(receiveGames(
            [],
            extractPagination()
          ))
        }
        break
      case GAMES_SOURCE:
        games = getActiveSource(state)

        observable = fetchGamesByBulk(games)
          .mergeMap(response => Observable.of(receiveGames(
            response.results,
            extractPagination(response)
          )))
          .takeUntil(action$.ofType(REQUEST_GAMES))
          .catch(error => Observable.of(receiveGamesFailure(error)))
        break
      default:
        break
    }
    return observable
  })

const requestMoreGameEpic = (action$, store) => action$
  .ofType(REQUEST_MORE_GAMES)
  .mergeMap(() => {
    const state = store.getState()
    const activeSourceType = getActiveSourceType(state)
    const offset = getNextOffset(state)
    const page = getNextPage(state)

    let observable
    let searchText
    let games

    switch (activeSourceType) {
      case SEARCHTEXT_SOURCE:
        searchText = getActiveSource(state).trim()

        observable = fetchGamesBySearch(searchText, {
          page,
        })
          .mergeMap(response => Observable.of(receiveMoreGames(
            response.results,
            extractPagination(response)
          )))
          .catch(error => Observable.of(receiveMoreGamesFailure(error)))
        break
      case GAMES_SOURCE:
        games = getActiveSource(state)

        observable = fetchGamesByBulk(games, {
          offset,
        })
          .mergeMap(response => Observable.of(receiveGames(
            response.results,
            extractPagination(response)
          )))
          .takeUntil(action$.ofType(REQUEST_GAMES))
          .catch(error => Observable.of(receiveGamesFailure(error)))
        break
      default:
        break
    }

    return observable
  })

const requestGamesCompletionEpic = action$ => action$
  .ofType(REQUEST_GAMES_COMPLETION)
  .mergeMap(action => fetchGamesByBulk(action.games)
    .mergeMap(response => Observable.from(response.results))
    .mergeMap(game => Observable.of(receiveGameCompletion(game)))
    .takeUntil(action$.ofType(REQUEST_GAMES))
    .catch(error => Observable.of(receiveGameCompletionFailure(error)))
  )

const receiveGamesEpic = action$ => action$
  .ofType(RECEIVE_GAMES_SUCCESS)
  .mergeMap(action => Observable.from(action.games))
  .mergeMap(game => Observable.of(receiveGame(game)))

const receiveMoreGamesEpic = action$ => action$
  .ofType(RECEIVE_MORE_GAMES_SUCCESS)
  .mergeMap(action => Observable.from(action.games))
  .mergeMap(game => Observable.of(receiveGame(game)))


export const epic = combineEpics(
  requestGamesEpic,
  requestMoreGameEpic,
  requestGamesCompletionEpic,
  receiveMoreGamesEpic,
  receiveGamesEpic,
  itemEpic
)

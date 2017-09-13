
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
  // TODO use a alias action instead
  SELECT_FRANCHISE,
  RECEIVE_FRANCHISE_COMPLETION_FAILURE,

  stopSearching,
} from '#modules/search-engine'

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

import { getSearchText } from '#selectors/search-engine'
import { getNextOffset } from '#selectors/game-catalogue'

// state key
export const STATE_KEY = 'gameCatalogue'


// State
const initialState = {
  list: [],
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


// Reducers
// TODO split this reducer in dedicated modules, to finish the duck pattern 
function listReducer(state = initialState.list, action) {
  const nextState = _.merge(
    [],
    state
  )
  let itemPosition

  switch (action.type) {
    case RECEIVE_GAME_SUCCESS:
      return _.concat(
        state,
        itemReducer(
          initialState.item,
          action
        )
      )
    case RECEIVE_GAME_COMPLETION_SUCCESS:
      itemPosition = _.findIndex(state, item => item.game.id === action.completedGame.id)
      if (itemPosition >= 0) {
        nextState[itemPosition] = itemReducer(
          state[itemPosition],
          action
        )
      }

      return nextState
    case REQUEST_GAMES:
    case SELECT_FRANCHISE:
      return []
    case RECEIVE_FRANCHISE_COMPLETION_FAILURE:
    case RECEIVE_GAMES_FAILURE:
    default:
      return state
  }
}
// TODO split this reducer in dedicated modules, to finish the duck pattern 
function statusReducer(state = initialState.status, action) {
  switch (action.type) {
    case REQUEST_GAMES:
    case REQUEST_MORE_GAMES:
    case SELECT_FRANCHISE:
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
// TODO once split, use the STATE_KEY instead
export default combineReducers({
  list: listReducer,
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


// Epics
const requestGamesToStopEpic = action$ => action$
  .ofType(REQUEST_GAMES)
  .mapTo(stopSearching())

const requestGamesToFetchEpic = (action$, store) => action$
  .ofType(REQUEST_GAMES)
  .switchMap((action) => {
    let observable

    if (action.games) {
      observable = fetchGamesByBulk(action.games)
        .map(response => receiveGames(
          response.results,
          extractPagination(response)
        ))
        // .takeUntil(action$.ofType(REQUEST_FRANCHISES))
        .catch(error => Observable.of(receiveGamesFailure(error)))
    } else {
      const searchText = getSearchText(store.getState()).trim()

      if (searchText) {
        observable = fetchGamesBySearch(searchText)
          .map(response => receiveGames(
            response.results,
            extractPagination(response)
          ))
          .catch(error => Observable.of(receiveGamesFailure(error)))
      } else {
        observable = Observable.of(receiveGames(
          [],
          extractPagination()
        ))
      }
    }

    return observable
  })

const requestMoreGameEpic = (action$, store) => action$
  .ofType(REQUEST_MORE_GAMES)
  .switchMap(() => {
    const state = store.getState()
    const searchText = getSearchText(state)
    const offset = getNextOffset(state)

    let observable

    if (searchText) {
      observable = fetchGamesBySearch(searchText, {
        offset,
      })
        .map(response => receiveMoreGames(
          response.results,
          extractPagination(response)
        ))
        .catch(error => Observable.of(receiveMoreGamesFailure(error)))
    } else {
      observable = Observable.of(
        [],
        extractPagination()
      )
    }

    return observable
  })

// TODO maybe a proper action like DISPLAY_OWNED_GAMES, could be better
// because this action could be reused coule of times
// clear search, search for en empty string, etc
const requestGamesCompletionEpic = action$ => action$
  .ofType(REQUEST_GAMES_COMPLETION)
  .switchMap(action => fetchGamesByBulk(action.games)
    // no need of an observable Oo

    // TODO is it really a receiveGameCompletion I need to do here and not a simple receiveGames ??
    .flatMap(response => response.results.map(receiveGameCompletion))
    // .takeUntil(action$.ofType(REQUEST_FRANCHISES))
    .catch(error => Observable.of(receiveGameCompletionFailure(error)))
  )

const receiveMoreGamesEpic = action$ => action$
  .ofType(RECEIVE_GAMES_SUCCESS)
  .flatMap(action => action.games.map(receiveGame))

const receiveGamesEpic = action$ => action$
  .ofType(RECEIVE_MORE_GAMES_SUCCESS)
  .flatMap(action => action.games.map(receiveGame))


export const epic = combineEpics(
  requestGamesToStopEpic,
  requestGamesToFetchEpic,
  requestMoreGameEpic,
  requestGamesCompletionEpic,
  receiveMoreGamesEpic,
  receiveGamesEpic,
  itemEpic
)

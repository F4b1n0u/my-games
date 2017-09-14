import _ from 'lodash'
import { createSelector } from 'reselect'

import { STATE_KEY as GAME_CATALOGUE_KEY } from '#modules/game-catalogue'

export const getEntityItems = state => state[GAME_CATALOGUE_KEY].entities.items

export const getGames = createSelector(
  [getEntityItems],
  entityItems => entityItems.allIds.map(
    id => _.merge(
      {},
      entityItems.byId[id].game,
      // maybe could use the the preprocessing of normalizr to do that ...
      {
        platforms: [],
      }
    )
  )
)


export const isPending = state => state[GAME_CATALOGUE_KEY].status.pending

export const getError = state => state[GAME_CATALOGUE_KEY].status.error

export const hasMore = state => (state[GAME_CATALOGUE_KEY].pagination.total - (state[GAME_CATALOGUE_KEY].pagination.offset + state[GAME_CATALOGUE_KEY].pagination.amount)) > 0

export const getNextOffset = state => state[GAME_CATALOGUE_KEY].pagination.offset + state[GAME_CATALOGUE_KEY].pagination.amount

export const hasGames = state => !_.isEmpty(state[GAME_CATALOGUE_KEY].entities.items.allIds)

import _ from 'lodash'
import { createSelector } from 'reselect'

import { STATE_KEY as GAME_CATALOGUE_KEY } from '#modules/game-catalogue'

export const getList = state => state[GAME_CATALOGUE_KEY].list

export const getGames = createSelector(
  [getList],
  list => list.map(
    item => _.merge(
      {},
      item.game,
      {
        platforms: []
      }
    )
  )
)


export const isPending = state => state[GAME_CATALOGUE_KEY].status.pending

export const getError = state => state[GAME_CATALOGUE_KEY].status.error

export const hasMore = state => (state[GAME_CATALOGUE_KEY].pagination.total - (state[GAME_CATALOGUE_KEY].pagination.offset + state[GAME_CATALOGUE_KEY].pagination.amount)) > 0

export const getNextOffset = state => state[GAME_CATALOGUE_KEY].pagination.offset + state[GAME_CATALOGUE_KEY].pagination.amount

export const hasGames = state => !_.isEmpty(state[GAME_CATALOGUE_KEY].list)

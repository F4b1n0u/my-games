import _ from 'lodash'
import { createSelector } from 'reselect'

export const getList = state => state.gameCatalogue.list

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


export const isPending = state => state.gameCatalogue.status.pending

export const getError = state => state.gameCatalogue.status.error

export const hasMore = state => (state.gameCatalogue.pagination.total - (state.gameCatalogue.pagination.offset + state.gameCatalogue.pagination.amount)) > 0

export const getNextOffset = state => state.gameCatalogue.pagination.offset + state.gameCatalogue.pagination.amount

export const hasGames = state => !_.isEmpty(state.gameCatalogue.list)

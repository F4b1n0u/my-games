import _ from 'lodash'

export const getGames = state => state.list.map(
  item => _.merge(
    {},
    item.game,
    {
      platforms: []
    }
  )
)

export const isPending = state => state.status.pending

export const getError = state => state.status.error

export const hasMore = state => (state.pagination.total - (state.pagination.offset + state.pagination.amount)) > 0

export const getNextOffset = state => state.pagination.offset + state.pagination.amount

export const hasGames = state => !_.isEmpty(state.list)

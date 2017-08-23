export const getList = state => state.list
export const isPending = state => state.status.pending
export const getError = state => state.status.error
export const hasMore = state => (state.pagination.total - (state.pagination.offset + state.pagination.amount)) > 0
export const getNextOffset = state => state.pagination.offset + state.pagination.amount
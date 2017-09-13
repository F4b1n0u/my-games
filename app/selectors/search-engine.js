import { STATE_KEY as SEARCH_ENGINE_KEY } from '#modules/search-engine'

export const getSearchText = state => state[SEARCH_ENGINE_KEY].searchText || ''
export const isCurrentSearchSubmitted = state => state[SEARCH_ENGINE_KEY].isCurrentSearchSubmitted
export const getFranchises = state => state[SEARCH_ENGINE_KEY].franchises.filter(franchise => franchise.resource_type === 'franchise')
export const isFranchisesPending = state => state[SEARCH_ENGINE_KEY].franchisesStatus.pending

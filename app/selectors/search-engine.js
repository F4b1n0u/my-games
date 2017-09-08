import _ from 'lodash'

export const getSearchText = state => state.searchEngine.searchText || ''

export const isCurrentSearchSubmitted = state => state.searchEngine.isCurrentSearchSubmitted

export const getFranchises = state => state.searchEngine.franchises.filter(franchise => franchise.resource_type === 'franchise')

export const isFranchisesPending = state => state.searchEngine.franchisesStatus.pending

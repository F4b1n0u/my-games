import _ from 'lodash'

export const getSearchText = state => state.searchText || ''

export const isCurrentSearchSubmitted = state => state.isCurrentSearchSubmitted

export const getFranchises = state => state.franchises.filter(franchise => franchise.resource_type === 'franchise')

export const isFranchisesPending = state => state.franchisesStatus.pending

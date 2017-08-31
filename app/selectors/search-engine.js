export const getSearchText = state => state.searchText || ''

export const getFranchises = state => state.franchises.filter(franchise => franchise.resource_type === 'franchise')

export const getFranchisesStatus = state => state.franchisesStatus

import React from 'react';
import { connect } from 'react-redux'

import { updateSearchText } from '../actions'
import { getSearchText } from '../selectors/search-engine'

import SearchEngine from '../components/search-engine'

const mapStateToProps = state => ({
  searchText: getSearchText(state.searchEngine)
})

const mapDispatchToProps = dispatch => ({
  updateSearchText: searchText => {
    dispatch(updateSearchText(searchText))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchEngine)

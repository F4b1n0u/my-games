import { connect } from 'react-redux'

import App from '@components/app'

import {
  isLoading,
  isLoaded,
} from '@selectors/app'

import {
  startLoad,
  endLoad,
} from '@actions/app'

const mapStateToProps = state => ({
  isLoading: isLoading(state.app),
  isLoaded: isLoaded(state.app),
})

const mapDispatchToProps = dispatch => ({
  startLoad: () => dispatch(startLoad()),
  endLoad: () => dispatch(endLoad()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

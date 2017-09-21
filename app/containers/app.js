import { connect } from 'react-redux'

import App from '#components/app'

import { isLoading, isLoaded, isAboutVisible } from '#selectors/app'
import { hasDetailedGame } from '#selectors/game-explorer'
import { startLoad, endLoad, toggleAboutDisplay } from '#modules/app'

import { isScanningBarcode } from '#selectors/search-engine'

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  isLoaded: isLoaded(state),
  isAboutVisible: isAboutVisible(state),
  hasDetailedGame: hasDetailedGame(state),
  isScanningBarcode: isScanningBarcode(state),
})

const mapDispatchToProps = dispatch => ({
  startLoad: () => dispatch(startLoad()),
  endLoad: () => dispatch(endLoad()),
  toggleAboutDisplay: () => dispatch(toggleAboutDisplay()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

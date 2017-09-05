import { connect } from 'react-redux'

import App from '@components/app'

import {
  isLoading,
  isLoaded,
  isAboutVisible,
} from '@selectors/app'
import {
  hasDetailedGame,
} from '@selectors/game-explorer'

import {
  startLoad,
  endLoad,
  toggleAboutDisplay,
} from '@actions/app'

const mapStateToProps = (state) => {
  const {
    app,
    gameExplorer,
  } = state

  return {
    isLoading: isLoading(app),
    isLoaded: isLoaded(app),
    isAboutVisible: isAboutVisible(app),
    hasDetailedGame: hasDetailedGame(gameExplorer),
  }
}

const mapDispatchToProps = dispatch => ({
  startLoad: () => dispatch(startLoad()),
  endLoad: () => dispatch(endLoad()),
  toggleAboutDisplay: () => dispatch(toggleAboutDisplay()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

import { connect } from 'react-redux'

import App from '@components/app'

import {
  isLoading,
  isLoaded,
  isSettingsVisible,
} from '@selectors/app'
import {
  hasDetailedGame,
} from '@selectors/game-explorer'

import {
  startLoad,
  endLoad,
  toggleSettingsDisplay,
} from '@actions/app'

const mapStateToProps = (state) => {
  const {
    app,
    gameExplorer,
  } = state

  return {
    isLoading: isLoading(app),
    isLoaded: isLoaded(app),
    isSettingsVisible: isSettingsVisible(app),
    hasDetailedGame: hasDetailedGame(gameExplorer),
  }
}

const mapDispatchToProps = dispatch => ({
  startLoad: () => dispatch(startLoad()),
  endLoad: () => dispatch(endLoad()),
  toggleSettingsDisplay: () => dispatch(toggleSettingsDisplay()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

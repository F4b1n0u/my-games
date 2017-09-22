import { connect } from 'react-redux'

import {
  passFirstLaunch,
  passFirstFranchise,
  passFirstGame,
  passFirstDetailedGame,
} from '#modules/walkthrough'

import {
  isWalkthroughNeeded,
  isFirstLaunchNeeded,
  isFirstFranchiseNeeded,
  isFirstGameNeeded,
  isFirstDetailedGameNeeded,
} from '#selectors/walkthrough'

import Walkthrough from '#components/walkthrough'

const mapStateToProps = state => ({
  isWalkthroughNeeded: isWalkthroughNeeded(state),
  isFirstLaunchNeeded: isFirstLaunchNeeded(state),
  isFirstFranchiseNeeded: isFirstFranchiseNeeded(state),
  isFirstGameNeeded: isFirstGameNeeded(state),
  isFirstDetailedGameNeeded: isFirstDetailedGameNeeded(state),
})

const mapDispatchToProps = dispatch => ({
  passFirstLaunch: () => dispatch(passFirstLaunch()),
  passFirstFranchise: () => dispatch(passFirstFranchise()),
  passFirstGame: () => dispatch(passFirstGame()),
  passFirstDetailedGame: () => dispatch(passFirstDetailedGame()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Walkthrough)

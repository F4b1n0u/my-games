import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  Animated,
  Easing,
  LayoutAnimation,
  Text,
  UIManager,
  View,
} from 'react-native';
import Expo from 'expo';
import _ from 'lodash';

import Background from './components/background'
import GameExplorer from './components/game-explorer'

import {
  generateInitialState,
  generateSugestions,
  generateGame,
} from './state';

EStyleSheet.build();

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const styles = EStyleSheet.create({
  app: {
    flex: 1,
    flexDirection: 'row'
  },
});

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props)
    this._toggleGameDetails = this._toggleGameDetails.bind(this)
  }

  state = _.merge(
    {},
    generateInitialState({
      hasSuggestions: false,
      amountOfGames: 4,
    })
  );

  _toggleGameDetails = (game) => {
    let nextState = {}

    const isAlreadyVisible = game.id === this.state.detailedGameId

    const detailedGameId = isAlreadyVisible ? null : game.id

    _.merge(
      nextState,
      this.state, {
        detailedGameId,
      }
    );

    this.setState(nextState)
  }

  render() {
    return (
      <View style={styles.app}>
        <Background />
        <GameExplorer
          {...this.state}
          toggleGameDetails={this._toggleGameDetails}
        />
      </View>
    )
  }
}
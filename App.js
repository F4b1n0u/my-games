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
  state = _.merge(
    {},
    generateInitialState({
      hasSuggestions: false,
      amountOfGames: 4,
    })
  );

  isAdding = true;

  componentDidMount() {
    // setInterval(
    //   () => {
    //     let nextState

    //     if (_.isEmpty(this.state.suggestions)) {
    //       nextState = {
    //         suggestions: generateSugestions(),
    //       }
    //     } else {
    //       nextState = {
    //         suggestions: [],
    //       }
    //     }
        
    //     this.setState(nextState)
    //   },
    //   4000
    // )

    // setInterval(
    //   () => {
    //     const {
    //       games
    //     } = this.state;

    //     let nextState

    //     if (games.length <= 0) {
    //       this.isAdding = true;
    //     } else if(games.length >= 4) {
    //       this.isAdding = false;
    //     }

    //     if (this.isAdding) {
    //       nextState = {
    //         games: _.concat(games, generateGame()),
    //       }
    //     } else {
    //       games.pop();
    //       nextState = {
    //         games,
    //       }
    //     }

    //     this.setState(nextState)
    //   },
    //   1000
    // )
  }

  render() {
    return (
      <View style={styles.app}>
        <Background />
        <GameExplorer
          {...this.state}
        />
      </View>
    )
  }
}
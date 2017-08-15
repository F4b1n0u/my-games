import React from 'react';
import {
  UIManager,
} from 'react-native';
import styled from 'styled-components/native';
import Expo, {
  Font
} from 'expo';
import _ from 'lodash';

import Background from './components/background'
import GameExplorer from './components/game-explorer'

import {
  generateInitialState,
  generateSugestions,
  generateGame,
} from './state';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props)
    this._toggleGameDetails = this._toggleGameDetails.bind(this)
    this._collapseDetailedGames = this._collapseDetailedGames.bind(this)
  }

  state = _.merge(
    {
      isFontLoaded: false,
    },
    generateInitialState({
      hasSuggestions: false,
      amountOfGames: 10,
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

  _collapseDetailedGames = (game) => {
    let nextState = {}

    _.merge(
      nextState,
      this.state, {
        detailedGameId: null,
      }
    );

    this.setState(nextState)
  }

  async componentDidMount() {
    await Font.loadAsync({
      'florentia-extralight': require('./assets/fonts/florentia.extralight.ttf'),
      'arista-pro-extralight': require('./assets/fonts/arista-pro-extralight.ttf'),
      'let-that-be-enough-regular': require('./assets/fonts/let-that-be-enough.regular.ttf'),
    });

    this.setState({ isFontLoaded: true });
  }

  render() {
    const {
      isFontLoaded,
    } = this.state;

    return (isFontLoaded) ?
      (
        <App>
          <Background />
          <GameExplorer
            {...this.state}
            toggleGameDetails={this._toggleGameDetails}
            collapseDetailedGames={this._collapseDetailedGames}
          />
        </App>
      ) : (
        <Expo.AppLoading />
      )
  }
}

const App = styled.View`
  flex: 1;
  flex-direction: row;
`

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

import Background from './background'
import SearchEngine from './search-engine'
import GameList from './game-list'

export default class GameExplorer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      isVisible
    } = this.props;

    return (
      <View
        style={styles.gameExplorer}
      >
        <GameList
          {...this.props}
        />
        <SearchEngine
          {...this.props}
        />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  gameExplorer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft:0,
    paddingRight:0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "transparent",
  },
});

import React from 'react'
import styled from 'styled-components/native'

import Background from './background'
import SearchEngineContainer from '@containers/search-engine'
import GameListContainer from '@containers/games'
import NoGamesYetComponent from './no-games-yet'
export default class GameExplorerComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const hasGameToDisplay = false;

    return (
      <GameExplorer>
        <GameList
          {...this.props}
        />
        <SearchEngine
          {...this.props}
        />
      </GameExplorer>
    )
  }
}

const GameExplorer = styled.View`
  flex: 1;
  padding-vertical: 20;
  padding-horizontal: 0;
  flex-direction: column-reverse;
  justify-content: flex-start;
  align-items: center;
  background-color: transparent;
`;

const SearchEngine = styled(SearchEngineContainer)`
  position: absolute;
`;

const GameList = styled(GameListContainer)`
`;
import React from 'react'
import styled from 'styled-components/native'

import SearchEngineContainer from '@containers/search-engine'
import GameCatalogueContainer from '@containers/game-catalogue'

import { scale } from '@utils/dimension'

export default props => (
  <GameExplorer>
    <GameList
      {...props}
    />
    <SearchEngine
      {...props}
    />
  </GameExplorer>
)

const GameExplorer = styled.View`
  flex: 1;
  padding-top: ${scale(20)};
  padding-horizontal: 0;
  flex-direction: column-reverse;
  justify-content: flex-start;
  align-items: center;
  background-color: transparent;
`

const SearchEngine = styled(SearchEngineContainer)`
  position: absolute;
`

const GameList = styled(GameCatalogueContainer)`
`

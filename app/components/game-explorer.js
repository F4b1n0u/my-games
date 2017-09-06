import React from 'react'
import styled from 'styled-components/native'

import SearchEngineContainer from '@containers/search-engine'
import GameCatalogueContainer from '@containers/game-catalogue'

import { scale } from '@utils/dimension'

export default () => (
  <GameExplorer>
    <GameCatalogue />
    <SearchEngine />
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

const GameCatalogue = styled(GameCatalogueContainer)`
  flex: 1;
  overflow: visible;
  bottom: 0;
  width: 100%;
`

const SearchEngine = styled(SearchEngineContainer)`
  position: absolute;
  top: 25;
  width: 70%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-color: #e3e3e3;
  border-width: 2;
  border-radius: 5;
  background-color: #fafafaf0;
  overflow: hidden;
  padding-vertical: 2;
  padding-horizontal: 2;
`

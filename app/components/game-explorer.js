import React from 'react'
import styled from 'styled-components/native'

import SearchEngineContainer from '@containers/search-engine'
import GameCatalogueComponent from '@components/game-catalogue'
import NoGamesYetComponent from '@components/no-games-yet'
import NoResultsComponent from '@components/no-results'

import { scale } from '@utils/dimension'

export default props => (
  <GameExplorer>
    {
      (props.hasGamesToDisplay || props.isGamePending) ? (
        <GameCatalogue
          {...props}
        />
      ) : (
        (props.isCurrentSearchSubmitted) ? (
          <NoResults />
        ) : (
          <NoGamesYet />
        )
      )
    }

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

const GameCatalogue = styled(GameCatalogueComponent)`
  flex: 1;
  overflow: visible;
  bottom: 0;
  width: 100%;
`

const NoGamesYet = styled(NoGamesYetComponent)`
  top: ${scale(-50)};
`

const NoResults = styled(NoResultsComponent)`
  top: ${scale(-100)};
`

const SearchEngine = styled(SearchEngineContainer)`
  position: absolute;
  top: 25;
  width: 70%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-color: #333333;
  border-width: 1;
  border-radius: 5;
  background-color: #fafafaf0;
  overflow: hidden;
  padding-vertical: 2;
  padding-horizontal: 2;
`

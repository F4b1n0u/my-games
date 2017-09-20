import React from 'react'
import styled from 'styled-components/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import SearchEngineContainer from '#containers/search-engine'
import GameCatalogueComponent from '#components/game-catalogue'
import NoGamesYetComponent from '#components/no-games-yet'
import NoResultsComponent from '#components/no-results'

import { scale, verticalScale } from '#utils/dimension'

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

    {
      props.hasDetailedGame ? (
        null
      ) : (
        <SearchEngine />
      )
    }

    {
      props.hasDetailedGame ? (
        null
      ) : (
        <OwnershipFilterWrapper
          onPress={props.displayOnlyOwnedGame}
        >
          <OwnershipFilterIcon
            isActive={props.isDisplayingOnlyOwnedGames}
          />
          <OwnershipFilterCheck />
        </OwnershipFilterWrapper>
      )
    }
  </GameExplorer>
)

const GameExplorer = styled.View`
  flex: 1;
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
  margin-top: ${props => props.hasDetailedGame ? verticalScale(30) : verticalScale(55)};
`

const NoGamesYet = styled(NoGamesYetComponent)`
  top: ${verticalScale(-50)};
`

const NoResults = styled(NoResultsComponent)`
  top: ${verticalScale(-100)};
`

const SearchEngine = styled(SearchEngineContainer)`
  position: absolute;
  top: ${verticalScale(10)};
  right: ${scale(50)};
  left: ${scale(50)};
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

const OwnershipFilterWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.4,
})`
  position: absolute;
  top: ${verticalScale(12)};
  right: ${scale(2)};
  background-color: transparent;  
  width: ${scale(50)};
  height: ${verticalScale(37)};
  justify-content: center;
  align-items: center;
`

const OwnershipFilterCheck = styled(MaterialCommunityIcons).attrs({
  name: 'check'
})`
  position: absolute;
  top: ${verticalScale(3)};
  right: ${scale(15)};
  font-size: ${scale(20)};
  color: #fafafa;
`

const OwnershipFilterIcon = styled(MaterialCommunityIcons).attrs({
  name: 'bookmark',
})`
  font-size: ${scale(40)};
  color: ${props => props.isActive ? '#eb2b36' : '#333333'};
`

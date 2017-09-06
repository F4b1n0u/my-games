import React from 'react'
import {
  LayoutAnimation,
} from 'react-native'
import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'

import FranchiseList from '@components/franchise-list'

import { scale } from '@utils/dimension'
export default class SearchEngineComponent extends React.Component {
  componentWillReceiveProps() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }

  componentDidUpdate() {
    const {
      hasLoadingGames,
    } = this.props

    const {
      _searchInput,
    } = this

    // not sure why the press on franchise does not blur the input ...
    if (_searchInput && _searchInput.root.isFocused() && hasLoadingGames) {
      _searchInput.root.blur()
    }
  }

  _handleFocus = () => {
    const {
      startSearching,
    } = this.props

    startSearching()
  }

  _handleSubmit = () => {
    const {
      submitSearch,
    } = this.props

    submitSearch()
  }

  _handlePressClearSearch = () => {
    const {
      clearSearch,
    } = this.props

    clearSearch()
  }

  render() {
    const {
      searchText,
      hasDetailedGame,
      updateSearchText,
      isFranchisesPending,
      style,
    } = this.props

    return (!hasDetailedGame) ? (
      <SearchEngine
        style={style}
      >
        <TextInputWrapper>
          {
            isFranchisesPending ? (
              <Spinner />
            ) : (
              null
            )
          }
          <Search
            autoCapitalize="none"
            blurOnSubmit
            keyboardShouldPersistTaps={false}
            placeholder="type a name"
            ref={(ref) => { this._searchInput = ref }}
            selectTextOnFocus
            value={searchText}

            onChangeText={updateSearchText}
            onFocus={this._handleFocus}
            onSubmitEditing={this._handleSubmit}
          />
          {
            searchText ? (
              <ClearSearch
                onPress={this._handlePressClearSearch}
              >
                <ClearSearchIcon />
              </ClearSearch>
            ) : (
              null
            )
          }

        </TextInputWrapper>
        <FranchiseList
          {...this.props}
        />
      </SearchEngine>
    ) : null
  }
}

const SearchEngine = styled.View`
  flex: 1;
`

const ClearSearch = styled.TouchableOpacity.attrs({
  activeOpacity: 0.4,
})`
  position: absolute;
  right: 0;
  height: ${scale(21)};
  width: ${scale(21)};
`

const ClearSearchIcon = styled(MaterialIcons).attrs({
  name: 'delete-forever',
})`
  color: #a3a3a3;
  font-size: ${scale(20)};
`

const TextInputWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  alignItems: center;
`

const Search = styled.TextInput.attrs({
  underlineColorAndroid: 'transparent',
  returnKeyType: 'search',
  autoCapitalize: 'none',
  returnKeyLabel: 'done',
})`
  flex: 1;
  font-family: 'florentia-extralight';
  text-align: center;
  margin-horizontal: 40;
  font-size: ${scale(18)};
`

const Spinner = styled.ActivityIndicator.attrs({
  animating: true,
  size: 'small',
})`
  position: absolute;
  left: 0;
  height: 21;
  width: 21;
`

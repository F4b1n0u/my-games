import React from 'react'
import {
  LayoutAnimation,
} from 'react-native'
import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'

import FranchiseList from '@components/franchise-list'

export default class SearchEngineComponent extends React.Component {
  constructor(props) {
    super(props)

    this._handleFocus = this._handleFocus.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
    this._handlePressClearSearch = this._handlePressClearSearch.bind(this)
  }

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

  _handleFocus() {
    const {
      startSearching,
    } = this.props

    startSearching()
  }

  _handleSubmit() {
    const {
      submitSearch,
    } = this.props

    submitSearch()
  }

  _handlePressClearSearch() {
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
    } = this.props

    return (!hasDetailedGame) ? (
      <SearchEngine>
        <TextInputWrapper>
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
  position: absolute;
  top: 25;
  width: 70%;
  flex-direction:column;
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

const ClearSearch = styled.TouchableOpacity.attrs({
  activeOpacity: 0.4,
})`
  position: absolute;
  right: 0;
  height: 21;
  width: 21;
`

const ClearSearchIcon = styled(MaterialIcons).attrs({
  name: 'delete-forever',
})`
  color: #a3a3a3;
  font-size: 20;
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
`

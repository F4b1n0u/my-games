import React from 'react'
import {
  LayoutAnimation,
} from 'react-native'
import styled from 'styled-components/native'

import FranchiseList from './franchise-list'

export default class SearchEngineComponent extends React.Component {
  constructor(props) {
    super(props)

    this._handleFocus = this._handleFocus.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
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
            blurOnSubmit
            keyboardShouldPersistTaps={false}
            placeholder="type game name here"
            ref={(ref) => { this._searchInput = ref }}
            selectTextOnFocus
            value={searchText}

            onChangeText={updateSearchText}
            onFocus={this._handleFocus}
            onSubmitEditing={this._handleSubmit}
          />
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
  width: 80%;
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
`

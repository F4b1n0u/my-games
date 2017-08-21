import React from 'react';
import {
  LayoutAnimation,
} from 'react-native';
import styled from 'styled-components/native';
import FranchiseList from './franchise-list'

export default class SearchEngineComponent extends React.Component {
  constructor(props) {
    super(props)

    this._handleFocus = this._handleFocus.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  componentWillReceiveProps() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
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
      detailedGameId: hasDetailedGame,
      updateSearchText,
    } = this.props;

    return (!hasDetailedGame) ? (
      <SearchEngine>
        <TextInputWrapper>
          <TextInput
            placeholder='type game name here'
            returnKeyLabel='done'
            selectTextOnFocus={true}
            value={searchText}
            onChangeText={updateSearchText}
            onFocus={this._handleFocus}
            onSubmitEditing={this._handleSubmit}
            blurOnSubmit={true}
          />
        </TextInputWrapper>
        <FranchiseList
          {...this.props}
        />
      </SearchEngine>
    ) : null;
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
  border-width: 3;
  border-radius: 5;
  background-color: #fafafac0;
  overflow: hidden;
  padding-vertical: 2;
  padding-horizontal: 2;
`

const TextInputWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  alignItems: center;
`

const TextInput = styled.TextInput`
  flex: 1;
  font-family: 'florentia-extralight';
  text-align: center;
`
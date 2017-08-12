import React from 'react';
import {
  UIManager,
  LayoutAnimation,
} from 'react-native';
import styled from 'styled-components/native';
import SuggestionList from './suggestion-list'

export default class SearchEngineComponent extends React.Component {
  componentWillReceiveProps() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  render() {
    const {
      search,
    } = this.props;

    return (
      <SearchEngine>
        <TextInputWrapper>
          <TextInput
            placeholder='type game name here'
            value={search}
            returnKeyLabel='done'
            selectTextOnFocus={true}
          />
        </TextInputWrapper>
        <SuggestionList
          {...this.props}
        />
      </SearchEngine>
    );
  }
}

const SearchEngine = styled.View`
  position: absolute;
  top: 25;
  width: 80%;
  height: 35;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  border-color: #e3e3e3;
  border-width: 3;
  border-radius: 5;
  background-color: #fafafac0;
  overflow: hidden;
`

const TextInputWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  alignItems: center;
`

const TextInput = styled.TextInput`
  flex: 1;
  margin-top: 10;
  text-align: center;
`
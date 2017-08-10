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
  background-color: #fafafa;
  overflow: hidden;
`

const TextInputWrapper = styled.View`
  flex-direction: row;
`

const TextInput = styled.TextInput`
  height: 15;
  text-align: center;
`
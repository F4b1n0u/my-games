import React from 'react';
import _ from 'lodash';
import styled from 'styled-components/native';

import Suggestion from './suggestion'

export default class SuggestionListComponent extends React.Component {
  render() {
    const {
      suggestions,
    } = this.props;

    let element;

    if (!_.isEmpty(suggestions)) {
      element = (
        <SuggestionList>
          {suggestions.map(suggestion => {
            <Suggestion
              {...suggestion}
            />
          })}
        </SuggestionList>
      )
    } else {
      element = null;
    }

    return element;
  }
}

const SuggestionList = styled.View`
  margin-vertical: 5;
  justify-content: flex-start;
  flex-direction: row;
`

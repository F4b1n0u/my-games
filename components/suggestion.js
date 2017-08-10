import React from 'react';
import _ from 'lodash';
import styled from 'styled-components/native';

export default class SuggestionComponent extends React.Component {
  render() {
    const {
      name,
      cloudinary,
    } = this.props;

    return (
      <Suggestion
        key={index}
      >
        <Thumbnail
          source={{uri: `https://images.igdb.com/igdb/image/upload/t_micro/${cloudinary}.jpg`}}
        />
        <NameWrapper>
          <Text>
            {name}
          </Text>
        </NameWrapper>
      </Suggestion>
    );
  }
}

const Suggestion = styled.TouchableOpacity`
  padding: 2;
  flexDirection: row;
  justifyContent: flex-start;
  alignItems: center;
`

const Thumbnail = styled.Image`
  height: 15%;
  marginRight: 10;
`

const NameWrapper = styled.Text`
  width: 70%;
`

import React from 'react';
import _ from 'lodash';
import styled from 'styled-components/native';

export default class GameFranchiseComponent extends React.Component {
  render() {
    const {
      name,
      image,
    } = this.props;

    return (
      <Franchise>
        <Thumbnail
          source={{uri: image.thumb_url}}
        />
        <Name>
          {name}
        </Name>
      </Franchise>
    );
  }
}

const Franchise = styled.View`
  flex: 1;
  flexDirection: row;
  justifyContent: flex-start;
  alignItems: center;
`

const Thumbnail = styled.Image`
  height: 35;
  width: 35;
  margin-right: 5;
  border-radius: 2;
`

const Name = styled.Text.attrs({
  numberOfLines: 2,
  ellipsizeMode: 'tail',
})`
  flex: 1;
  font-size: 12;
  text-align: left;
  font-family: 'florentia-extralight';
`

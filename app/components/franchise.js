import React from 'react';
import _ from 'lodash';
import styled from 'styled-components/native';

import ProgressiveImage from './progressive-image'
export default class FranchiseFranchiseComponent extends React.Component {
  render() {
    const {
      name,
      image,
    } = this.props;

    return (
      <Franchise>
        {
          image ? (
            <Thumbnail
              imageSource={{ uri: image.thumb_url }}
            />
          ) : 
          // TODO display a list icon or something
          null
        }
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

const Thumbnail = styled(ProgressiveImage).attrs({
  resizeMode: 'contain',
})`
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
  font-size: 16;
  text-align: left;
  font-family: 'florentia-extralight';
`

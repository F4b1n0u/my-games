import React from 'react';
import styled from 'styled-components/native';

export default class FitImageComponent extends React.Component {
  render() {
    const {
      uri,
      fallbackUri,
      children,
		} = this.props;
    
    return (
      <FallbackImage
        source={{uri: fallbackUri}}
      >
        <Image
          source={{uri,}}
        />
        {children}
      </FallbackImage>
    )
  }
}

const FallbackImage = styled.Image.attrs({
  resizeMode: 'cover',
  blurRadius: 1,
})`
  flex: 1;
`;

const Image = styled.Image.attrs({
  resizeMode: 'contain',
})`
  position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
  background-color: transparent;
  overflow: hidden; 
`;
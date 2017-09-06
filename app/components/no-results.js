import React from 'react'
import styled from 'styled-components/native'

import { scale } from '@utils/dimension'

const arrows = require('../../assets/images/arrows.png')

export default ({style}) => (
  <NoResult
    style={style}
  >
    <Arrows />
    <Instructions>
      {'No result ?!\ntry something else'}
    </Instructions>
  </NoResult>
)

const NoResult = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const Arrows = styled.Image.attrs({
  source: arrows,
  resizeMode: 'contain',
})`
  height: ${scale(150)};
`

const Instructions = styled.Text`
  font-size: ${scale(30)};
  text-align: center;
  font-family: 'florentia-extralight';
`

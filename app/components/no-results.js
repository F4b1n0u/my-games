import React from 'react'
import styled from 'styled-components/native'

import { scale } from '#utils/dimension'

const arrows = require('../../assets/images/arrows.png')

export default ({style}) => (
  <NoResult
    style={style}
  >
    <Instructions>
      {'(｡•́︿•̀｡)\nNo result ?!\n\nmaybe try something else ?!'}
    </Instructions>
  </NoResult>
)

const NoResult = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const Instructions = styled.Text`
  font-size: ${scale(30)};
  text-align: center;
  font-family: 'florentia-extralight';
`

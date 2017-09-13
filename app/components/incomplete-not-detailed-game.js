import React from 'react'
import styled from 'styled-components/native'

import { scale } from '#utils/dimension'

export default ({
  name,
}) => (
  <Game>
    <Name>
      {name}
    </Name>
  </Game>
)

const Game = styled.View`
  flex: 1;
  background-color: transparent;
  border-radius: 5;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`

const Name = styled.Text.attrs({
  numberOfLines: 3,
  ellipsizeMode: 'tail',
})`
  background-color: transparent;
  color: #333333;
  textAlign: center;
  fontSize: ${scale(20)};
  width: 80%;
  font-family: 'florentia-extralight';
`

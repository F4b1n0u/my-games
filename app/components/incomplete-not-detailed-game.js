import React from 'react'
import styled from 'styled-components/native'

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
`

const Name = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  position: absolute;
  top: -14;
  width: 100%;
  background-color: transparent;
  paddingLeft: 2;
  color: black;
  textAlign: left;
  fontSize: 8;
  font-family: 'florentia-extralight';
`

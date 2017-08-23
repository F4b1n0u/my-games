import React from 'react'
import _ from 'lodash'
import styled from 'styled-components/native'
import {
  Animated,
  Easing,
} from 'react-native'
import {
  EvilIcons,
} from '@expo/vector-icons'

import FranchiseComponent from './franchise'

const spinDuration = 3000

export default class FranchiseListComponent extends React.Component {
  constructor(props) {
    super(props)

    this._handlePressItem = this._handlePressItem.bind(this)
  }

  _handlePressItem(item) {
    const {
      selectFranchise,
    } = this.props;

    selectFranchise(item)
  }

  render() {
    const {
      franchises,
      status,
    } = this.props

    let element;

    if (!_.isEmpty(franchises)) {
      element = (
        <FranchiseList>
          {franchises.map((franchise, index) => (
            <TouchableFranchise
              key={franchise.id}
              onPress={this._handlePressItem.bind(this, franchise)}
            >
              <Franchise
                {...franchise}
              />
            </TouchableFranchise>
          ))}
        </FranchiseList>
      )
    } else {
      element = null;
    }

    return element;
  }
}

const FranchiseList = styled.View`
  width: 100%;
  justify-content: flex-start;
  flex-direction: column;
`

const TouchableFranchise = styled.TouchableOpacity`
  flex: 1;
  margin-top: ${props => props.key != 0 ? 2: 0}
`

const Franchise = styled(FranchiseComponent)`
  flex: 1;
  height: 20;
`
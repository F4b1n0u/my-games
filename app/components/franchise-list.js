import React from 'react'
import _ from 'lodash'
import styled from 'styled-components/native'

import FranchiseComponent from '@components/franchise'

export default class FranchiseListComponent extends React.Component {
  _handlePressItem = (item) => {
    const {
      selectFranchise,
    } = this.props

    selectFranchise(item)
  }

  render() {
    const {
      franchises,
    } = this.props

    let element

    if (!_.isEmpty(franchises)) {
      element = (
        <FranchiseList>
          <FranchiseTitle>
            {'Franchises'}
          </FranchiseTitle>
          {franchises.map(franchise => (
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
      element = null
    }

    return element
  }
}

const FranchiseList = styled.View`
  width: 100%;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 10;
`

const FranchiseTitle = styled.Text`
  margin-left: 10;
`

const TouchableFranchise = styled.TouchableOpacity`
  flex: 1;
  margin-top: ${props => props.key !== 0 ? 2 : 0}
`

const Franchise = styled(FranchiseComponent)`
  flex: 1;
  height: 20;
`

import React from 'react'
import _ from 'lodash'
import styled from 'styled-components/native'

import FranchiseComponent from '@components/franchise'

import { scale } from '@utils/dimension'

export default class FranchiseListComponent extends React.Component {
  _handlePressItem = (item) => {
    const {
      selectFranchise,
    } = this.props

    selectFranchise(item)
  }

  _renderFranchiseLabel = () => {
    const {
      franchises
    } = this.props

    let label = 'no franchise found'

    if (!_.isEmpty(franchises)) {
      // TODO when the i18n will be implemented, deal with the plurality in a better way
      if (franchises.length < 2) {
        label = '1 franchise found'
      } else {
        label = `${franchises.length} franchises found`
      }
    }

    return label
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
            {this._renderFranchiseLabel()}
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
  margin-top: ${scale(5)};
`

const FranchiseTitle = styled.Text`
  font-size: ${scale(10)};
  margin-left: ${scale(10)};
`

const TouchableFranchise = styled.TouchableOpacity`
  flex: 1;
  margin-top: ${props => props.key !== 0 ? scale(2) : 0}
`

const Franchise = styled(FranchiseComponent)`
  flex: 1;
  height: ${scale(20)};
`

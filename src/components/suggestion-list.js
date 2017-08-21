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

import GameSuggestionComponent from './game-suggestion'

const spinDuration = 3000

export default class SuggestionListComponent extends React.Component {
  constructor(props) {
    super(props)

    this._handlePressItem = this._handlePressItem.bind(this)
  }

  state = {
    spinValue: new Animated.Value(0),
  }

  componentDidMount() {
    // Animated.loop(
    //   Animated.timing(
    //     this.state.spinValue,
    //     {
    //       toValue: 1,
    //       easing: Easing.linear,
    //       duration: spinDuration,
    //       useNativeDriver: true
    //     }
    //   )
    // ).start(() => {
    //   console.log('spin')
    //   this.setState({
    //     spinValue: new Animated.Value(0),
    //   })
    // })
  }

  _handlePressItem(item) {
    const {
      selectSuggestion,
    } = this.props;

    selectSuggestion(item)
  }

  render() {
    const {
      gameSuggestions,
      status,
    } = this.props

    const {
      spinValue,
    } = this.state

    const spinDegValue = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    let element;

    if (!_.isEmpty(gameSuggestions)) {
      element = (
        <SuggestionList>
          {gameSuggestions.map((gameSuggestion, index) => (
            <TouchableSuggestion
              key={index}
              onPress={this._handlePressItem.bind(this, gameSuggestion)}
            >
              <GameSuggestion
                {...gameSuggestion}
              />
            </TouchableSuggestion>
          ))}
          {status.pending ? (
            <SpinnerWrapper>
              <Animated.View
                style={{transform: [{rotate: spinDegValue}] }}
              >
                <Spinner />
              </Animated.View>
            </SpinnerWrapper>
           ) : null}
        </SuggestionList>
      )
    } else {
      element = null;
    }

    return element;
  }
}

const SuggestionList = styled.View`
  width: 100%;
  justify-content: flex-start;
  flex-direction: column;
`

const SpinnerWrapper = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: transparent;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Spinner = styled(EvilIcons).attrs({
  name: 'spinner-2'
})`
  font-size: 100;
  color: #e3e3e3;
`

const TouchableSuggestion = styled.TouchableOpacity`
  flex: 1;
  margin-top: ${props => props.key != 0 ? 2: 0}
`

const GameSuggestion = styled(GameSuggestionComponent)`
  flex: 1;
  height: 20;
`
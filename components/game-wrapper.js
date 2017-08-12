import React from 'react';
import {
	Animated,
	TouchableOpacity,
	View,
  Easing,
  Text,
} from 'react-native';
import {
	LinearGradient,
} from 'expo';
import styled from 'styled-components/native';

import DetailedGame from './detailed-game'
import NotDetailedGame from './not-detailed-game'

const animationDuration = 500;

export default class GameComponent extends React.Component {
	state = {
    animationProgression: new Animated.Value(0),
    display: 'normal',
	}

  static defaultProps = {
    normalMargin: 10,
    detailedMargin : 5,
  };

  constructor(props) {
    super(props)

    this._handleToggle = this._handleToggle.bind(this)
    this._toggleDetails = this._toggleDetails.bind(this)
  }

  _handleToggle = () => {
    const {
      toggleGameDetails,
    } = this.props;

    toggleGameDetails(this.props);
  }

	_toggleDetails() {
    const {
			isDetailed,
    } = this.props;
    
    const {
      animationProgression,
    } = this.state;
    
    const startValue = isDetailed ? 1 : 0
    const endValue   = isDetailed ? 0 : 1

    animationProgression.setValue(startValue);
    Animated.timing(
      animationProgression,
      {
        easing: Easing.easeInOut,
        duration: animationDuration,
        toValue: endValue,
      }
    ).start();
	}

	componentWillUpdate(nextProps) {
		const {
      isDetailed,
      scrollToMe,
		} = this.props;

		if (nextProps.isDetailed !== isDetailed) {
      this._toggleDetails()
    }

    if (nextProps.isDetailed) {
      scrollToMe()
    }
	}

  componentDidMount() {
    const {
      normalHeight,
      detailedHeight,
      normalMargin,
      detailedMargin,
    } = this.props

    const {
      animationProgression,
    } = this.state

    const heightAnimProgress = animationProgression.interpolate({
      inputRange: [0, 1],
      outputRange: [normalHeight, detailedHeight],
    });

    const marginAnimProgress = animationProgression.interpolate({
      inputRange: [0, 1],
      outputRange: [normalMargin, detailedMargin],
    });

    this.setState({
      heightAnimProgress,
      marginAnimProgress,
    })
  }

	render() {
    const {
      isDetailed,
    } = this.props;

		const {
      heightAnimProgress,
      marginAnimProgress,
		} = this.state

    return (
      <Animated.View
        style={{
          height: heightAnimProgress,
          marginLeft: marginAnimProgress,
          marginRight: marginAnimProgress,
        }}
      >
        <GameWrapper
          activeOpacity={.5}
          onPress={this._handleToggle}
        >
          {(isDetailed) ? (
            <DetailedGame
              {...this.props}
            />
          ) : (
            <NotDetailedGame
              {...this.props}
            />
          )}
        </GameWrapper>
      </Animated.View>
		);
	}
}

const GameWrapper = styled.TouchableOpacity`
  flex: 1;
  margin-bottom: 15;
`

const Game = styled.View`
  flex: 1;
	margin-top: 15;
	border-color: #e3e3e3;
	border-width: 3;
	border-radius: 5;
	background-color: transparent;
	overflow: hidden; // to avoid the image to be on top of the border
`

const Name = styled.Text`
	position: absolute;
	top: 5;
	width: 100%;
	textAlign: left;
	color: black;
	background-color: transparent;
	alignItems: center;
	fontSize: 8;
	paddingLeft: 5;
`

const Cover = styled.Image`
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	background-color: transparent;
`

const Overlay = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  top: 70%;
  bottom: 0;
`

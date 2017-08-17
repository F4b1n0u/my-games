import React from 'react';
import {
  Animated,
  Easing,
  StyleSheet
} from 'react-native';

const backgroundPos = {
  start: {
    x: -1131,
    y: -890,
  },
  end: {
    x: -400,
    y: -305,
  },
}

const animationAccuracy = 1;
const animationDuration = 80000;
const animationStepX = ( backgroundPos.end.x - backgroundPos.start.x ) / animationAccuracy;
const animationStepY = ( backgroundPos.end.y - backgroundPos.start.y ) / animationAccuracy;

const fadeInDuration = 1000;

export default class Background extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fadeIn: new Animated.Value(0),
      animationProgression: new Animated.Value(0),
    }
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeIn,
      {
        toValue: 1,
        easing: Easing.linear,
        duration: fadeInDuration,
        useNativeDriver: true
      }
    ).start();

    Animated.loop(
      Animated.timing(
        this.state.animationProgression,
        {
          toValue: animationAccuracy,
          easing: Easing.linear,
          duration: animationDuration,
          useNativeDriver: true
        }
      )
    ).start(() => {
      this.state = {
        backgroundPosPercent: new Animated.Value(0),
      }
    })
  }
  render() {
    const {
      animationProgression,
      fadeIn,
    } = this.state;

    const backgroundPosX = Animated.add(backgroundPos.start.x, Animated.multiply(animationStepX, animationProgression), )
    const backgroundPosY = Animated.add(backgroundPos.start.y, Animated.multiply(animationStepY, animationProgression), )

    return (
      <Animated.Image
        source={require('../../assets/images/all-games-wallpaper.png')}
        style={[
          styles.background,
          {
            opacity: fadeIn,
            transform: [{
              translateX: backgroundPosX,
            }, {
              translateY: backgroundPosY,
            }],
          },
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
  }
});

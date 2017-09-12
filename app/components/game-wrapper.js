import _ from 'lodash'
import React from 'react'
import { BlurView } from 'expo'
import styled from 'styled-components/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
  Animated,
  Easing,
} from 'react-native'

import CompleteDetailedGame from '#components/complete-detailed-game'
import CompleteNotDetailedGame from '#components/complete-not-detailed-game'
import IncompleteNotDetailedGame from '#components/incomplete-not-detailed-game'

import { cacheImages } from '#utils'
import { scale } from '#utils/dimension'

const animationDuration = 250

export default class GameWrapperComponent extends React.Component {
  state = {
    animationProgression: new Animated.Value(0),
  }

  static defaultProps = {
    normalMargin: scale(10),
    detailedMargin : scale(5),
  };

  componentWillMount() {
    const {
      normalHeight,
      detailedHeight,
      normalMargin,
      detailedMargin,
      requestGamePartialCompletion,
      completionLevel,
      image,
      images = [],
    } = this.props

    const {
      animationProgression,
    } = this.state

    const heightAnimProgress = animationProgression.interpolate({
      inputRange: [0, 1],
      outputRange: [normalHeight, detailedHeight],
    })

    const marginAnimProgress = animationProgression.interpolate({
      inputRange: [0, 1],
      outputRange: [normalMargin, detailedMargin],
    })

    this.setState({
      heightAnimProgress,
      marginAnimProgress,
    })

    if (completionLevel < 2) {
      requestGamePartialCompletion()
    }

    let cachedImages = []

    if (image) {
      cachedImages.push(image)
    }

    if (images) {
      cachedImages = _.concat(cachedImages, images)
    }

    cacheImages(
      cachedImages.reduce(
        (acc, currentImage) => {
          acc.push(currentImage.tiny_url)
          acc.push(currentImage.medium_url)

          return acc
        },
        []
      )
    )
  }

  componentWillUpdate(nextProps) {
    const {
      scrollToMe,
      isDetailed,
    } = this.props;

    if (nextProps.isDetailed !== isDetailed) {
      this._toggleDetails()
    }

    if (nextProps.isDetailed) {
      scrollToMe()
    }
  }

  _toggleDetails = () => {
    const {
      isDetailed,
    } = this.props

    const {
      animationProgression,
    } = this.state

    const startValue = isDetailed ? 1 : 0
    const endValue = isDetailed ? 0 : 1

    animationProgression.setValue(startValue)
    Animated.timing(
      animationProgression,
      {
        easing: Easing.easeInOut,
        duration: animationDuration,
        toValue: endValue,
      }
    ).start()
  }

  shouldComponentUpdate({
    isOwned: nextIsOwned,
    completionLevel: nextCompletionLevel,
    isDetailed: nextIsDetailed,
    platforms: nextPlatforms = [],
  }) {
    const {
      isOwned: currentIsOwned,
      completionLevel: currentCompletionLevel,
      isDetailed: currentIsDetailed,
      platforms: currentPlatforms = [],
    } = this.props
    
    const platformsOwnershipChanged = !_.isEmpty(_.differenceWith(currentPlatforms, nextPlatforms, _.isEqual))

    return (
      currentIsOwned !== nextIsOwned ||
      currentCompletionLevel !== nextCompletionLevel ||
      currentIsDetailed !== nextIsDetailed ||
      platformsOwnershipChanged
    )
  }

  render() {
    const {
      isOwned,
      completionLevel,
      isDetailed,
      showGameDetails,
      hideGameDetails,
      togglePlatformOwnership,
    } = this.props

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
        <GameWrapper>
          {
            (completionLevel < 2) ? (
              <IncompleteNotDetailedGame
                {...this.props}
              />
            ) : (
              (!isDetailed) ? (
                <CompleteNotDetailedGame
                  {...this.props}
                />
              ) : (
                <CompleteDetailedGame
                  {...this.props}
                />
              )
            )
          }
        </GameWrapper>
        {
          isOwned ? (
            <OwnershipMarkerWrapper>
              <OwnershipMarker />
              <OwnershipMarkerCheck />
            </OwnershipMarkerWrapper>
          ) : (
            null
          )
        }
      </Animated.View>
    )
  }
}

const GameWrapper = styled.View`
  flex: 1;
  margin-bottom: ${scale(10)};
  border-color: #333333;
  border-width: 1;
  border-radius: 5;
  overflow: hidden;
`

const OwnershipMarkerWrapper = styled.View`
  position: absolute;
  top: ${scale(-10)};
  right: 0;
  height: ${scale(40)};
  width: ${scale(40)};
`

const OwnershipMarkerCheck = styled(MaterialCommunityIcons).attrs({
  name: 'check'
})`
  position: absolute;
  top: ${scale(7)};
  right: ${scale(11)};
  font-size: ${scale(20)};
  color: #ffffff;
`

const OwnershipMarker = styled(MaterialCommunityIcons).attrs({
  name: 'bookmark'
})`
  font-size: ${scale(40)};
  color: #eb2b36;
`

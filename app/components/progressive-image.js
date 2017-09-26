import React, { Component } from 'react'
import { Animated, View, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default class ProgressiveImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageOpacity: new Animated.Value(0),
      thumbnailOpacity: new Animated.Value(0),
      isLoaded: false,
    }
  }

  onLoadThumbnail() {
    Animated.timing(this.state.thumbnailOpacity, {
      toValue: 1,
      duration: this.props.thumbnailFadeDuration,
    }).start()
    this.props.onLoadThumbnail()
  }

  onLoadImage() {
    Animated.timing(this.state.imageOpacity, {
      toValue: 1,
      duration: this.props.imageFadeDuration,
    }).start(() => this.setState(
      {
        isLoaded: true
      },
      this.props.onLoadImage
    ))
  }

  render() {
    const {
      imageBlurRadius,
      imageSource,
      placeHolderSource,
      resizeMode,
      style,
      thumbnailBlurRadius,
      thumbnailSource,
    } = this.props
    return (
      <View style={style}>
        <Image
          resizeMode={resizeMode}
          style={[styles.image, style]}
          source={placeHolderSource}
        />
        {
          thumbnailSource && !this.state.isLoaded ? (
            <Animated.Image
              resizeMode={resizeMode}
              style={[styles.image, { opacity: this.state.thumbnailOpacity }, style]}
              source={thumbnailSource}
              onLoad={() => this.onLoadThumbnail()}
              blurRadius={thumbnailBlurRadius}
            />
          ) : (
            null
          )
        }
        <Animated.Image
          resizeMode={resizeMode}
          style={[styles.image, { opacity: this.state.imageOpacity }, style]}
          source={imageSource}
          onLoad={() => this.onLoadImage()}
          blurRadius={imageBlurRadius}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
})

ProgressiveImage.propTypes = {
  resizeMode: PropTypes.string,
  imageFadeDuration: PropTypes.number,
  onLoadThumbnail: PropTypes.func,
  onLoadImage: PropTypes.func,
  thumbnailFadeDuration: PropTypes.number,
  thumbnailBlurRadius: PropTypes.number,
}

ProgressiveImage.defaultProps = {
  resizeMode: 'cover',
  thumbnailFadeDuration: 250,
  imageFadeDuration: 250,
  thumbnailBlurRadius: 1,
  onLoadThumbnail: Function.prototype,
  onLoadImage: Function.prototype,
}

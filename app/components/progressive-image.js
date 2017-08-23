import React, { Component, PropTypes } from 'react'
import { Animated, View, Image, StyleSheet } from 'react-native'

export default class ProgressiveImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageOpacity: new Animated.Value(0),
      thumbnailOpacity: new Animated.Value(0),
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
    }).start()
    this.props.onLoadImage()
  }

  render() {
    return (
      <View style={this.props.style}>
        <Image
          resizeMode={this.props.resizeMode}
          style={[styles.image, this.props.style]}
          source={this.props.placeHolderSource}
        />
        {
          this.props.thumbnailSource ? (
            <Animated.Image
              resizeMode={this.props.resizeMode}
              style={[styles.image, { opacity: this.state.thumbnailOpacity }, this.props.style]}
              source={this.props.thumbnailSource}
              onLoad={() => this.onLoadThumbnail()}
              blurRadius={this.props.thumbnailBlurRadius}
            />
          ) : (
            null
          )
        }
        <Animated.Image
          resizeMode={this.props.resizeMode}
          style={[styles.image, { opacity: this.state.imageOpacity }, this.props.style]}
          source={this.props.imageSource}
          onLoad={() => this.onLoadImage()}
          blurRadius={this.props.imageBlurRadius}
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
   },
 })

ProgressiveImage.propTypes = {
  resizeMode: PropTypes.string,
  placeHolderColor: PropTypes.string,
  placeHolderSource: PropTypes.number,
  imageSource: PropTypes.object.isRequired,
  imageFadeDuration: PropTypes.number,
  imageBlurRadius: PropTypes.number,
  onLoadThumbnail: PropTypes.func,
  onLoadImage: PropTypes.func,
  thumbnailSource: PropTypes.object,
  thumbnailFadeDuration: PropTypes.number,
  thumbnailBlurRadius: PropTypes.number,
}

ProgressiveImage.defaultProps = {
  resizeMode: 'cover',
  thumbnailFadeDuration: 250,
  imageFadeDuration: 250,
  thumbnailBlurRadius: 5,
  onLoadThumbnail: Function.prototype,
  onLoadImage: Function.prototype,
}
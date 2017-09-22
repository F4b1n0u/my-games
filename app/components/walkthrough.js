import React from 'react'
import _ from 'lodash'
import styled from 'styled-components/native'
import { LayoutAnimation } from 'react-native'

import { scale, verticalScale } from '#utils/dimension'

import { isWalkthroughNeeded } from '#selectors/walkthrough'

const arrows = require('../../assets/images/arrow.png')

// width 350

export default class CompleteNotDetailedGameComponent extends React.Component {
  state = {
    currentSlideIndex: 0,
  }

  slides = {
    firstLaunch: [{
      description: [
        {
          top: 140,
          left: 0,
          width: 350,
          size: 30,
          content: 'Hi fellow gamer !!\n\nbefore starting, I would like to give you a hug for using my app\n\n(⊃｡•́‿•̀｡)⊃',
        }, {
          top: 550,
          left: 50,
          width: 250,
          size: 15,
          content: 'No worries, that will never happen ever again !\n( ⚆ _ ⚆ )',
        }
      ]
    }, {
      arrow: {
        top: 60,
        left: 140,
        direction: 'up',
      },
      description: {
        top: 140,
        left: 0,
        width: 350,
        size: 30,
        content: 'You will be able to find all your favorites games by typing there names here ...',
      }
    }, {
      arrow: {
        top: 45,
        left: 190,
        direction: 'up-right',
      },
      description: {
        top: 120,
        left: 0,
        width: 220,
        size: 30,
        content: '... But you can as well scan a barcode if you prefer',
      }
    }, {
      description: {
        top: 250,
        left: 0,
        width: 350,
        size: 30,
        content: 'you are all set !\nSo now it\'s time to look for some games !!!\n\nᕕ( ᐛ )ᕗ',
      }
    }],
    firstFranchise: [{
      arrow: {
        top: 50,
        left: 140,
        direction: 'up',
      },
      description: {
        top: 130,
        left: 10,
        width: 330,
        size: 30,
        content: 'Of course as usual, you can submit your keywords to search your game but ...',
      }
    }, {
      arrow: {
        top: 90,
        left: 80,
        direction: 'up-left',
      },
      description: {
        top: 150,
        left: 10,
        width: 330,
        size: 28,
        content: '... you can also choose a franchise based on this keywords which will give you all the games in it',
      }
    }, {
      description: {
        top: 90,
        left: 10,
        width: 330,
        size: 30,
        content: 'It up to you to choose which way is the best for your search\n\n୧ʕ•̀ᴥ•́ʔ୨',
      }
    }],
    firstGame: [{
      arrow: [{
        top: 170,
        left: 60,
        direction: 'up-right',
      }, {
        top: 170,
        left: 220,
        direction: 'up-left',
      }],
      description: {
        top: 250,
        left: 10,
        width: 330,
        size: 30,
        content: 'By touching a game you will be able to see more about it and it\'s also there that you will define on which platform you own it',
      }
    }],
    firstDetailedGame: [{
      arrow: {
        top: 450,
        left: 140,
        direction: 'down',
      },
      description: {
        top: 210,
        left: 10,
        width: 330,
        size: 30,
        content: 'By touching a platform, you will mark it and the game as well of course, as owned...',
      }
    }, {
      arrow: {
        top: 540,
        left: 240,
        direction: 'down-right',
      },
      description: {
        top: 350,
        left: 10,
        width: 330,
        size: 30,
        content: 'You can have access to more information about this game by touching this ',
      }
    }, {
      arrow: {
        top: 540,
        left: 40,
        direction: 'down-left',
      },
      description: {
        top: 440,
        left: 10,
        width: 330,
        size: 30,
        content: 'Touch here to come back to the list',
      }
    }, {
      description: {
        top: 210,
        left: 10,
        width: 330,
        size: 30,
        content: 'Unfortunately, We are not managing the game region ...\n\nYET !!!\n(｡•̀ᴗ-)☆',
      }
    }]
  }

  getSlideContext = () => {
    const {
      isFirstFranchiseNeeded,
      isFirstLaunchNeeded,
      isFirstGameNeeded,
      isFirstDetailedGameNeeded,
    } = this.props

    if (isFirstLaunchNeeded) {
      return 'firstLaunch'
    }

    if (isFirstFranchiseNeeded) {
      return 'firstFranchise'
    }

    if (isFirstGameNeeded) {
      return 'firstGame'
    }

    if (isFirstDetailedGameNeeded) {
      return 'firstDetailedGame'
    }
  }

  getSlide = () => {
    const {
      currentSlideIndex
    } = this.state

    const context = this.getSlideContext()

    return this.slides[context][currentSlideIndex]
  }

  getAcknowlegement = ()  => {
    const context = this.getSlideContext()
    const {
      passFirstLaunch,
      passFirstFranchise,
      passFirstGame,
      passFirstDetailedGame,
    } = this.props

    switch (context) {
      case 'firstLaunch':
        return passFirstLaunch
      case 'firstFranchise':
        return passFirstFranchise
      case 'firstGame':
        return passFirstGame
      case 'firstDetailedGame':
        return passFirstDetailedGame
      default:
        return () => {}
    }
  }

  handleNextSlide = () => {
    const {
      currentSlideIndex
    } = this.state

    const context = this.getSlideContext()

    const nextSlide = this.slides[context][currentSlideIndex + 1]

    if (nextSlide) {
      this.setState({
        currentSlideIndex: currentSlideIndex + 1,
      })
    } else {
      this.setState({
        currentSlideIndex: 0,
      }, () => {
        const acknowlegement = this.getAcknowlegement()
        acknowlegement()
      })
    }

  }

  componentWillUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }

  renderDescription = (slide) => {
    const {
      description = null
    } = slide

    if (!description) {
      return null
    }

    if (_.isArray(description)) {
      return description.map((currentDescription, index) => (
        <Description
          key={`description-${index}`}
          {...currentDescription}
        >
          {currentDescription.content}
        </Description>
      ))
    } else {
      return <Description
        key={`description-0`}
        {...description}
      >
        {description.content}
      </Description>
    }
  }

  renderArrow = (slide) => {
    const {
      arrow = null
    } = slide

    if (!arrow) {
      return null
    }

    if (_.isArray(arrow)) {
      return arrow.map((currentArrow, index) => (
        <Arrow
          key={`arrow-${index}`}
          {...currentArrow}
        >
          {currentArrow.content}
        </Arrow>
      ))
    } else {
      return <Arrow
        key={`arrow-0`}
        {...arrow}
      >
        {arrow.content}
      </Arrow>
    }
  }

  render() {
    const {
      isWalkthroughNeeded,
    } = this.props

    let content = []

    if (isWalkthroughNeeded) {

      const slide = this.getSlide()
      return (
        <Overlay
          onPress={this.handleNextSlide}
        >
          <Slide>
            { this.renderArrow(slide) }
            { this.renderDescription(slide) }
          </Slide>
        </Overlay>
      )
    } else {
      return null
    }
  }
}

const Overlay = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #000000a0;
`

const Slide = styled.View`
  flex: 1;
`

const Arrow = styled.Image.attrs({
  source: arrows,
  resizeMode: 'contain',
  height: undefined,
  width: undefined,
  angle: ({ direction }) => {
    switch (direction) {
      case 'up':
        return 0
      case 'up-right':
        return 45
      case 'right':
        return 90
      case 'down-right':
        return 135
      case 'down':
        return 180
      case 'down-left':
        return 225
      case 'left':
        return 270
      case 'up-left':
        return 315
      default:
        return 0
    }
  }
})`
  position: absolute;
  top: ${props => verticalScale(props.top)};
  left: ${props => scale(props.left)};
  height: ${scale(70)};
  width: ${scale(70)};
  transform: rotate(${props => props.angle}deg);
`

const Description = styled.Text`
  position: absolute;
  text-align: center;
  top: ${props => verticalScale(props.top)};
  left: ${props => scale(props.left)};
  width: ${props => scale(props.width)};
  font-size: ${props => scale(props.size)};
  color: #ffffff;
  font-family: 'florentia-extralight';
  text-align: center;
  padding-horizontal: 10;
  padding-vertical: 10;
`
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
	View,
	Text,
	Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class Platform extends React.Component {
  constructor(props) {
		super(props)
  }

  render() {
    const {
      id,
      abbreviation,
    } = this.props;

		return (
			<View
        key={id}
				style={styles.platform}
			>
        <Ionicons
          style={styles.icon}
          name="ios-game-controller-b-outline"
          size={20}
          color='#fafafa'
        />
        <Text
          style={styles.abbreviation}
        >
          {abbreviation.toLowerCase()}
        </Text>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  platform: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 2,
    height: 30
  },
  icon: {
    opacity: .65,
  },
  abbreviation: {
    backgroundColor: 'transparent',
    color: '#fafafa',
    textShadowRadius: 10,
    fontSize: 10,
	},
});

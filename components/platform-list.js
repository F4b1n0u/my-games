import React from 'react';
import {
	FlatList,
	Image,
	Text,
	View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Platform from './platform';

export default class Game extends React.Component {
  constructor(props) {
		super(props)
  }

	render() {
    const {
			platforms = []
		} = this.props;

    return (
			<View
				style={styles.list}
			>
        {platforms.map(platform =>
          <Platform
            key={platform.id}
            {...platform}
          />
        )}
			</View>
		);
	}
}

const styles = EStyleSheet.create({
  list: {
    position: 'absolute',
    bottom: 0,
    left: 0,
		margin: 10,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
  }
});

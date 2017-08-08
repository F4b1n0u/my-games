import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
	Dimensions,
	FlatList,
	View,
	Text,
	Image,
} from 'react-native';
import {
	LinearGradient,
} from 'expo';
import PlatformList from './platform-list';

const image = require('../assets/images/zelda.png')

export default class Game extends React.Component {
  constructor(props) {
		super(props)
  }

	render() {
		const {
			id,
			name,
		} = this.props;

		return (
			<View
				style={styles.game}
			>
				<Image
					style={styles.cover}
					resizeMode="cover"
					source={image}
				>
					<LinearGradient
						style={styles.overlay}
						colors={['transparent', 'rgba(0,0,0,0.7)']}
					/> 
				</Image>
				<Text
					style={styles.name}
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{name}
				</Text>
				<PlatformList
					{...this.props}
				/>
			</View>
		);
	}
}

var {
	height,
	width,
} = Dimensions.get('window');

const styles = EStyleSheet.create({
  game: {
		flex: 1,
		marginTop: 10,
		height: height / 3,
		borderColor: '#e3e3e3',
		borderWidth: 3,
    borderRadius: 5,
		backgroundColor: '#fafafa',
		overflow: 'hidden', // to avoid the image to be on top of the border
	},
	name: {
		width: '100%',
		textAlign: 'center',
		color: 'black',
		backgroundColor: '#fafafa',
		alignItems: 'center'
	},
	cover: {
		position: 'absolute',
    left: 0,
    right: 0,
		top: 0,
		bottom: 0,
		width: undefined, 	// advised to do so in the image doc section
		height: undefined,
		backgroundColor: 'transparent',
		borderRadius: 5,
  },
  overlay: {
		position: 'absolute',
    left: 0,
    right: 0,
		top: '65%',
		bottom: 0,
  }
});

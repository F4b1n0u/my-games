import React, {
  cloneElement,
} from 'react';
import {
  Button,
  Dimensions,
  Image,
  Text,
  TextInput,
  View,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import _ from 'lodash';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class SearchEngine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
    }
  }

  componentWillReceiveProps() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  renderSuggestions() {
    const {
      suggestions,
    } = this.props;

    let element;

    if (!_.isEmpty(suggestions)) {
      element = (
        <View style={styles.suggestions}>
          {suggestions.map(this.renderSuggestion)}
        </View>
      )
    } else {
      element = null;
    }

    return element;
  }

  renderSuggestion(suggestion, index) {
    const {
      name,
      cloudinary,
    } = suggestion;

    return (
      <View
        key={index}
        style={styles.suggestion}
      >
        <Image
          style={styles.thumbnail}
          source={{uri: `https://images.igdb.com/igdb/image/upload/t_micro/${cloudinary}.jpg`}}
        />
        <View style={styles.name}>
          <Text>
            {name}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    const {
      search,
    } = this.props;

    return (
      <View style={styles.searchEngine} >
        <View style={styles.textInputWrapper} >
          <TextInput
            style={styles.textInput}
            placeholder='type game name here'
            value={search}
            returnKeyLabel='done'
            selectTextOnFocus={true}
          />
        </View>
        {this.renderSuggestions()}
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  $searchEngineWidth:  '100% - 50',
  searchEngine: {
    position: 'absolute',
    top: 25,
    // minus padding
    width: '$searchEngineWidth',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#e3e3e3',
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: '#fafafa',
    overflow: 'hidden', // to hide content durent anim
  },
  textInputWrapper: {
    flexDirection: 'row',
  },
  textInput: {
    // flex: 1,
    height: '2rem',
    textAlign: 'center',
  },
  suggestions: {
    marginTop: 5,
    marginBottom: 5,
    // flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  suggestion: {
    // flex: .01,
    // height: 20,
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  thumbnail: {
    $thumbnailSize: '.15 * $searchEngineWidth',
    height: '$thumbnailSize',
    width: '$thumbnailSize',
    marginRight: 10,
  },
  name: {
    $nameSize: '.7 * $searchEngineWidth',
    width: '$nameSize',
  },
});

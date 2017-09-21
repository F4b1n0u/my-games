import React from 'react'
import { LayoutAnimation } from 'react-native'
import { LinearGradient } from 'expo'
import styled from 'styled-components/native'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

import FranchiseList from '#components/franchise-list'

import { scale, verticalScale } from '#utils/dimension'
export default class SearchEngineComponent extends React.Component {
  componentDidUpdate() {
    const {
      hasLoadingGames,
      isSearching,
    } = this.props

    const {
      _searchInput,
    } = this

    // not sure why the press on franchise does not blur the input ...
    if (isSearching) {
      _searchInput.root.focus()
    } else {
      _searchInput.root.blur()
    }
  }

  _handleFocus = () => {
    const {
      startSearching,
    } = this.props

    startSearching()
  }

  _handleSubmit = () => {
    const {
      submitSearch,
    } = this.props

    submitSearch()
  }

  _handlePressClearSearch = () => {
    const {
      clearSearch,
    } = this.props

    clearSearch()
  }

  _handlePressScan = () => {
    const {
      startScanBarcode,
    } = this.props

    startScanBarcode()
  }

  render() {
    const {
      isFranchisesPending,
      isSearching,
      searchText,
      style,
      updateSearchText,
    } = this.props

    return (
      <Mask>
        <SearchEngine
          style={style}
        >
          <TextInputWrapper>
            {
              isFranchisesPending ? (
                <Spinner />
              ) : (
                null
              )
            }
            <Search
              autoCapitalize="none"
              blurOnSubmit
              keyboardShouldPersistTaps={false}
              placeholder="type a name"
              ref={(ref) => { this._searchInput = ref }}
              value={searchText}
              enablesReturnKeyAutomatically

              onChangeText={updateSearchText}
              onFocus={this._handleFocus}
              onSubmitEditing={this._handleSubmit}
            />
            
            <IconWrapper
              onPress={searchText ? this._handlePressClearSearch : this._handlePressScan}
            >
              {
                (searchText) ? (
                  <ClearSearchIcon />
                ) : (
                  <ScannerIcon />
                )
              }
            </IconWrapper>
          </TextInputWrapper>
          <FranchiseList
            {...this.props}
          />
        </SearchEngine>
      </Mask>
    )
  }
}

const SearchEngine = styled.View`
  flex: 1;
`

const IconWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.4,
})`
  position: absolute;
  top: ${scale(1)};
  right: ${scale(2)};
  height: ${verticalScale(30)};
  width: ${verticalScale(30)};
  justify-content: center;
  align-items: center;
`

const ClearSearchIcon = styled(MaterialIcons).attrs({
  name: 'cancel',
})`
  color: #333333;
  font-size: ${verticalScale(20)};
`

const ScannerIcon = styled(MaterialCommunityIcons).attrs({
  name: 'barcode-scan',
})`
  color: #333333;
  font-size: ${verticalScale(30)};
`

const TextInputWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  alignItems: center;
`

const Search = styled.TextInput.attrs({
  underlineColorAndroid: 'transparent',
  returnKeyType: 'search',
  autoCapitalize: 'none',
  returnKeyLabel: 'done',
})`
  flex: 1;
  font-family: 'florentia-extralight';
  text-align: center;
  margin-horizontal: ${scale(30)};
  font-size: ${verticalScale(24)};
`

const Spinner = styled.ActivityIndicator.attrs({
  animating: true,
  size: 'small',
})`
  position: absolute;
  left: 0;
  height: 21;
  width: 21;
`

const Mask = styled(LinearGradient).attrs({
  colors: ['#fafafad0', '#fafafad0', '#fafafaa0', '#fafafa00'],
})`
  position: absolute;
  top: 0;
  width: 100%;
  height: ${verticalScale(50)};
`

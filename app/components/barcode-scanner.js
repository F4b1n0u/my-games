import React from 'react';
import styled from 'styled-components/native'
import { StyleSheet } from 'react-native';
import { BarCodeScanner as BarCodeScannerComponent, Permissions } from 'expo';
import { MaterialIcons, Ionicons } from '@expo/vector-icons'

import { scale, verticalScale } from '#utils/dimension'

import {
  stopScanBarcode,
  receiveScanResult,
} from '#modules/search-engine'

export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
  }

  async componentWillMount() {
    const {
      status
    } = await Permissions.askAsync(Permissions.CAMERA)

    this.setState({
      hasCameraPermission: status === 'granted'
    })
  }

  render() {
    const {
      stopScanBarcode,
    } = this.props;

    const {
      hasCameraPermission,
    } = this.state;

    if (hasCameraPermission === null) {
      return null;
    } else if (hasCameraPermission === false) {
      stopScanBarcode()
      return null
    } else {
      return (
        <BarCodeScannerWrapper>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
          <Target />
          <Cancel
            onPress={stopScanBarcode}
          >
            <CancelIcon />
          </Cancel>
        </BarCodeScannerWrapper>
      );
    }
  }

  _handleBarCodeRead = ({ type, data }) => {
    const {
      receiveScanResult,
      stopScanBarcode,
    } = this.props

    receiveScanResult(data)
    stopScanBarcode()
  }
}

const BarCodeScannerWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content:  flex-end;
  align-items: center;
  padding-bottom: ${verticalScale(50)};
`

const BarCodeScanner = styled(BarCodeScannerComponent)``

const Target = styled(Ionicons).attrs({
  name: 'ios-qr-scanner-outline'
})`
  color: #ffffff;
  font-size: ${scale(300)};
  align-self: center;
  background-color: transparent;
`

const Cancel = styled.TouchableOpacity.attrs({
  activeOpacity: 0.4,
})`
  justify-content: center;
  align-items: center;
  background-color: transparent;
`

const CancelIcon = styled(MaterialIcons).attrs({
  name: 'cancel',
})`
  color: #ffffff;
  font-size: ${verticalScale(50)};
`
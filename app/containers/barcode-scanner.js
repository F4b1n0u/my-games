import { connect } from 'react-redux'

import BarcodeScanner from '#components/barcode-scanner'

import { stopScanBarcode, receiveScanResult } from '#modules/search-engine'


const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  receiveScanResult: barcode => dispatch(receiveScanResult(barcode)),
  stopScanBarcode: () => dispatch(stopScanBarcode()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BarcodeScanner)

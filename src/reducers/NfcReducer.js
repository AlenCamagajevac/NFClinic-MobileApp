import { 
    NFC_SCAN_STARTED, NFC_SCAN_SUCCESS, NFC_SCAN_FAIL,
} from '../actions/types'; 

const INITIAL_STATE = { 
    nfcTag: null,
    isNfcScanning: 'false',
    nfcScanError: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NFC_SCAN_STARTED:
            return { ...state, isNfcScanning: 'true' };
        case NFC_SCAN_SUCCESS:
            return { ...state, nfcTag: action.payload, nfcScanError: '', isNfcScanning: 'false' };
        case NFC_SCAN_FAIL:
            return { ...state, nfcScanError: action.payload, nfcTag: null, isNfcScanning: 'false' };
        default:
            return state;
    }
};

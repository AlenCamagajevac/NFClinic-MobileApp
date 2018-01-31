import { 
    NFC_SCAN_STARTED,
} from '../actions/types'; 

const INITIAL_STATE = { 
    nfcTag: '',
    isNfcScanning: 'false',
    nfcScanError: ''
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);

    switch (action.type) {
        case NFC_SCAN_STARTED:
            return { ...state, isNfcScanning: 'true' };
        default:
            return state;
    }
};

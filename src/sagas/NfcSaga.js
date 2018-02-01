import { put, takeLatest, all, call } from 'redux-saga/effects';
import NfcManager from 'react-native-nfc-manager';

import { NFC_SCAN_STARTED, NFC_SCAN_FAIL, NFC_SCAN_SUCCESS } from '../actions/types';


function* NfcScanStarted() {
	try {
        const nfcTag = yield call(NfcWaitForTag);
        yield put({ type: NFC_SCAN_SUCCESS, payload: nfcTag.id });
    } catch (error) {
        yield put({ type: NFC_SCAN_FAIL, payload: error });
    }
}

const NfcWaitForTag = () => {
    return new Promise(resolve => {
        NfcManager.registerTagEvent(tag => {
            NfcManager.unregisterTagEvent();
            resolve(tag);
        });
      });
};


// Bootstrap Functions App
export function* nfcSagas() {
	yield all([
		yield takeLatest(NFC_SCAN_STARTED, NfcScanStarted)
	]);	
}

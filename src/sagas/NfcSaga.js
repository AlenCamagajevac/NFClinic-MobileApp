import { put, takeLatest, all, call } from 'redux-saga/effects';
import NfcManager from 'react-native-nfc-manager';
import { Actions } from 'react-native-router-flux';

import { NFC_SCAN_STARTED, NFC_SCAN_FAIL, 
    NFC_SCAN_SUCCESS, NFC_SCAN_ABORTED, PATIENT_GET_BEGIN } from '../actions/types';


function* NfcScanStarted() {
	try {
        Actions.nfcScanForm();
        const nfcTag = yield call(NfcWaitForTag);
        yield put({ type: NFC_SCAN_SUCCESS, payload: nfcTag.id });
        yield put({ type: PATIENT_GET_BEGIN, payload: nfcTag.id });
        Actions.patientProfileForm();   
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

function* NfcScanAborted() {
    try {
        NfcManager.unregisterTagEvent();
        Actions.patientProfileForm();
    } catch (error) {
        yield put({ type: NFC_SCAN_FAIL, payload: error });
    }
}


// Bootstrap Functions App
export function* nfcSagas() {
	yield all([
        yield takeLatest(NFC_SCAN_STARTED, NfcScanStarted),
        yield takeLatest(NFC_SCAN_ABORTED, NfcScanAborted)
	]);	
}

import { put, takeLatest, all } from 'redux-saga/effects';
import { NFC_SCAN_STARTED, NFC_SCAN_FAIL } from '../actions/types';

function* NfcScanStarted() {
	try {
		console.log('eto me');
        yield put({ type: NFC_SCAN_STARTED });
    } catch (e) {
        yield put({ type: NFC_SCAN_FAIL, payload: 'NFC scan could not start' });
    }
}

// Bootstrap Functions App
export function* nfcSagas() {
	yield all([
		yield takeLatest(NFC_SCAN_STARTED, NfcScanStarted)
	]);	
}

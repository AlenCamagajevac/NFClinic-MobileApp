import { put, takeLatest, all, call } from 'redux-saga/effects';
import NfcManager from 'react-native-nfc-manager';
import { Actions } from 'react-native-router-flux';

import { PATIENT_ADD_BEGIN, PATIENT_ADD_ABORT } from '../actions/types';

// Bootstrap Functions App
export function* nfcSagas() {
	yield all([
        yield takeLatest(PATIENT_ADD_BEGIN, PatientAddStarted),
        yield takeLatest(PATIENT_ADD_ABORT, PatientAddAborted)
	]);	
}

import { all } from 'redux-saga/effects';

import { nfcSagas } from './NfcSaga';
import { patientSagas } from './PatientSaga';

export default function* rootSaga() {
	console.log('into root saga');

	yield all([
		nfcSagas(),
		patientSagas()
	]);
}

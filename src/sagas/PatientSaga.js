import { put, takeLatest, all, call } from 'redux-saga/effects';
import axios from 'axios';

import { PATIENT_GET_BEGIN, PATIENT_GET_FAIL, PATIENT_GET_SUCCESS } from '../actions/types';

function* patientFetchStarted(action) {
        try {
                console.log('patient add started', action.payload);
                const patient = yield call(fetchPatientData, action.payload);
                yield put({ type: PATIENT_GET_SUCCESS, payload: patient });
        } catch (error) {
                yield put({ type: PATIENT_GET_FAIL, payload: error.response.status });
        }
}

const fetchPatientData = (cardId) => {
        return axios.get(`http://192.168.5.10:56732/api/patients/card/${cardId}`).then(response => {
                return response.data;
        });          
};

// Bootstrap Functions App
export function* patientSagas() {
	yield all([
        yield takeLatest(PATIENT_GET_BEGIN, patientFetchStarted),
	]);	
}

import { put, takeLatest, all, call } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

import { PATIENT_GET_BEGIN, PATIENT_GET_FAIL, PATIENT_GET_SUCCESS, 
        TIMELINE_EVENT_GET_BEGIN, TIMELINE_EVENT_GET_SUCCESS, 
        TIMELINE_EVENT_GET_FAIL, 
        TIMELINE_EVENT_ADD_BEGIN,
        TIMELINE_EVENT_ADD_SUCCESS,
        TIMELINE_EVENT_ADD_FAIL
} from '../actions/types';

function* patientFetchStarted(action) {
        try {
                const patient = yield call(fetchPatientData, action.payload);
                yield put({ type: PATIENT_GET_SUCCESS, payload: patient });
        } catch (error) {
                yield put({ type: PATIENT_GET_FAIL, payload: error.response.status });
        }
}

function* timelineEventFetchStarted(action) {
        try {
                const timeline = yield call(fetchPatientTimeline, action.payload);
                yield put({ type: TIMELINE_EVENT_GET_SUCCESS, payload: timeline });
        } catch (error) {
                yield put({ type: TIMELINE_EVENT_GET_FAIL, payload: error.response.status });
        }
}

function* timelineEventPostStarted(action) {
        try {
                const createdEvent = yield call(postEvent, action.payload);
                yield put({ type: TIMELINE_EVENT_ADD_SUCCESS, payload: createdEvent });
                Actions.patientProfileForm();
        } catch (error) {
                yield put({ type: TIMELINE_EVENT_ADD_FAIL, payload: error.response.status });
        }
}

const fetchPatientData = (cardId) => {
        return axios.get(`http://192.168.5.10:56732/api/patients/card/${cardId}`).then(response => {
                return response.data;
        });          
};

const fetchPatientTimeline = ({ patientId, page }) => {
        return axios.get(`http://192.168.5.10:56732/api/patients/${patientId}/Timeline?page=${page}`).then(response => {
                return response.data;
        });
};

const postEvent = (eventData) => {
        return axios.post(`http://192.168.5.10:56732/api/patients/${eventData.id}/Timeline/Event`, {
                time: eventData.datetime,
                description: eventData.description,
                name: eventData.title
                }).then(response => {
                        return response.data;
                });
};

// Bootstrap Functions App
export function* patientSagas() {
	yield all([
        yield takeLatest(PATIENT_GET_BEGIN, patientFetchStarted),
        yield takeLatest(TIMELINE_EVENT_GET_BEGIN, timelineEventFetchStarted),
        yield takeLatest(TIMELINE_EVENT_ADD_BEGIN, timelineEventPostStarted)
	]);	
}

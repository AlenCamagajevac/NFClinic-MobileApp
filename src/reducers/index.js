import { combineReducers } from 'redux';
import NfcReducer from './NfcReducer';
import PatientReducer from './PatientReducer';
import TimelineFormReducer from './TimelineFormReducer';
import TimelineReducer from './TimelineReducer';
import PatientFormReducer from './PatientFormReducer';

export default combineReducers({
    nfc: NfcReducer,
    patient: PatientReducer,
    patientForm: PatientFormReducer,
    timelineForm: TimelineFormReducer,
    timeline: TimelineReducer
});

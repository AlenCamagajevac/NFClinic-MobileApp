import { combineReducers } from 'redux';
import NfcReducer from './NfcReducer';
import PatientReducer from './PatientReducer';
import TimelineFormReducer from './TimelineFormReducer';
import TimelineReducer from './TimelineReducer';

export default combineReducers({
    nfc: NfcReducer,
    patient: PatientReducer,
    timelineForm: TimelineFormReducer,
    timeline: TimelineReducer
});

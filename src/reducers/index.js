import { combineReducers } from 'redux';
import NfcReducer from './NfcReducer';
import PatientReducer from './PatientReducer';
import TimelineFormReducer from './TimelineFormReducer';

export default combineReducers({
    nfc: NfcReducer,
    patient: PatientReducer,
    timelineForm: TimelineFormReducer
});

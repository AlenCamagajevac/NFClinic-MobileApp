import { combineReducers } from 'redux';
import NfcReducer from './NfcReducer';
import PatientReducer from './PatientReducer';

export default combineReducers({
    nfc: NfcReducer,
    patient: PatientReducer
});

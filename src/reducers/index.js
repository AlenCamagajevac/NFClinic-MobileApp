import { combineReducers } from 'redux';
import NfcReducer from './NfcReducer';

export default combineReducers({
    nfc: NfcReducer
});

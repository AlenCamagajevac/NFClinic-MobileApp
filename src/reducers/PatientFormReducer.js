import { PATIENT_FORM_UPDATE, PATIENT_ADD_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
    name: '',
    address: '',
    email: '',
    dateOfBirth: new Date(),
    cardId: ''

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PATIENT_FORM_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case PATIENT_ADD_SUCCESS:
            return { ...state, ...INITIAL_STATE };
        default:
            return state;
    }
};

import { PATIENT_FORM_UPDATE } from '../actions/types';

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
        default:
            return state;
    }
};

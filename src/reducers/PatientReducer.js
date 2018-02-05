import { 
    PATIENT_GET_BEGIN, 
    PATIENT_GET_SUCCESS, 
    PATIENT_GET_FAIL 
} from '../actions/types';

const INITIAL_STATE = { 
    patientModel: null,
    patientGetError: '',
    isPatientLoading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PATIENT_GET_BEGIN:
            return { ...state, isPatientLoading: true, patientGetError: '' };
        case PATIENT_GET_SUCCESS:
            return { ...state, patientModel: action.payload, isPatientLoading: false, patientGetError: '' };
        case PATIENT_GET_FAIL:
            return { 
                ...state, 
                patientModel: null, 
                isPatientLoading: false, 
                patientGetError: action.payload, 
            };
        default:
            return state;
    }
};

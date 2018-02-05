import { 
    PATIENT_GET_BEGIN, 
    PATIENT_GET_SUCCESS, 
    PATIENT_GET_FAIL, 
    PATIENT_ADD_SUCCESS,
    PATIENT_ADD_FAIL
} from '../actions/types';

const INITIAL_STATE = { 
    patientModel: null,
    patientGetError: '',
    patientPostError: '',
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
        case PATIENT_ADD_SUCCESS:
            return { ...state, patientModel: action.payload, patientPostError: '' };
        case PATIENT_ADD_FAIL:
            return { ...state, patientPostError: action.payload };
        default:
            return state;
    }
};

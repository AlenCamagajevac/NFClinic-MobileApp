import { PATIENT_GET_BEGIN, PATIENT_GET_SUCCESS, PATIENT_GET_FAIL } from '../actions/types';

const INITIAL_STATE = { 
    patient: null,
    patientTimeline: null,
    patientGetError: '',
    isPatientLoading: false,
    isTimelineLoading: false
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);

    switch (action.type) {
        case PATIENT_GET_BEGIN:
            return { ...state, isPatientLoading: true };
        case PATIENT_GET_SUCCESS:
            return { ...state, patient: action.payload, isPatientLoading: false };
        case PATIENT_GET_FAIL:
            return { ...state, isPatientLoading: false, error: action.payload };
        default:
            return state;
    }
};

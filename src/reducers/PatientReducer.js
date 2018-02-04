import { PATIENT_GET_BEGIN, PATIENT_GET_SUCCESS, PATIENT_GET_FAIL,
    TIMELINE_EVENT_GET_BEGIN, TIMELINE_EVENT_GET_SUCCESS, TIMELINE_EVENT_GET_FAIL } from '../actions/types';

const INITIAL_STATE = { 
    patientModel: null,
    patientTimeline: [],
    patientGetError: '',
    timelineGetError: '',
    isPatientLoading: false,
    isTimelineLoading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PATIENT_GET_BEGIN:
            return { ...state, isPatientLoading: true, patientGetError: '' };
        case PATIENT_GET_SUCCESS:
            return { ...state, patientModel: action.payload, isPatientLoading: false, patientGetError: '', patientTimeline: [] };
        case PATIENT_GET_FAIL:
            return { ...state, patientModel: null, isPatientLoading: false, patientGetError: action.payload, patientTimeline: [], timelineGetError: action.payload };
        case TIMELINE_EVENT_GET_BEGIN:
            return { ...state, isTimelineLoading: true, timelineGetError: '' };
        case TIMELINE_EVENT_GET_SUCCESS:
            return { ...state, patientTimeline: action.payload, isTimelineLoading: false, timelineGetError: '' };
        case TIMELINE_EVENT_GET_FAIL:
            return { ...state, isTimelineLoading: false, timelineGetError: action.payload };
        default:
            return state;
    }
};

import { 
    TIMELINE_EVENT_GET_BEGIN, 
    TIMELINE_EVENT_GET_SUCCESS, 
    TIMELINE_EVENT_GET_FAIL, 
    TIMELINE_EVENT_ADD_SUCCESS,
    PATIENT_GET_FAIL,
    PATIENT_GET_SUCCESS 
} from '../actions/types';

const INITIAL_STATE = { 
    patientTimeline: [],
    timelineGetError: '',
    isTimelineLoading: false,
    pageIndex: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case TIMELINE_EVENT_GET_BEGIN:
            return { ...state, isTimelineLoading: true, timelineGetError: '' };
        case TIMELINE_EVENT_GET_SUCCESS:
            return { 
                ...state, 
                ...action.payload,
                patientTimeline: [...state.patientTimeline, ...action.payload.items], 
                isTimelineLoading: false, 
                timelineGetError: ''
            };
        case TIMELINE_EVENT_GET_FAIL:
            return { ...state, isTimelineLoading: false, timelineGetError: action.payload };
        case TIMELINE_EVENT_ADD_SUCCESS:
            return { ...state, patientTimeline: [...state.patientTimeline, action.payload] };
        case PATIENT_GET_SUCCESS:
            return { ...state, ...INITIAL_STATE };
        case PATIENT_GET_FAIL:
            return { ...state, ...INITIAL_STATE, timelineGetError: action.payload };
        default:
            return state;
    }
};

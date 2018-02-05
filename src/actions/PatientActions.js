import { 
    TIMELINE_EVENT_GET_BEGIN, 
    TIMELINE_EVENT_FORM_UPDATE, 
    TIMELINE_EVENT_ADD_BEGIN,
    PATIENT_FORM_UPDATE, 
    PATIENT_ADD_BEGIN
} from './types';

export const timelineEventFetchStarted = ({ patientId, page }) => {
    return {
        type: TIMELINE_EVENT_GET_BEGIN,
        payload: { patientId, page }
    };
};

export const timelineFormPropUpdate = ({ prop, value }) => {
    return {
        type: TIMELINE_EVENT_FORM_UPDATE,
        payload: { prop, value }
    };
};

export const patientFormPropUpdate = ({ prop, value }) => {
    return {
        type: PATIENT_FORM_UPDATE,
        payload: { prop, value }
    };
};

export const patientCreateStart = ({ name, cardId, address, dateOfBirth, email }) => {
    return {
        type: PATIENT_ADD_BEGIN,
        payload: { name, cardId, address, dateOfBirth, email }
    };
};

export const eventCreateStart = ({ id, datetime, title, description }) => {
    return {
        type: TIMELINE_EVENT_ADD_BEGIN,
        payload: { id, datetime, title, description }
    };
};

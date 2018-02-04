import { TIMELINE_EVENT_GET_BEGIN, TIMELINE_EVENT_FORM_UPDATE, TIMELINE_EVENT_ADD_BEGIN } from './types';

export const timelineEventFetchStarted = (patientId) => {
    return {
        type: TIMELINE_EVENT_GET_BEGIN,
        payload: patientId
    };
};

export const timelineFormPropUpdate = ({ prop, value }) => {
    return {
        type: TIMELINE_EVENT_FORM_UPDATE,
        payload: { prop, value }
    };
};

export const eventCreateStart = ({ id, datetime, title, description }) => {
    return {
        type: TIMELINE_EVENT_ADD_BEGIN,
        payload: { id, datetime, title, description }
    };
};

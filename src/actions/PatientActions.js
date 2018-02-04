import { TIMELINE_EVENT_GET_BEGIN } from './types';

export const timelineEventFetchStarted = (patientId) => {
    return {
        type: TIMELINE_EVENT_GET_BEGIN,
        payload: patientId
    };
};

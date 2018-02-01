import { PATIENT_ADD_BEGIN, PATIENT_ADD_ABORT } from './types';

export const patientAddStarted = () => {
    return {
        type: PATIENT_ADD_BEGIN
    };
};

export const patientAddAborted = () => {
    return {
        type: PATIENT_ADD_ABORT
    };
};

import { TIMELINE_EVENT_FORM_UPDATE } from '../actions/types';

const INITIAL_STATE = {
    title: '',
    description: '',
    datetime: new Date() 
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TIMELINE_EVENT_FORM_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        default:
            return state;
    }
};

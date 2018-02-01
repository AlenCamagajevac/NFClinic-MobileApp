const INITIAL_STATE = { 
    patient: null,
    patientTimeline: null,
    patientGetError: '',
    patientPostError: '',
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);

    switch (action.type) {
        default:
            return state;
    }
};

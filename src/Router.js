import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import PatientProfileForm from './forms/PatientProfileForm';
import NfcScanForm from './forms/NfcScanForm';
import NewPatientForm from './forms/NewPatientForm';
import NewTimelineEventForm from './forms/NewTimelineEventForm';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="profileForm" hideNavBar="true">
                <Scene key="nfcScanForm" component={NfcScanForm} />
                <Scene key="newPatientForm" component={NewPatientForm} />  
                <Scene key="patientProfileForm" component={PatientProfileForm} />  
                <Scene key="newTimelineEventForm" component={NewTimelineEventForm} />             
            </Scene>
        </Router>
    );
};

export default RouterComponent;

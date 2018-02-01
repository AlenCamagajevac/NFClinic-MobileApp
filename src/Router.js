import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import PatientProfileForm from './forms/PatientProfileForm';
import NfcScanForm from './forms/NfcScanForm';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="profileForm" inital hideNavBar="true">
                <Scene key="nfcScanForm" component={NfcScanForm} />
                <Scene key="patientProfileForm" component={PatientProfileForm} />               
            </Scene>
        </Router>
    );
};

export default RouterComponent;

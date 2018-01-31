import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import PatientProfileForm from './forms/PatientProfileForm';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="profileForm" inital hideNavBar="true">
                <Scene key="patientProfileForm" component={PatientProfileForm} />
            </Scene>
        </Router>
    );
};

export default RouterComponent;

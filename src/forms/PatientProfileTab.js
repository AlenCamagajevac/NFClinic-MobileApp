import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Left, List, ListItem, Body, Separator, 
    Icon, Text, Content, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { nfcScanStarted } from '../actions';

class PatientProfileTab extends Component {
    onNfcScanStart() {
        this.props.nfcScanStarted();
    }
    
    render() {
        if (this.props.patientModel === null) {
            return <Spinner />;
        } else if (this.props.isPatientLoading) {
            return <Spinner />;
        } else if (this.props.patientGetError !== '') {
            return (
                <View style={{ paddingTop: 150, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon active name="md-close-circle" />
                    <Text>Please scan another card</Text>
                </View>
            );
        }
        return (
            <Container>
                <Content>
                    <List>
                        <Separator bordered>
                            <Text style={{ fontSize: 14 }}>PERSONAL DATA</Text>
                        </Separator>
                        <ListItem avatar>
                            <Left>
                                <Icon name="md-contact" />
                            </Left>
                            <Body>
                                <Text>Name</Text>
                                <Text note>{this.props.patientModel.name}</Text>
                            </Body>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Icon name="md-sunny" />
                            </Left>
                            <Body>
                                <Text>Date of birth</Text>
                                <Text note>{this.props.patientModel.dateOfBirth}</Text>
                            </Body>
                        </ListItem>
                        <Separator bordered>
                            <Text style={{ fontSize: 14 }}>CONTACT INFO</Text>
                        </Separator>
                        <ListItem avatar>
                            <Left>
                                <Icon name="md-phone-portrait" />
                            </Left>
                            <Body>
                                <Text>Phone number</Text>
                                <Text note>{this.props.patientModel.address}</Text>
                            </Body>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Icon name="md-at" />
                            </Left>
                            <Body>
                                <Text>EMail</Text>
                                <Text note>{this.props.patientModel.email}</Text>
                            </Body>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ patient }) => {
    const { 
        patientModel, 
        patientGetError, 
        isPatientLoading, 
    } = patient;

    return {  
        patientModel,
        patientGetError, 
        isPatientLoading, 
    };
};

export default connect(mapStateToProps, { nfcScanStarted })(PatientProfileTab);

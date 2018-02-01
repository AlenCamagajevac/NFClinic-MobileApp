import React, { Component } from 'react';
import { Container, Header, Left, Body, 
    Button, Icon, Title, Footer, FooterTab, Text, Tab, Tabs } from 'native-base';
import { connect } from 'react-redux';
import PatientProfileTab from './PatientProfileTab';
import PatientTimelineTab from './PatientTimelineTab';
import { nfcScanStarted } from '../actions';

class PatientProfileForm extends Component {
    onNfcScanStart() {
        this.props.nfcScanStarted();
    }
    
    render() {
        return (
            <Container>
                <Header hasTabs>
                    <Left>
                        <Icon name='md-clipboard' />
                    </Left>
                    <Body>
                        <Title>Main menu</Title>
                    </Body>
                </Header>

                <Tabs initialPage={0}>
                    <Tab heading="Patient Profile">
                        <PatientProfileTab />
                    </Tab>
                    <Tab heading="Timeline">
                        <PatientTimelineTab />
                    </Tab>
                </Tabs>

                <Footer>
                    <FooterTab>
                        <Button vertical>
                            <Icon name="md-add" />
                            <Text>Add patient</Text>
                        </Button>
                        <Button vertical onPress={() => this.onNfcScanStart()}>
                            <Icon name="md-wifi" />
                            <Text>Start scan</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const mapStateToProps = ({ nfc }) => {
    const { isNfcScanning, nfcTag, nfcScanError } = nfc;

    return { isNfcScanning, nfcTag, nfcScanError };
};

export default connect(mapStateToProps, { nfcScanStarted })(PatientProfileForm);

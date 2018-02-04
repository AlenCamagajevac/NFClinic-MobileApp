import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Button, Icon, Footer, FooterTab, Text, Content } from 'native-base';
import { connect } from 'react-redux';
import { nfcScanStarted, nfcScanAborted } from '../actions';

class NfcScanForm extends Component {
    onNfcScanStart() {
        this.props.nfcScanStarted();
    }

    onNfcScanStop() {
        this.props.nfcScanAborted();
    }

    renderButton() {
        if (this.props.isNfcScanning === 'true') {
            return (
                <Button vertical active onPress={() => this.onNfcScanStop()}>
                    <Icon active name="md-close" />
                    <Text>Stop scan</Text>
                </Button>
            );
        }

        return (
            <Button vertical active onPress={() => this.onNfcScanStart()}>
                <Icon active name="md-wifi" />
                <Text>Start scan</Text>
            </Button>
        );
    }

    renderGuidelines() {
        if (this.props.isNfcScanning === 'true') {
            return (
                <View style={{ paddingTop: 150, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon active name="md-card" />
                    <Text>Move nfc tag to sensor</Text>
                </View>
            );
        }

        return (
            <View style={{ paddingTop: 150, justifyContent: 'center', alignItems: 'center' }}>
                <Icon active name="md-wifi" />
                <Text>To start scan, press 'Start scanning' button</Text>
            </View>
        );
    }

    renderErrorMessage() {
        return (
            <View>
                <Text>
                    {this.props.nfcScanError}
                </Text>
            </View>
        );
    }
    
    render() {
        return (
            <Container>
                <Content>
                    {this.renderGuidelines()} 
                </Content>         
                <Footer>
                    <FooterTab>
                        {this.renderButton()}
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const mapStateToProps = ({ nfc }) => {
    const { isNfcScanning, nfcScanError } = nfc;

    return { isNfcScanning, nfcScanError };
};

export default connect(mapStateToProps, { nfcScanStarted, nfcScanAborted })(NfcScanForm);

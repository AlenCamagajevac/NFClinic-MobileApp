import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, 
    Button, Icon, Title, Footer, FooterTab, Text, Content } from 'native-base';
import { connect } from 'react-redux';
import { nfcScanStarted } from '../actions';

class PatientProfileForm extends Component {
    onNfcScanStart() {
        console.log('action');
        this.props.nfcScanStarted();
    }

    renderScann() {
        if (this.props.isNfcScanning === 'true') {
            return <Text>I am scanning</Text>;
        }
    }
    
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                        <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Header</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                        <Icon name='menu' />
                        </Button>
                    </Right>
                </Header>

                <Content>
                    <Text>{this.props.isNfcScanning}</Text>
                </Content>

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
                        <Button vertical active>
                            <Icon active name="md-folder-open" />
                            <Text>Add record</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const mapStateToProps = ({ nfc }) => {
    const { isNfcScanning } = nfc;

    return { isNfcScanning };
};

export default connect(mapStateToProps, { nfcScanStarted })(PatientProfileForm);

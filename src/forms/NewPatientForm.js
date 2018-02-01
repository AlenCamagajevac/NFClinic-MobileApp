import React, { Component } from 'react';
import { Container, Header, Left, 
    Button, Icon, Title, Footer, FooterTab, Text, Input, 
    Label, Form, Item, Content, Body } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { nfcScanStarted } from '../actions';

class NewPatientForm extends Component { 
    onBackClick() {
        Actions.patientProfileForm();
    }
    
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.onBackClick()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>New Patient</Title>
                    </Body>
                </Header>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label style={{ paddingTop: 10 }}>Name</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel>
                            <Label style={{ paddingTop: 10 }}>Height</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel>
                            <Label style={{ paddingTop: 10 }}>Email</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel last>
                            <Label style={{ paddingTop: 10 }}>Date of birth</Label>
                            <Input />
                        </Item>
                    </Form>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button vertical>
                            <Icon name="md-add" />
                            <Text>Add patient</Text>
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

export default connect(mapStateToProps, { nfcScanStarted })(NewPatientForm);

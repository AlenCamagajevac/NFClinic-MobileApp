import React, { Component } from 'react';
import { Container, Header, Left, 
    Button, Icon, Title, Footer, FooterTab, Text, Input, 
    Label, Form, Item, Content } from 'native-base';
import { connect } from 'react-redux';
import { nfcScanStarted } from '../actions';

class NewPatientForm extends Component {   
    render() {
        return (
            <Container>
                <Header hasTabs>
                    <Left>
                    <Title>New patient info</Title>
                    </Left>
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

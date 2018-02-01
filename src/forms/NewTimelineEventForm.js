import React, { Component } from 'react';
import { Container, Header, Left, 
    Button, Icon, Title, Footer, FooterTab, Text, Input, 
    Label, Form, Item, Content, Body } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { nfcScanStarted } from '../actions';

class NewTimelineEventForm extends Component {
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
                        <Title>New Event</Title>
                    </Body>
                </Header>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label style={{ paddingTop: 10 }}>Event title</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel>
                            <Label style={{ paddingTop: 10 }}>Event description</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel>
                            <Label style={{ paddingTop: 10 }}>Date</Label>
                            <Input />
                        </Item>
                    </Form>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button vertical>
                            <Icon name="md-add" />
                            <Text>Add event</Text>
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

export default connect(mapStateToProps, { nfcScanStarted })(NewTimelineEventForm);

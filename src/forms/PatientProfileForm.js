import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

class PatientProfileForm extends Component {
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
            </Container>
        );
    }
}

export default PatientProfileForm;
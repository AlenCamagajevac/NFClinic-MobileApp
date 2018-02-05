import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Container, Header, Left, 
    Button, Icon, Title, Footer, FooterTab, Text, Input, 
    Label, Form, Item, Content, Body } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import NfcManager from 'react-native-nfc-manager';
import { patientFormPropUpdate, patientCreateStart } from '../actions';

class NewPatientForm extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false
          };
    }

    componentWillMount() {
        this.startNFCScan();
    }

    componentWillReceiveProps(newProps) {
        console.log('props', newProps);
        if (newProps.patientPostError !== '') {
            this.startNFCScan();
        }
    }

    onShowDateTimePicker() {
        this.setState({ isDateTimePickerVisible: true });
    } 

    onHideDateTimePicker() { 
        this.setState({ isDateTimePickerVisible: false });
    }

    onBackClick() {
        Actions.patientProfileForm();
    }

    onNFCScaned(tag) {
        this.props.patientFormPropUpdate({ prop: 'cardId', value: tag.id });
    }

    onPatientCreateClick() {
        const { name, cardId, address, email, dateOfBirth } = this.props;
        
        if (cardId === '') {
            Alert.alert(
                'No card assigned',
                'Please scan card first to add patient',
                [
                    { text: 'Ok' },
                ],
                { cancelable: false }
            );
            return;
        }

        Moment.locale('hr');
        this.props.patientCreateStart({ 
            name,
            cardId,
            dateOfBirth: Moment(dateOfBirth).format('YYYY-MM-DD'),
            email,
            address
        });
        NfcManager.unregisterTagEvent();
    }

    startNFCScan() {
        NfcManager.registerTagEvent((tag) => this.onNFCScaned(tag));
    }

    handleDatePicked(date) {
        Moment.locale('hr');
        this.props.patientFormPropUpdate({ prop: 'dateOfBirth', value: Moment(date).format('YYYY-MM-DD') }); 
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
                            <Input
                                value={this.props.name}  
                                onChangeText={value => this.props.patientFormPropUpdate({ prop: 'name', value })} 
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label style={{ paddingTop: 10 }}>Address</Label>
                            <Input 
                                value={this.props.address} 
                                onChangeText={value => this.props.patientFormPropUpdate({ prop: 'address', value })} 
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label style={{ paddingTop: 10 }}>Email</Label>
                            <Input 
                                onChangeText={value => this.props.patientFormPropUpdate({ prop: 'email', value })} 
                                value={this.props.email} 
                            />
                        </Item>
                        <View style={{ paddingTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                            <Button transparent primary onPress={this.onShowDateTimePicker.bind(this)}>
                                <Text style={{ fontSize: 14 }}>Date of birth: {Moment(this.props.dateOfBirth).format('YYYY.MM.DD')}</Text>
                            </Button>
                        </View>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked.bind(this)}
                            onCancel={this.onHideDateTimePicker.bind(this)}
                            mode='date'
                        />
                        <View style={{ paddingTop: 20 }}>
                            <Body>
                                <Icon name='md-card' />
                                <Text>Scan NFC card</Text>
                                <Text note>Card will be assigned to user</Text>
                                <Text style={{ paddingTop: 10 }}>{this.props.cardId}</Text>
                            </Body>
                        </View>
                    </Form>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button vertical onPress={this.onPatientCreateClick.bind(this)}>
                            <Icon name="md-add" />
                            <Text>Add patient</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const mapStateToProps = ({ patientForm, patient }) => {
    const { name, address, email, dateOfBirth, cardId } = patientForm;
    const { patientPostError } = patient;

    return { name, address, email, dateOfBirth, cardId, patientPostError };
};

export default connect(
    mapStateToProps, 
    { patientFormPropUpdate, patientCreateStart }
)(NewPatientForm);

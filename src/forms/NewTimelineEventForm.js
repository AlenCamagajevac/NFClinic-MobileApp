import React, { Component } from 'react';
import { Container, Header, Left, 
    Button, Icon, Title, Footer, FooterTab, Text, Input, 
    Label, Form, Item, Content, Body } from 'native-base';
import { View, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import { timelineFormPropUpdate, eventCreateStart } from '../actions';

class NewTimelineEventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false
          };
    }
    
    onBackClick() {
        Actions.patientProfileForm();
    }

    onShowDateTimePicker() {
        this.setState({ isDateTimePickerVisible: true });
    } 

    onHideDateTimePicker() { 
        this.setState({ isDateTimePickerVisible: false });
    }

    
    onEventCreateStartClick() {
        const { datetime, title, description, patientModel } = this.props;
        const { id } = patientModel;
        this.props.eventCreateStart({ id, datetime: Moment(datetime).format('YYYY-MM-DDTHH:mm:00'), title, description });
        Keyboard.dismiss();
    }

    handleDatePicked(date) {
        Moment.locale('hr');
        this.props.timelineFormPropUpdate({ prop: 'datetime', value: Moment(date).format('YYYY-MM-DDTHH:mm:DD') }); 
    }
    
    render() {
        Moment.locale('hr');
        if (this.props.patientModel === null) {
            return (
                <View style={{ paddingTop: 150, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon active name="md-close-circle" />
                    <Text>No patient to add event to</Text>
                </View>
            ); 
        }

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
                            <Input 
                                value={this.props.title} 
                                onChangeText={value => this.props.timelineFormPropUpdate({ prop: 'title', value })}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label style={{ paddingTop: 10 }}>Event description</Label>
                            <Input 
                                value={this.props.description} 
                                onChangeText={value => this.props.timelineFormPropUpdate({ prop: 'description', value })}
                            />
                        </Item>
                        <View style={{ paddingTop: 30 }}>
                            <Button iconLeft transparent primary onPress={this.onShowDateTimePicker.bind(this)}>
                                <Icon name='md-clock' style={{ fontSize: 30 }} />
                                <Text>{Moment(this.props.datetime).format('YYYY.MM.DD, HH:mm')}</Text>
                            </Button>
                        </View>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked.bind(this)}
                            onCancel={this.onHideDateTimePicker.bind(this)}
                            mode='datetime'
                        />
                    </Form>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button vertical onPress={this.onEventCreateStartClick.bind(this)}>
                            <Icon name="md-add" />
                            <Text>Add event</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const mapStateToProps = ({ timelineForm, patient }) => {
    const { title, description, datetime } = timelineForm;
    const { patientModel } = patient;

    return { title, description, datetime, patientModel };
};

export default connect(mapStateToProps, { timelineFormPropUpdate, eventCreateStart })(NewTimelineEventForm);

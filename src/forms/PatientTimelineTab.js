import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Icon, Left, Body, Right, Fab, Spinner, Container, Text, List } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Moment from 'moment';
import { timelineEventFetchStarted } from '../actions';

class PatientTimelineTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
        };
    }

    componentWillMount() {
        this.setState({ 
            dataSource: this.props.patientTimeline
        });

        if (this.props.patientTimeline.length === 0 && this.props.patientModel !== null) {
            this.props.timelineEventFetchStarted(this.props.patientModel.id);
        }
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps.patientTimeline);
        this.setState({ 
            dataSource: newProps.patientTimeline
        });
    }

    onNewTimelineEventClick() {
        Actions.newTimelineEventForm();
    }

    keyExtractor = (item, index) => item.id;

    renderRow(timelineItem) {
        console.log('timeline', timelineItem);
        return (
            <ListItem avatar>
                <Left>
                    <Icon name="md-clipboard" />
                </Left>
                <Body>
                    <Text>{timelineItem.name}</Text>
                    <Text note>{timelineItem.description}</Text>
                </Body>
                <Right style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text note>{Moment(timelineItem.time).format('DD.MM.YYYY')}</Text>
                    <Text note>{Moment(timelineItem.time).format('HH:mm')}</Text>
                </Right>
            </ListItem>
        );
    }

    render() {
        Moment.locale('hr');
        if (this.props.isTimelineLoading) {
            return <Spinner />;
        } else if (this.props.timelineGetError !== '') {
            return (
                <View style={{ paddingTop: 150, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon active name="md-close-circle" />
                    <Text>Error getting timeline</Text>
                </View>
            );
        }

        return (
            <Container style={{ paddingBottom: 20 }}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) => (
                        <ListItem avatar>
                            <Left>
                                <Icon name="md-clipboard" />
                            </Left>
                            <Body>
                                <Text>{item.name}</Text>
                                <Text note>{item.description}</Text>
                            </Body>
                            <Right style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text note>{Moment(item.time).format('DD.MM.YYYY')}</Text>
                                <Text note>{Moment(item.time).format('HH:mm')}</Text>
                            </Right>
                        </ListItem>
                    )}

                    keyExtractor={this.keyExtractor}
                />

                <Fab 
                    style={{ backgroundColor: '#5067FF' }} 
                    position="bottomRight"
                    onPress={() => this.onNewTimelineEventClick()}
                >
                    <Icon name="md-folder-open" />
                </Fab>
          </Container>
        );
    }
}

const mapStateToProps = ({ patient }) => {
    const { patientModel,
        patientTimeline,
        isTimelineLoading,
        timelineGetError, 
    } = patient;

    return { patientModel, patientTimeline, isTimelineLoading, timelineGetError };
};

export default connect(mapStateToProps, { timelineEventFetchStarted })(PatientTimelineTab);

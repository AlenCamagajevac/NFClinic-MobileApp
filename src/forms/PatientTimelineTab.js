import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Icon, Left, Body, Right, Fab, Spinner, Container, Text, Header, Item, Input, Footer } from 'native-base';
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
        this.setState({ 
            dataSource: newProps.patientTimeline
        });
    }

    onNewTimelineEventClick() {
        Actions.newTimelineEventForm();
    }

    keyExtractor = (item, index) => item.id;

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
            <Container style={{ paddingBottom: 5 }}>
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
                    ListHeaderComponent={() => {
                        return (
                        <Header searchBar rounded>
                            <Item>
                                <Icon name="ios-search" />
                                <Input placeholder="Search events" />
                                <Icon name="md-clipboard" />
                            </Item>
                        </Header>
                        );
                    }}
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
    console.log('props', patient);
    const { patientModel,
        patientTimeline,
        isTimelineLoading,
        timelineGetError, 
    } = patient;

    return { patientModel, patientTimeline, isTimelineLoading, timelineGetError };
};

export default connect(mapStateToProps, { timelineEventFetchStarted })(PatientTimelineTab);

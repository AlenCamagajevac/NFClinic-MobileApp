import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Icon, Left, Body, Right, Fab, Spinner, 
    Container, Text, Header, Item, Input } from 'native-base';
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
            this.props.timelineEventFetchStarted({ patientId: this.props.patientModel.id, page: this.props.pageIndex + 1 });
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({ 
            dataSource: newProps.patientTimeline,
        });
    }

    onNewTimelineEventClick() {
        Actions.newTimelineEventForm();
    }

    onTimelineEndReached() {
        console.log('reached');
        if (this.props.hasNextPage) {
            this.props.timelineEventFetchStarted({ patientId: this.props.patientModel.id, page: this.props.pageIndex + 1 });
        }
    }

    keyExtractor = (item, index) => item.id;

    renderListFooter() {
        if (!this.props.isTimelineLoading) {
             return null;
        }

        return (
            <View>
                <Spinner />
            </View>
        );
    }

    renderListHeader() {
        return (
            <Header searchBar rounded>
                <Item>
                    <Icon name="ios-search" />
                    <Input placeholder="Search events" />
                    <Icon name="md-clipboard" />
                </Item>
            </Header>
        );
    }

    render() {
        Moment.locale('hr');
        if (this.props.timelineGetError !== '') {
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
                    ListHeaderComponent={this.renderListHeader.bind(this)}
                    ListFooterComponent={this.renderListFooter.bind(this)}
                    keyExtractor={this.keyExtractor}
                    onEndReachedThreshold={1}
                    onEndReached={this.onTimelineEndReached.bind(this)}
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

const mapStateToProps = ({ patient, timeline }) => {
    const { patientModel } = patient;
    const { 
        patientTimeline,
        timelineGetError, 
        isTimelineLoading,
        pageIndex,
        totalPages,
        hasPreviousPage,
        hasNextPage
    } = timeline;

    return { 
        patientModel, 
        patientTimeline, 
        isTimelineLoading, 
        timelineGetError,
        pageIndex,
        totalPages,
        hasPreviousPage,
        hasNextPage    
    };
};

export default connect(mapStateToProps, { timelineEventFetchStarted })(PatientTimelineTab);

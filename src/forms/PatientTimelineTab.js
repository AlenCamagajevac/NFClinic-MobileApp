import React, { Component } from 'react';
import { ListView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Icon, Left, Body, Right, Fab, Spinner, Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { timelineEventFetchStarted } from '../actions';

class PatientTimelineTab extends Component {
    constructor(props) {
        super(props);
        const ds = this.getDatasource();
        this.state = {
            dataSource: ds.cloneWithRows([{}]),
        };
    }

    componentWillMount() {
        this.setState({ 
            dataSource: this.getDatasource().cloneWithRows(this.props.patientTimeline) 
        });

        if (this.props.patientModel !== null) {
            console.log('start');
            this.props.timelineEventFetchStarted(this.props.patientModel.id);
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({ 
            dataSource: this.getDatasource().cloneWithRows(newProps.patientTimeline) 
        });
    }

    onNewTimelineEventClick() {
        Actions.newTimelineEventForm();
    }

    getDatasource() {
        return new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    }

    renderRow(timelineItem) {
        return (
            <ListItem avatar>
                <Left>
                    <Icon name="md-arrow-round-forward" />
                </Left>
                <Body>
                    <Text>{timelineItem.name}</Text>
                    <Text note>{timelineItem.description}</Text>
                </Body>
                <Right style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text note>{timelineItem.time}</Text>
                </Right>
            </ListItem>
        );
    }

    render() {
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
            <Container>
                <ListView
                    style={{ padding: 15 }}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
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

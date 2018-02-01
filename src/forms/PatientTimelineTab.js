import React, { Component } from 'react';
import { ListView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Icon, Left, Body, Right, Fab } from 'native-base';
import { nfcScanStarted } from '../actions';

const data = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Nathaniel Clyne',
    'Dejan Lovren',
    'Mama Sakho',
    'Alberto Moreno',
    'Emre Can',
    'Joe Allen',
    'Phil Coutinho',
  ];

class PatientTimelineTab extends Component {
    componentWillMount() {
        const ds = new ListView.DataSource({ 
            rowHasChanged: (r1, r2) => r1 !== r2
         });

        this.dataSource = ds.cloneWithRows(data);
    }

    renderRow(dataItem) {
        return (
            <ListItem avatar>
                <Left>
                    <Icon name="md-arrow-round-forward" />
                </Left>
                <Body>
                    <Text>{dataItem}</Text>
                    <Text note>Pacijent se žali na bolove u trbuhu</Text>
                </Body>
                <Right style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text note>12.3.2018 13:43</Text>
                </Right>
            </ListItem>
        );
    }

    render() {
        return (
            <View>
                <ListView
                    style={{ padding: 15 }}
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />

                <Fab 
                    style={{ backgroundColor: '#5067FF' }} 
                    position="bottomRight"
                >
                    <Icon name="md-folder-open" />
                </Fab>
          </View>
        );
    }
}

const mapStateToProps = ({ nfc }) => {
    const { isNfcScanning, nfcTag, nfcScanError } = nfc;

    return { isNfcScanning, nfcTag, nfcScanError };
};

export default connect(mapStateToProps, { nfcScanStarted })(PatientTimelineTab);

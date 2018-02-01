import React, { Component } from 'react';
import { Container, Left, List, ListItem, Body, Separator, Icon, Text, Content } from 'native-base';
import { connect } from 'react-redux';
import { nfcScanStarted } from '../actions';

class PatientProfileTab extends Component {
    onNfcScanStart() {
        this.props.nfcScanStarted();
    }
    
    render() {
        return (
            <Container>
                <Content>
                    <List>
                        <Separator bordered>
                            <Text style={{ fontSize: 14 }}>PERSONAL DATA</Text>
                        </Separator>
                        <ListItem avatar>
                            <Left>
                                <Icon name="md-contact" />
                            </Left>
                            <Body>
                                <Text>Name</Text>
                                <Text note>Alen Camagajevac</Text>
                            </Body>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Icon name="md-sunny" />
                            </Left>
                            <Body>
                                <Text>Date of birth</Text>
                                <Text note>13.02.1995</Text>
                            </Body>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Icon name="md-man" />
                            </Left>
                            <Body>
                                <Text>Height</Text>
                                <Text note>186cm</Text>
                            </Body>
                        </ListItem>
                        <Separator bordered>
                            <Text style={{ fontSize: 14 }}>CONTACT INFO</Text>
                        </Separator>
                        <ListItem avatar>
                            <Left>
                                <Icon name="md-phone-portrait" />
                            </Left>
                            <Body>
                                <Text>Phone number</Text>
                                <Text note>031/1234 56 78</Text>
                            </Body>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Icon name="md-at" />
                            </Left>
                            <Body>
                                <Text>EMail</Text>
                                <Text note>alen.camagajevac@gmail.com</Text>
                            </Body>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ nfc }) => {
    const { isNfcScanning, nfcTag, nfcScanError } = nfc;

    return { isNfcScanning, nfcTag, nfcScanError };
};

export default connect(mapStateToProps, { nfcScanStarted })(PatientProfileTab);

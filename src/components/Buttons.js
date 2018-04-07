import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addCharacter, changeUser} from '../actions';
import firebase from 'firebase';
import {Button, Col, Row} from 'reactstrap';

class Buttons extends React.Component {

    handleClick = () => {
        firebase.auth().signOut()
            .then(() => {
                this.props.changeUser(null);
            });
    };

    handleDonate = () => {
        window.open('https://paypal.me/SkyJedi');
    };

    render() {
        return (
            <Row className='justify-content-end align-items-center d-print-none'>
                <Col sm='auto'>
                    <Button size='sm' onClick={this.handleDonate}>Donate</Button>
                    {' '}
                    <Button size='sm' onClick={this.handleClick}>Sign Out</Button>
                </Col>
            </Row>

        );
    }
}

function mapStateToProps(state) {
    return {
        channel: state.channel,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeUser, addCharacter}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Buttons);

import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Row} from 'reactstrap';
import firebase from '@firebase/app';
import '@firebase/auth';
import {About} from './index';

export default class User extends Component {

    handleClick = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    };

    render() {
        return (
            <div>
                <Container className='container-fluid my-4'>
                    <Row className='justify-content-center'>
                        <h1>The Emporium</h1>
                    </Row>
                    <Row className='justify-content-center'>
                        <h2>Genesys Character Creator</h2>
                    </Row>
                    <Row className='justify-content-center my-4'>
                        <img src={`/images/favicon.png`} alt='' style={{maxHeight: '150px'}}/>
                    </Row>
                    <Row className='justify-content-center my-2'>
                        <ButtonGroup>
                            <Button outline color='white' onClick={this.handleClick}>
                                <img src={'/images/png/google-logo.png'} alt='' style={{maxHeight: '20px'}}/>
                            </Button>
                            <Button color='primary' onClick={this.handleClick}>Sign In with Google</Button>
                        </ButtonGroup>
                    </Row>
                    <Row className='justify-content-center'>
                        <About/>
                    </Row>
                </Container>
            </div>
        );
    }
}


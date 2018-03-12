import React from 'react';
import {Button, Container, Row} from 'reactstrap';


const About = () => {
    return (
        <Container>
            <Row className='justify-content-center my-2'>Created by SkyJedi</Row>
            <Row className='justify-content-center my-2'>Questions? Comments?&nbsp; <a
                href="mailto:info@genesysemporium.com?subject=Genesys%20Emporium%20Feedback" target="_blank"
                rel="noopener noreferrer">Contact Me</a></Row>
            <Row className='justify-content-center my-2' style={{fontSize: 'smaller'}}>Images by&nbsp; <a
                href="https://www.reddit.com/user/DrainSmith" target="_blank"
                rel="noopener noreferrer">DrainSmith</a></Row>
            <Row className='justify-content-center my-2'>A Character Creator for&nbsp;<a
                href='http://fantasyflightgames.com/' target="_blank" rel="noopener noreferrer">Fantasy Flight
                Games</a>,&nbsp;<a href='https://www.fantasyflightgames.com/en/products/genesys/' target="_blank"
                                   rel="noopener noreferrer">Genesys</a></Row>
            <Row className='justify-content-center my-2'><Button color='link' href="https://paypal.me/SkyJedi"
                                                                 target="_blank">Donate</Button></Row>
        </Container>
    )
};
export default About;

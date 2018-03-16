import React from 'react';
import {Button, Row} from 'reactstrap';


const About = () => {
    return (
        <div style={{marginBottom: '5rem'}} className='d-print-none'>
            <Row>
                Created by SkyJedi. Questions? Comments?&nbsp;
                <a href="mailto:info@genesysemporium.com?subject=Genesys%20Emporium%20Feedback" target="_blank"
                   rel="noopener noreferrer">Contact Me</a>.&nbsp;
                <Button color='link' href="https://paypal.me/SkyJedi" target="_blank" className='p-0'>Donate</Button>
            </Row>
            <Row>
                Images by&nbsp; <a href="https://www.reddit.com/user/DrainSmith" target="_blank"
                                   rel="noopener noreferrer">DrainSmith</a>.&nbsp;
            </Row>
            <Row>
                A Character Creator for&nbsp;
                <a href='http://fantasyflightgames.com/' target="_blank" rel="noopener noreferrer">Fantasy Flight
                    Games</a>,&nbsp;
                <a href='https://www.fantasyflightgames.com/en/products/genesys/' target="_blank"
                   rel="noopener noreferrer">Genesys</a>.
            </Row>
        </div>
    )
};
export default About;

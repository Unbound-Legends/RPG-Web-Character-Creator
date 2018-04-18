import React from 'react';
import {CustomSkills, SkillBlock} from './index';
import {connect} from "react-redux";
import {Col, Row} from 'reactstrap';

class Skill extends React.Component {
    state = {modal: false};

    render() {
        return (
            <Col xl='12'>
                <Row className='justify-content-end' onClick={() => this.setState({modal: true})}><h5>SKILLS</h5></Row>
                <hr/>
                <Row>
                    <Col>
                        {['General', 'Magic'].map((type, index) =>
                            <SkillBlock key={type}
                                        type={type}
                                        index={index}/>
                        )}
                    </Col>
                    <Col>
                        {['Combat', 'Social', 'Knowledge'].map((type, index) =>
                            <SkillBlock key={type}
                                        type={type}
                                        index={index}/>
                        )}
                    </Col>
                </Row>

                <CustomSkills modal={this.state.modal} handleClose={() => this.setState({modal: false})}/>

            </Col>
        )
    }
}

function mapStateToProps(state) {
    return {
        customSkills: state.customSkills,
    };
}

export default connect(mapStateToProps)(Skill);
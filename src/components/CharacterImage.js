import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import {changeData} from '../actions';

class CharacterImage extends React.Component {
    state = {modal: false, text: this.props.description.image};

    handleChange = (event) => {
        this.setState({text: event.target.value});
        event.preventDefault();
    };

    handleBlur = (event) => {
        const {changeData, description} = this.props;
        let obj = {...description};
        obj.image = this.state.text;
        changeData(obj, 'description');
        event.preventDefault();
    };

    render() {
        const {description} = this.props;
        const {modal, text} = this.state;
        return (
            <Col className='align-items-center m-auto'>
                <img className='img-fluid' src={description.image ? description.image : ''}
                     onClick={() => this.setState({modal: true})}
                     alt='not found' ref={img => this.img = img} onError={() => this.img.src = 'images/png/Crest.png'}/>
                <Modal isOpen={modal !== false} toggle={() => this.setState({modal: false})}>
                    <ModalHeader toggle={() => this.setState({modal: false})}>Edit Character Image</ModalHeader>
                    <ModalBody className='m-3'>
                        <div>
                            <Row>CHARACTER IMAGE URL:</Row>
                            <Input type='text' value={text} onBlur={this.handleBlur} onChange={this.handleChange}/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => this.setState({modal: false})}>Close</Button>
                    </ModalFooter>
                </Modal>
            </Col>

        );
    }
}

function mapStateToProps(state) {
    return {
        description: state.description,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CharacterImage);
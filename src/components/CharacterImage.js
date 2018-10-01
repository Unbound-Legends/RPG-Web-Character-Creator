import React from 'react';
import {connect} from 'react-redux';
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import * as images from '../images';

class CharacterImageComponent extends React.Component {
	state = {modal: false, text: this.props.description.image};

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
			<div className='align-items-center m-auto'>
				<Row className='justify-content-end'>
					<h5>CHARACTER IMAGE</h5>
					<Button color='link'
							className='noUnderLine p-0'
							onClick={() => this.setState({modal: true})}>⚙</Button></Row>
				<Row className='justify-content-center'>
					<img className='img-fluid w-100 h-100' style={{maxWidth: 'unset'}}
						 src={description.image ? description.image : ''}
						 alt='not found' ref={img => this.img = img}
						 onError={() => this.img.src = images.Crest}/>
				</Row>
				<Modal isOpen={modal !== false} toggle={() => this.setState({modal: false})}>
					<ModalHeader toggle={() => this.setState({modal: false})}>Edit Character Image</ModalHeader>
					<ModalBody className='m-3'>
						<div>
							<Row>CHARACTER IMAGE URL:</Row>
							<Input type='text' value={text} onBlur={this.handleBlur} onChange={(event) => this.setState({text: event.target.value})}/>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button onClick={() => this.setState({modal: false})}>Close</Button>
					</ModalFooter>
				</Modal>
			</div>

		);
	}
}

const mapStateToProps = state => {
	return {
		description: state.description,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({changeData}, dispatch);

export const CharacterImage = connect(mapStateToProps, matchDispatchToProps)(CharacterImageComponent);
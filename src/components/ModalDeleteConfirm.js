import React from 'react';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

class ModalDeleteConfirmComponent extends React.Component {

	render() {
		const {deleteModal, confirmedDelete, handleClose, type, theme} = this.props;
		return (
			<Modal className={`body-${theme}`} isOpen={deleteModal} toggle={handleClose}>
				<ModalHeader>BALETEED WARNING</ModalHeader>
				<ModalBody>
					Are you super serious? This cannot be undone!
				</ModalBody>
				<ModalFooter>
					<ButtonGroup>
						<Button onClick={handleClose}>NO!</Button>
						<Button color='danger' onClick={confirmedDelete}>{`YES! I no longer want this
                            ${type}!`}</Button>
					</ButtonGroup>
				</ModalFooter>
			</Modal>
		)
	}
}

const mapStateToProps = state => {
	return {
		theme: state.theme,
	};
};

export const ModalDeleteConfirm = connect(mapStateToProps)(ModalDeleteConfirmComponent);
import React from 'react';
import {Button, ButtonGroup, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

export const ModalDeleteConfirm = ({deleteModal, confirmedDelete, handleClose, type}) => {
	return (
		<Modal isOpen={deleteModal} toggle={handleClose}>
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
};
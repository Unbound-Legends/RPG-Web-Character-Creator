import React from 'react';
import {Button, ButtonGroup, Row} from 'reactstrap';

export const ControlButtonSet = ({mode, type, handleSubmit, onEditSubmit, onEditCancel}) => {
    switch (mode) {
        case 'add':
            return (
                <Row className='justify-content-end my-1'>
                    <Button onClick={handleSubmit}>Add {type.toString().slice(6)}</Button>
                </Row>
            );
        case 'edit':
            return (
                <Row className='justify-content-end my-1'>
                    <ButtonGroup>
                        <Button onClick={onEditSubmit} className='btn btn-success'>Submit Changes</Button>
                        <Button onClick={onEditCancel} className='btn btn-warning'>Cancel</Button>
                    </ButtonGroup>
                </Row>
            );
        default:
            throw new Error("Did not send valid mode to ControlButtonSet.js")
    }
};
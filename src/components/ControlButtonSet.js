import React from 'react';
import {Button, Row} from 'reactstrap';

export const ControlButtonSet = ({mode, type, handleSubmit, onEditSubmit, onEditCancel}) => {
    switch (mode) {
        case 'add':
            return (
                <Row className='justify-content-end'>
                    <Button onClick={handleSubmit}>Add {type.toString().slice(6)}</Button>
                </Row>
            )
        case 'edit': 
            return (
                <Row className='justify-content-end'>
                    <Button onClick={onEditSubmit} className="button-success">Submit Changes</Button>
                    <Button onClick={onEditCancel} className="button-cancel">Cancel</Button>
                </Row>
            )
        default:
            throw new Error("Did not send valid mode to ControlButtonSet.js")
    }
}
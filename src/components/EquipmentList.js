import React from 'react';
import {connect} from 'react-redux';
import {getEquipment} from '../reducers';
import {Table, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';

class EquipmentList extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            modalOpen: !!props.type,
            modalType: props.type
        }

        this.handleUseClick = this.handleUseClick.bind(this)
        this.generateEquipmentTableHeader = this.generateEquipmentTableHeader.bind(this)
        this.generateEquipmentTableBody = this.generateEquipmentTableBody.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({modalOpen: !!nextProps.type, modalType: nextProps.type})
    }

    handleUseClick = (key, e) => {
        this.props.changeData(
            {[key]: this.props.equipment[key]},
            this.state.modalType
        )
        e.preventDefault()
    }

    toggle() {
        this.setState({modalOpen: !this.state.modalOpen})
    }

    generateEquipmentTableHeader = (type) => {
        switch (type) {
            case "weapons": 
                return (
                    <thead>
                    <tr>
                        <th>Use?</th>
                        <th>Name</th>
                        <th>Skill</th>
                        <th>Book</th>
                        <th>Setting</th>
                    </tr>
                    </thead>
                )
            case "armor":
                return (
                    <thead>
                    <tr>
                        <th>Use?</th>
                        <th>Name</th>
                        <th>Soak</th>
                        <th>Defense</th>
                        <th>Book</th>
                        <th>Setting</th>
                    </tr>
                    </thead>
                )
            
            case "gear":
                return (
                    <thead>
                        <th>Use?</th>
                        <th>Name</th>
                        <th>Encumbrace</th>
                        <th>Book</th>
                        <th>Setting</th>
                    </thead>
                )
        }
    }

    generateEquipmentTableBody = (equipment, type) => {
        switch (type) {
            case "weapons":
                return (
                    <tbody>
                        {Object.keys(equipment).map((piece,i) => {
                            let item = equipment[piece]
                            return (
                                <tr key={i}>
                                    <td>   
                                    {
                                        <Button color='secondary' onClick={(e) => {this.handleUseClick(piece, e)}} >
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                width="12" 
                                                height="12" 
                                                viewBox="0 0 24 24"
                                                className='plus-icon'>
                                                    <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>
                                            </svg>
                                        </Button>
                                    }
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.skill}</td>
                                    <td>{item.book}</td>
                                    <td>{item.setting}</td>
                                </tr>
                            )
                        })}
                </tbody>
            )

            case "armor":
                return (
                    <tbody>
                        {Object.keys(equipment).map((piece,i) => {
                            let item = equipment[piece]
                            return (
                                <tr key={i}>
                                    <td>   
                                    {
                                        <Button color='secondary' onClick={(e) => {this.handleUseClick(piece, e)}} >
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                width="12" 
                                                height="12" 
                                                viewBox="0 0 24 24"
                                                className='plus-icon'>
                                                    <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>
                                            </svg>
                                        </Button>
                                    }
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.encumbrance}</td>
                                    <td>{item.book}</td>
                                    <td>{item.setting}</td>
                                </tr>
                            )
                        })}
                </tbody>
            )

            case "gear":
                return (
                    <tbody>
                        {Object.keys(equipment).map((piece,i) => {
                            let item = equipment[piece]
                            return (
                                <tr key={i}>
                                    <td>   
                                    {
                                        <Button color='secondary' onClick={(e) => {this.handleUseClick(piece, e)}} >
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                width="12" 
                                                height="12" 
                                                viewBox="0 0 24 24"
                                                className='plus-icon'>
                                                    <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>
                                            </svg>
                                        </Button>
                                    }
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.soak}</td>
                                    <td>{item.defense}</td>
                                    <td>{item.book}</td>
                                    <td>{item.setting}</td>
                                </tr>
                            )
                        })}
                </tbody>
            )
        }
    }

    render() {
        return (
            <Modal isOpen={this.state.modalOpen} backdrop={true} toggle={this.toggle}>
                <ModalHeader>Equipment</ModalHeader>
                <ModalBody>
                    <Table>
                        {this.generateEquipmentTableHeader(this.state.modalType)}
                        {this.generateEquipmentTableBody(this.props.equipment, this.state.modalType)}
                   </Table>
                </ModalBody>
            </Modal>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        equipment: getEquipment(state, ownProps)
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(EquipmentList);
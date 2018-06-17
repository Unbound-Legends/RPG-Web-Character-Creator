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
            modal: props.type
        }

        this.handleUseClick = this.handleUseClick.bind(this)
        this.generateEquipmentTable = this.generateEquipmentTable.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({modal: nextProps.type})
    }

    handleUseClick = (key, e) => {
        this.props.changeData(
            {[key]: this.props.equipment[key]},
            this.state.modal
        )
        e.preventDefault()
    }

    toggle() {
        this.setState({modal: !this.state.modal})
    }

    generateEquipmentTable = (equipment) => {
        return (
            <Table>
            <thead>
            <tr>
                <th>Use?</th>
                <th>Name</th>
                <th>Skill</th>
                <th>Book</th>
                <th>Setting</th>
            </tr>
            </thead>
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
        </Table>
        )
    }

    render() {
        return (
            <Modal isOpen={!!this.state.modal} backdrop={true} toggle={this.toggle}>
                <ModalHeader>Equipment</ModalHeader>
                <ModalBody>
                   {this.generateEquipmentTable(this.props.equipment)}
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
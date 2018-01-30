import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class EquipmentLog extends React.Component {

    handleChange = (type, event) => {
        const {changeData, equipment} = this.props;
        let newObj = {...equipment};
        newObj[type] = event.target.value;
        changeData(newObj, 'equipment');
        event.preventDefault();
    };

    render() {
        const {equipment} = this.props;
        return (
            <div className='module'>
                <div className='module-header'>EQUIPMENT LOG</div>
                <hr />
                <div className='fieldLabel'>MONEY:
                    <input type='number' value={equipment.money ? equipment.money : 0} maxLength='25' onChange={this.handleChange.bind(this, 'money')}/>
                    <hr />
                </div>
                <Tabs defaultIndex={0}>
                    <TabList>
                        <Tab>WEAPONS</Tab>
                        <Tab>ARMOR</Tab>
                        <Tab>GEAR</Tab>
                    </TabList>
                    <TabPanel>
                        <div className='fieldLabel'>WEAPONS:</div>
                            <textarea onChange={this.handleChange.bind(this, 'weapons')}
                                      rows='10'
                                      cols='45'
                                      className='textField'
                                      value={equipment.weapons ? equipment.weapons : ''}/>                    <hr />
                    </TabPanel>
                    <TabPanel>
                        <div className='fieldLabel'>ARMOR:</div>
                        <textarea onChange={this.handleChange.bind(this, 'armor')}
                                  rows='10'
                                  cols='45'
                                  className='textField'
                                  value={equipment.armor ? equipment.armor : ''}/>
                    </TabPanel>
                    <TabPanel>
                        <div className='fieldLabel'>GEAR:</div>
                        <textarea onChange={this.handleChange.bind(this, 'gear')}
                                  rows='10'
                                  cols='45'
                                  className='textField'
                                  value={equipment.gear ? equipment.gear : ''}/>
                        <hr />
                    </TabPanel>
                </Tabs>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        equipment: state.equipment,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(EquipmentLog);
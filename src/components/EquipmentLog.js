import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {WeaponStats} from "./index";
import popup from "react-popup";

class EquipmentLog extends React.Component {

    handleChange = (type, event) => {
        const {changeData, equipment} = this.props;
        let newObj = {...equipment};
        newObj[type] = event.target.value;
        changeData(newObj, 'equipment');
        event.preventDefault();
    };

    addGear = (type, event) => {
        let key = Math.random().toString(36).substr(2, 16);
        popup.create({
            title: `New ${type}`,
            className: 'alert',
            content: (
                type==='weapons' && <WeaponStats keyID={key}/>
            )
        });
        event.preventDefault();
    };

    editGear = (type, key, event) => {
        popup.create({
            title: `Edit ${type}`,
            className: 'alert',
            content: (
                type==='weapons' && <WeaponStats keyID={key}/>
            )
        });
        event.preventDefault();
    };


    render() {
        const {equipment, weapons} = this.props;
        const weaponAttributes = ['name', 'damage', 'critical', 'range', 'skill', 'encumbrance', 'qualities'];
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
                        <div className='table'>
                            <div className='table-header'>
                                {weaponAttributes.map((attribute)=>
                                    <div className='table-header table-cell' key={attribute}>{attribute.toUpperCase()}</div>
                                )}
                            </div>
                            {Object.keys(weapons).map((key)=>
                                <div className='table-row' key={key} onClick={this.editGear.bind(this, 'weapons', key)}>
                                    {weaponAttributes.map((weaponAttrib)=>
                                        <div key={key+weaponAttrib} className='table-cell'>{weapons[key][weaponAttrib]}</div>
                                    )}
                                </div>
                            )}
                        </div>
                        <input type='submit' value='Add Weapon' onClick={this.addGear.bind(this, 'weapons')}/>
                        <hr />
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
        weapons: state.weapons,
        armor: state.armor,
        gear: state.gear,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(EquipmentLog);
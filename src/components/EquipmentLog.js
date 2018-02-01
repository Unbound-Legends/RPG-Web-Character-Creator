import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {WeaponStats, Description} from "./index";
import popup from "react-popup";
import {skillDice} from "../reducers";

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

    handleEquip = (type, key) => {
        const {changeData, equipped} = this.props;
        let newObj = {...equipped};
        if (!newObj[type]) newObj[type] = [];
        if (newObj[type].includes(key)) newObj[type].forEach((item, index)=> {
            if (item===key) newObj[type].splice(index, 1);
        })
        else newObj[type].push(key);
        changeData(newObj, 'equipped');
    };

    render() {
        const {equipment, weapons, equipped, skills, skillDice} = this.props;
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
                        {Object.keys(weapons).length > 0 &&
                            <div className='table'>
                                <div className='table-header'>
                                    <div className='table-header table-cell-bottom-border'>EQUIPPED</div>
                                    <div className='table-header table-cell-bottom-border'>NAME</div>
                                    <div className='table-header table-cell-bottom-border'>DAM</div>
                                    <div className='table-header table-cell-bottom-border'>CRIT</div>
                                    <div className='table-header table-cell-bottom-border'>RANGE</div>
                                    <div className='table-header table-cell-bottom-border'>SKILL</div>
                                    <div className='table-header table-cell-bottom-border'>ENCUM</div>
                                    <div className='table-header table-cell-bottom-border'>QUAL</div>
                                    <div className='table-header table-cell-bottom-border'>DICE</div>
                                </div>
                                {Object.keys(weapons).map((key) =>
                                    <div className='table-row' key={key}>
                                        <div className='table-cell-bottom-border'><input type='checkbox' defaultChecked={equipped.weapons ? equipped.weapons.includes(key) : false} onChange={this.handleEquip.bind(this, 'weapons', key)}/></div>
                                        <div className='table-cell-bottom-border' onClick={this.editGear.bind(this, 'weapons', key)}>{weapons[key].name}</div>
                                        <div className='table-cell-bottom-border' onClick={this.editGear.bind(this, 'weapons', key)}>{weapons[key].damage}</div>
                                        <div className='table-cell-bottom-border' onClick={this.editGear.bind(this, 'weapons', key)}>{weapons[key].critical}</div>
                                        <div className='table-cell-bottom-border' onClick={this.editGear.bind(this, 'weapons', key)}>{weapons[key].range}</div>
                                        <div className='table-cell-bottom-border' onClick={this.editGear.bind(this, 'weapons', key)}>{weapons[key].skill ? skills[weapons[key].skill].name : ''}</div>
                                        <div className='table-cell-bottom-border' onClick={this.editGear.bind(this, 'weapons', key)}>{weapons[key].encumbrance}</div>
                                        <div className='table-cell-bottom-border' onClick={this.editGear.bind(this, 'weapons', key)}>{weapons[key].qualities}</div>
                                        <div className='table-cell-bottom-border' onClick={this.editGear.bind(this, 'weapons', key)}><Description text={skillDice[weapons[key].skill]} /></div>
                                    </div>
                                )}
                            </div>
                        }
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
        equipped: state.equipped,
        equipment: state.equipment,
        weapons: state.weapons,
        armor: state.armor,
        gear: state.gear,
        skills: state.skills,
        skillDice: skillDice(state),
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(EquipmentLog);
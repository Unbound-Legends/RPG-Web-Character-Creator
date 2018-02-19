import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {GearStats, Description} from "./index";
import popup from "react-popup";
import {skillDice, gearDice} from "../reducers";

class EquipmentLog extends React.Component {
    state = {money: this.props.money};

    componentWillReceiveProps(nextProps) {
        this.setState({money: nextProps.money});
    }

    handleChangeMoney = (event) => {
        this.setState({money: event.target.value});
        event.preventDefault();
    };

    handleBlurChangeMoney = (event) => {
        const {changeData} = this.props;
        changeData(event.target.value, 'money');
        event.preventDefault();
    };

    addGear = (type, event) => {
        let key = Math.random().toString(36).substr(2, 16);
        let content = <GearStats keyID={key} type={type}/>;
        popup.create({
            title: `New ${type}`,
            className: 'alert',
            content: content
        });
        event.preventDefault();
    };

    editGear = (type, key, event) => {
        let content = <GearStats keyID={key} type={type}/>;
        popup.create({
            title: `Edit ${type}`,
            className: 'alert',
            content: content
        });
        event.preventDefault();
    };

    handleStatus = (type, key, status) => {
        const {changeData, weapons, armor, gear} = this.props;
        let newObj = {};
        if (type === 'weapons') newObj = {...weapons};
        if (type === 'armor') newObj = {...armor};
        if (type === 'gear') newObj = {...gear};
        if (status === 'equipped' && !newObj[key].equipped) newObj[key].carried = true;
        if (status === 'carried' && newObj[key].equipped) {
            alert(`${newObj[key].name} is equipped and cannot be dropped!`);
            return;
        }
        newObj[key][status] = !newObj[key][status];
        changeData(newObj, type);
    };

    render() {
        const {weapons, armor, gear, skills, gearDice, qualities} = this.props;
        const {money} = this.state;
        return (
            <div className='module hidePrint'>
                <div className='module-header'>EQUIPMENT LOG</div>
                <hr/>
                <div className='fieldLabel'>MONEY:
                    <input type='number' value={money} maxLength='25' onBlur={this.handleBlurChangeMoney}
                           onChange={this.handleChangeMoney}/>
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
                                <div className='table-header table-cell-bottom-border'>CARRY</div>
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
                                    <div className='table-cell-bottom-border'><input type='checkbox'
                                                                                     checked={weapons[key].carried}
                                                                                     onChange={this.handleStatus.bind(this, 'weapons', key, 'carried')}/>
                                    </div>
                                    <div className='table-cell-bottom-border'
                                         onClick={this.editGear.bind(this, 'weapons', key)}>{weapons[key].name}</div>
                                    <div className='table-cell-bottom-border'
                                         onClick={this.editGear.bind(this, 'weapons', key)}>{weapons[key].damage}</div>
                                    <div className='table-cell-bottom-border'
                                         onClick={this.editGear.bind(this, 'weapons', key)}>{weapons[key].critical}</div>
                                    <div className='table-cell-bottom-border'
                                         onClick={this.editGear.bind(this, 'weapons', key)}>{weapons[key].range}</div>
                                    <div className='table-cell-bottom-border'
                                         onClick={this.editGear.bind(this, 'weapons', key)}>{weapons[key].skill ? (skills[weapons[key].skill] ? skills[weapons[key].skill].name : '' ) : ''}</div>
                                    <div className='table-cell-bottom-border'
                                         onClick={this.editGear.bind(this, 'weapons', key)}>{weapons[key].encumbrance}</div>
                                    <div className='table-cell-bottom-border'
                                         onClick={this.editGear.bind(this, 'weapons', key)}>{weapons[key].qualitiesList && weapons[key].qualitiesList.map((quality) => `${qualities[Object.keys(quality)[0]].name} ${Object.values(quality)[0]}`).sort().join(', ')}</div>
                                    <div className='table-cell-bottom-border'
                                         onClick={this.editGear.bind(this, 'weapons', key)}><Description
                                        text={gearDice.weapons[key]}/></div>
                                </div>
                            )}
                        </div>
                        }
                        <input type='submit' value='Add Weapon' onClick={this.addGear.bind(this, 'weapons')}/>
                    </TabPanel>
                    <TabPanel>
                        {Object.keys(armor).length > 0 &&
                        <div className='table'>
                            <div className='table-header'>
                                <div className='table-header table-cell-bottom-border'>EQUIP</div>
                                <div className='table-header table-cell-bottom-border'>CARRY</div>
                                <div className='table-header table-cell-bottom-border'>NAME</div>
                                <div className='table-header table-cell-bottom-border'>SOAK</div>
                                <div className='table-header table-cell-bottom-border'>DEF</div>
                                <div className='table-header table-cell-bottom-border'>RANGED DEF</div>
                                <div className='table-header table-cell-bottom-border'>MELEE DEF</div>
                                <div className='table-header table-cell-bottom-border'>ENCUM</div>
                                <div className='table-header table-cell-bottom-border'>QUAL</div>
                            </div>
                            {Object.keys(armor).map((key) =>
                                <div className='table-row' key={key}>
                                    <div className='table-cell-bottom-border'><input type='checkbox'
                                                                                     checked={armor[key].equipped}
                                                                                     onChange={this.handleStatus.bind(this, 'armor', key, 'equipped')}/>
                                    </div>
                                    <div className='table-cell-bottom-border'><input type='checkbox'
                                                                                     checked={armor[key].carried}
                                                                                     onChange={this.handleStatus.bind(this, 'armor', key, 'carried')}/>
                                    </div>
                                    <div className='table-cell-bottom-border'
                                         onClick={this.editGear.bind(this, 'armor', key)}>{armor[key].name}</div>
                                    <div className='table-cell-bottom-border'
                                         onClick={this.editGear.bind(this, 'armor', key)}>{armor[key].soak}</div>
                                    <div className='table-cell-bottom-border'
                                         onClick={this.editGear.bind(this, 'armor', key)}>{armor[key].defense}</div>
                                    <div className='table-cell-bottom-border'
                                         onClick={this.editGear.bind(this, 'armor', key)}>{armor[key].rangedDefense}</div>
                                    <div className='table-cell-bottom-border'
                                         onClick={this.editGear.bind(this, 'armor', key)}>{armor[key].meleeDefense}</div>
                                    <div className='table-cell-bottom-border'
                                         onClick={this.editGear.bind(this, 'armor', key)}>{armor[key].encumbrance}</div>
                                    <div className='table-cell-bottom-border'
                                         onClick={this.editGear.bind(this, 'armor', key)}>{armor[key].qualitiesList && armor[key].qualitiesList.map((quality) => `${qualities[Object.keys(quality)[0]].name} ${Object.values(quality)[0]}`).sort().join(', ')}</div>
                                </div>
                            )}
                        </div>
                        }
                        <input type='submit' value='Add Armor' onClick={this.addGear.bind(this, 'armor')}/>
                    </TabPanel>
                    <TabPanel>
                        {Object.keys(gear).length > 0 &&
                        <div className='table'>
                            <div className='table-header'>
                                <div className='table-header table-cell-bottom-border'>CARRY</div>
                                <div className='table-header table-cell-bottom-border'>NAME</div>
                                <div className='table-header table-cell-bottom-border'>AMOUNT</div>
                                <div className='table-header table-cell-bottom-border'>ENCUM</div>
                                <div className='table-header table-cell-bottom-border'>QUAL</div>
                            </div>
                            {Object.keys(gear).map((key) =>
                                <div className='table-row' key={key}>
                                    <div className='table-cell-bottom-border'><input type='checkbox'
                                                                                     checked={gear[key].carried}
                                                                                     onChange={this.handleStatus.bind(this, 'gear', key, 'carried')}/>
                                    </div>
                                    <div className='table-cell-bottom-border'
                                         onClick={this.editGear.bind(this, 'gear', key)}>{gear[key].name}</div>
                                    <div className='table-cell-bottom-border'
                                         onClick={this.editGear.bind(this, 'gear', key)}>{gear[key].amount}</div>
                                    <div className='table-cell-bottom-border'
                                         onClick={this.editGear.bind(this, 'gear', key)}>{gear[key].encumbrance}</div>
                                    <div className='table-cell-bottom-border'
                                         onClick={this.editGear.bind(this, 'gear', key)}>{gear[key].qualitiesList && gear[key].qualitiesList.map((quality) => `${qualities[Object.keys(quality)[0]].name} ${Object.values(quality)[0]}`).sort().join(', ')}</div>
                                </div>
                            )}
                        </div>
                        }
                        <input type='submit' value='Add Gear' onClick={this.addGear.bind(this, 'gear')}/>
                    </TabPanel>
                </Tabs>
                <hr/>
            </div>


        );
    }
}

function mapStateToProps(state) {
    return {
        armor: state.armor,
        gear: state.gear,
        money: state.money,
        qualities: state.qualities,
        skillDice: skillDice(state),
        skills: state.skills,
        weapons: state.weapons,
        gearDice: gearDice(state),
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(EquipmentLog);
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import {Description} from "./index";
import {skillDice} from "../reducers";

class CarriedGear extends React.Component {

    render() {
        const {weapons, armor, gear, skills, skillDice} = this.props;
        return (
            <div className='module'>
                <div className='module-header'>CARRIED GEAR</div>
                <hr />
                {Object.keys(weapons).length > 0 &&
                <div>
                    <h3>Weapons:</h3>
                    <div className='table'>
                        <div className='table-header'>
                            <div className='table-header table-cell-bottom-border'>CARRIED</div>
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
                            weapons[key].carried &&
                            <div className='table-row' key={key}>
                                <div className='table-cell-bottom-border'><input type='checkbox' readOnly checked={weapons[key].carried}/></div>
                                <div className='table-cell-bottom-border'>{weapons[key].name}</div>
                                <div className='table-cell-bottom-border'>{weapons[key].damage}</div>
                                <div className='table-cell-bottom-border'>{weapons[key].critical}</div>
                                <div className='table-cell-bottom-border'>{weapons[key].range}</div>
                                <div className='table-cell-bottom-border'>{weapons[key].skill ? skills[weapons[key].skill].name : ''}</div>
                                <div className='table-cell-bottom-border'>{weapons[key].encumbrance}</div>
                                <div className='table-cell-bottom-border'>{weapons[key].qualities}</div>
                                <div className='table-cell-bottom-border'><Description text={skillDice[weapons[key].skill]} /></div>
                            </div>
                        )}
                    </div>
                </div>
                }
                {Object.keys(armor).length > 0 &&
                <div>
                    <h3>Armor:</h3>
                    <div className='table'>
                        <div className='table-header'>
                            <div className='table-header table-cell-bottom-border'>EQUIPPED</div>
                            <div className='table-header table-cell-bottom-border'>CARRIED</div>
                            <div className='table-header table-cell-bottom-border'>NAME</div>
                            <div className='table-header table-cell-bottom-border'>SOAK</div>
                            <div className='table-header table-cell-bottom-border'>DEFENSE</div>
                            <div className='table-header table-cell-bottom-border'>RANGED DEFENSE</div>
                            <div className='table-header table-cell-bottom-border'>MELEE DEFENSE</div>
                            <div className='table-header table-cell-bottom-border'>ENCUM</div>
                            <div className='table-header table-cell-bottom-border'>QUAL</div>
                        </div>
                        {Object.keys(armor).map((key) =>
                            armor[key].carried &&
                            <div className='table-row' key={key}>
                                <div className='table-cell-bottom-border'><input type='checkbox' readOnly checked={armor[key].equipped}/></div>
                                <div className='table-cell-bottom-border'><input type='checkbox' readOnly checked={armor[key].carried}/></div>
                                <div className='table-cell-bottom-border'>{armor[key].name}</div>
                                <div className='table-cell-bottom-border'>{armor[key].soak}</div>
                                <div className='table-cell-bottom-border'>{armor[key].defense}</div>
                                <div className='table-cell-bottom-border'>{armor[key].rangedDefense}</div>
                                <div className='table-cell-bottom-border'>{armor[key].meleeDefense}</div>
                                <div className='table-cell-bottom-border'>{armor[key].encumbrance}</div>
                                <div className='table-cell-bottom-border'>{armor[key].qualities}</div>
                            </div>
                        )}
                    </div>
                </div>
                }
                {Object.keys(gear).length > 0 &&
                <div>
                    <h3>Gear:</h3>
                    <div className='table'>
                        <div className='table-header'>
                            <div className='table-header table-cell-bottom-border'>CARRIED</div>
                            <div className='table-header table-cell-bottom-border'>NAME</div>
                            <div className='table-header table-cell-bottom-border'>AMOUNT</div>
                            <div className='table-header table-cell-bottom-border'>ENCUM</div>
                            <div className='table-header table-cell-bottom-border'>QUAL</div>
                        </div>
                        {Object.keys(gear).map((key) =>
                            gear[key].carried &&
                            <div className='table-row' key={key}>
                                <div className='table-cell-bottom-border'><input type='checkbox'
                                                                                 checked={gear[key].carried} readOnly/>
                                </div>
                                <div className='table-cell-bottom-border'>{gear[key].name}</div>
                                <div className='table-cell-bottom-border'>{gear[key].amount}</div>
                                <div className='table-cell-bottom-border'>{gear[key].encumbrance}</div>
                                <div className='table-cell-bottom-border'>{gear[key].qualities}</div>
                            </div>
                        )}
                    </div>
                </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
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

export default connect(mapStateToProps, matchDispatchToProps)(CarriedGear);
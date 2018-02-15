import React from 'react';
import {connect} from 'react-redux';
import {talentCount} from '../reducers';
import {Description} from './index'

class TalentList extends React.Component {

    render() {
        const {archetype, archetypes, talents, talentCount} = this.props;
        return (
            <div className='module'>
                <div className='module-header'>TALENT LIST</div>
                <hr/>
                <div className='table'>
                    <div className='table-header'>
                        {['Talent', 'Rank', 'Activation', 'Type', 'Description'].map((heading) =>
                            <div className='table-cell' key={heading}>{heading}</div>
                        )}
                    </div>
                    {archetypes[archetype] && Object.keys(archetypes[archetype].talents).sort().map((key) =>
                        <div className='table-row' key={key}>
                            <div className='table-cell'>{archetypes[archetype].talents[key].name}</div>
                            <div className='table-cell'/>
                            <div className='table-cell'>{archetypes[archetype].talents[key].activation ? 'Active' : 'Passive'}</div>
                            <div className='table-cell'>{archetypes[archetype].talents[key].turn}</div>
                            <div className='table-cell'><Description text={archetypes[archetype].talents[key].description}/></div>
                        </div>
                    )}
                    {Object.keys(talentCount).sort().map((key) =>
                        <div className='table-row' key={key}>
                            <div className='table-cell'>{talents[key].name}</div>
                            <div className='table-cell'>{talentCount[key]}</div>
                            <div className='table-cell'>{talents[key].activation ? 'Active' : 'Passive'}</div>
                            <div className='table-cell'>{talents[key].turn}</div>
                            <div className='table-cell'><Description text={talents[key].description}/></div>
                        </div>
                    )}
                </div>
            </div>
        )
    };
}

function mapStateToProps(state) {
    return {
        talents: state.talents,
        archetype: state.archetype,
        archetypes: state.archetypes,
        talentCount: talentCount(state),
    };
}

export default connect(mapStateToProps)(TalentList);

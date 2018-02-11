import React from 'react';
import {SkillBlock} from './index';
import {connect} from "react-redux";


class Skill extends React.Component {

    render() {
        return (
            <div className='module breakBefore breakAfter' style={{width: '96vw'}}>
                <div className='sectionheader'>SKILLS</div>
                <hr />
                <div className='table table-module'>
                    <div className='table-cell mobileSkills'>
                        <SkillBlock type='General'
                        />
                    </div>
                    <div className='table-cell mobileSkills'>
                        {['Combat', 'Magic', 'Social', 'Knowledge'].map((type) =>
                            <SkillBlock key={type}
                                        type={type}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }
  }

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps)(Skill);
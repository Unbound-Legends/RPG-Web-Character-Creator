import React from 'react';
import {SkillBlock, CustomSkills} from './index';
import {connect} from "react-redux";
import popup from "react-popup";


class Skill extends React.Component {

    handleClick = () => {
        popup.create({
            title: `Customize Skills`,
            className: 'alert',
            content: <CustomSkills />,
        })
    };

    render() {
        return (
            <div className='module breakBefore breakAfter' style={{width: '96vw'}}>
                <div className='sectionheader' onClick={this.handleClick}>SKILLS</div>
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
        customSkills: state.customSkills,
    };
}

export default connect(mapStateToProps)(Skill);
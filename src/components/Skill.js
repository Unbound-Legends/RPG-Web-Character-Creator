import React from 'react';
import SkillBlock from './SkillBlock';

const Skill = () => {
    return (
      <div>
      <div className='skill-table skill-module module'>
        <div className='skill-cell'>
          <SkillBlock   type='General'
          />
        </div>
        <div className='skill-cell'>
          {['Combat', 'Magic', 'Social', 'Knowledge'].map((type)=>
            <SkillBlock   key={type}
                          type={type}
            />
          )}
        </div>
      </div>
      </div>
    )
  }

export default Skill;

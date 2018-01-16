import React from 'react';
import SkillBlock from './SkillBlock';

const Skill = () => {
    return (
      <div className='table table-module module'>
        <div className='table-cell'>
          <SkillBlock   type='General'
          />
        </div>
        <div className='table-cell'>
          {['Combat', 'Magic', 'Social', 'Knowledge'].map((type)=>
            <SkillBlock   key={type}
                          type={type}
            />
          )}
        </div>
      </div>
    )
  }

export default Skill;

import React from 'react';
import '../index.css';

const StatBlock = ({block, textTop, textBottom, topMod, ...rest}) => {
    const blockType = block ? `${block}-box` : '';
    const mod = topMod ? `-${topMod}` : '';

    return (
        <div className={`stats-box ${blockType}`} {...rest} >
          <div className={`stats-box-top ${blockType}-top${mod}`}>{textTop}</div>
          <div className={`stats-box-bottom ${blockType}-bottom`}>{textBottom}</div>
        </div>
    )
}
export default StatBlock;

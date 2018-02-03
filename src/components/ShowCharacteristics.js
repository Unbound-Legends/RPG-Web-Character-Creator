import React from 'react';
import {connect} from 'react-redux';
import popup from 'react-popup';
import {characteristics} from '../reducers'
import {Characteristics} from './index';

class ShowCharacteristics extends React.Component {

    handleClick = () => {
        popup.create({
            title: `Modifiy Characteristics`,
            className: 'alert',
            content: <Characteristics/>,
        })
    };

    render() {
        const {characteristics} = this.props;
        return (
          <div className='module' onClick={this.handleClick}>
              <div className='sectionheader'>CHARACTERISTICS</div>
              <hr />
              <div className='characteristicsBackround'>
                  {Object.keys(characteristics).map((stat)=>
                    <div key={stat} className={`characteristic`}>
                        <div className='characteristic-topText'>{characteristics[stat]}</div>
                        <div className='characteristic-bottomText'>{stat}</div>
                    </div>
                  )}
              </div>
          </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        characteristics: characteristics(state),
    };
}

export default connect(mapStateToProps)(ShowCharacteristics);

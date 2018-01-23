import React from 'react';
import {connect} from 'react-redux';
import {characteristics} from '../reducers';

class ShowCharacteristics extends React.Component {

    render() {
        const {characteristics} = this.props;
        return (
          <div className='module'>
              <div className='sectionheader'>CHARACTERISTICS</div>
              <hr />
              {Object.keys(characteristics).map((stat)=>
                <div key={stat} className={`characteristic`}>
                    <div className='characteristic-topText'>{characteristics[stat]}</div>
                    <div className='characteristic-bottomText'>{stat}</div>
                </div>
              )}
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

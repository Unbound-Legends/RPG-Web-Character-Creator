import React from 'react';
import MotivationBlock from './MotivationBlock';
import {connect} from 'react-redux';

class Motivation extends React.Component {

  render() {
    const {masterMotivations} = this.props;
    return (
      <div>
        {Object.keys(masterMotivations).map((type)=>
          <MotivationBlock key={type} type={type}/>
        )}
      </div>
    )
  }
}
function mapStateToProps(state) {
    return {
        masterMotivations: state.masterMotivations
    };
}

export default connect(mapStateToProps)(Motivation);

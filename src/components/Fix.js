import React from 'react';
import {fixDataStructure} from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class MainPage extends React.Component {

    componentWillMount() {
        this.props.fixDataStructure();
    }

    render() {
        return (
            <h1>Fixing your broken data structure</h1>
        )
    }
}

function mapStateToProps(state) {
    return {};
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({fixDataStructure}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MainPage);

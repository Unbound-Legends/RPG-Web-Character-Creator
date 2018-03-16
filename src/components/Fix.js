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
            <div style={{textAlign: 'center', marginTop: '2rem'}}>
                <h1>Checking data structure</h1>
                <img
                    src={'https://cdn.discordapp.com/attachments/405723206880591876/423977724663824387/underconstruction-72327f17c652569bab9a33536622841bf905d145ee673a3e9d065fae9cabfe4f.gif'}
                    alt=''/>
            </div>
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

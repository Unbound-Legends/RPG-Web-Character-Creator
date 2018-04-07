import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Container} from 'reactstrap';
import {ImportExport} from './index';

class DataPage extends React.Component {

    render() {
        return (
            <Container className='mx-2'>
                <ImportExport/>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        character: state.character,
        loadingData: state.loadingData,
        loadingCustomData: state.loadingCustomData,
        customDataSet: state.customDataSet,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DataPage);

import React from 'react';
import {Row} from 'reactstrap';
import {connect} from 'react-redux';

class Component extends React.Component {

    render() {
        const {description} = this.props;
        return (
            <div>
                <Row className='justify-content-end'><h5>NOTES</h5></Row>
                <hr/>
                <Row style={{whiteSpace: 'pre-line'}}>
                    {description.notes ? description.notes : ''}
                </Row>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        description: state.description,
    };
}


export const Notes = connect(mapStateToProps)(Component);
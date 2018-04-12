import React from 'react';
import {Row} from 'reactstrap';
import {connect} from 'react-redux';

class CharacterImage extends React.Component {

    render() {
        const {description} = this.props;
        return (
            <div>
                <Row className='justify-content-end'><h5>CHARACTER IMAGE</h5></Row>
                <hr/>
                <img className='img-fluid' src={description.image ? description.image : ''}
                     alt='not found' ref={img => this.img = img} onError={() => this.img.src = 'images/png/Crest.png'}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        description: state.description,
    };
}


export default connect(mapStateToProps)(CharacterImage);
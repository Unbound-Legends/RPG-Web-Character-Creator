import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Col} from 'reactstrap';
import {changeData} from '../actions';
import popup from 'react-popup';
import {CharacterImagePopup} from "./index";

class CharacterImage extends React.Component {

    editImage = () => {
        popup.create({
            title: `Edit Character Image`,
            className: 'alert',
            content: (
                <CharacterImagePopup/>
            )
        })
    };

    render() {
        const {description} = this.props;
        return (
            <Col sm='5' className='align-items-center'>
                <img className='img-fluid' src={description.image ? description.image : ''} onClick={this.editImage}
                     alt='not found' ref={img => this.img = img} onError={() => this.img.src = 'images/png/Crest.png'}/>
            </Col>

        );
    }
}

function mapStateToProps(state) {
    return {
        description: state.description,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CharacterImage);
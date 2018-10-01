import React from 'react';
import {connect} from 'react-redux';
import {Row} from 'reactstrap';
import * as images from '../../images';

class Component extends React.Component {

	render() {
		const {description} = this.props;
		return (
			<div>
				<Row className='justify-content-end'><h5>CHARACTER IMAGE</h5></Row>
				<hr/>
				<img className='img-fluid' src={description.image ? description.image : ''}
					 alt='not found' ref={img => this.img = img} onError={() => this.img.src = images.Crest}/>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		description: state.description,
	};
};

export const CharacterImage = connect(mapStateToProps)(Component);
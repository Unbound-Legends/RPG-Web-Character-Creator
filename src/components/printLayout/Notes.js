import React from 'react';
import {connect} from 'react-redux';
import {Row} from 'reactstrap';
import {Description} from '../';

class Component extends React.Component {

	render() {
		const {description, theme} = this.props;
		return (
			<div className='no-break'>
				<Row className='justify-content-end'>
					<div className={`header header-${theme}`}>NOTES</div>
				</Row>
				<hr/>
				<Row style={{whiteSpace: 'pre-line'}}>
					<Description text={description.notes ? description.notes : ''}/>
				</Row>
			</div>

		);
	}
}

const mapStateToProps = state => {
	return {
		description: state.description,
		theme: state.theme,
	};
};

export const Notes = connect(mapStateToProps)(Component);
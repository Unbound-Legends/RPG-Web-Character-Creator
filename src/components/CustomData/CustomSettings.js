import {camelCase, omit, startCase} from 'lodash-es';
import React from 'react';
import {connect} from 'react-redux';
import {Button, Col, Row, Table} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {DeleteButton} from '../';
import {changeCustomData} from '../../actions';
import {Fragment} from './';

class CustomSettingsComponent extends React.Component {
	state = {name: ''};

	initState = () => {
		this.setState({name: ''});
	};

	handleSubmit = (event) => {
		const {customSettings, changeCustomData} = this.props;
		const {name} = this.state;
		changeCustomData({...customSettings, [camelCase(name)]: startCase(name)}, 'customSettings');
		this.initState();
		event.preventDefault();
	};

	handleDelete = (event) => {
		const {customSettings, changeCustomData} = this.props;
		changeCustomData(omit(customSettings, event.target.name), 'customSettings', false);
		event.preventDefault();
	};

	render() {
		const {customSettings} = this.props;
		const {name} = this.state;
		return (
			<div>
				<Fragment type='name' value={name} handleChange={(event) => this.setState({name: event.target.value})}/>
				<Row className='my-4 justify-content-end'>
					<Button onClick={this.handleSubmit} className='btn'>ADD</Button>
				</Row>
				<Row>
					<Col sm='6'>
						<Table>
							<thead>
							<tr>
								<th>CUSTOM SETTINGS</th>
								<th/>
							</tr>
							</thead>
							<tbody>
							{Object.keys(customSettings).map(key =>
								<tr key={key}>
									<td>
										{customSettings[key]}
									</td>
									<td>
										<DeleteButton name={key} onClick={this.handleDelete}/>
									</td>
								</tr>
							)}
							</tbody>
						</Table>
					</Col>
				</Row>
			</div>
		)
			;
	}
}

const mapStateToProps = state => {
	return {
		customSettings: state.customSettings,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({changeCustomData}, dispatch);

export const CustomSettings = connect(mapStateToProps, matchDispatchToProps)(CustomSettingsComponent);

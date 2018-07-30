import {camelCase, omit, startCase} from 'lodash-es';
import React from 'react';
import {connect} from 'react-redux';
import {Button, Col, Input, Row, Table} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {DeleteButton} from '../';
import {changeCustomData} from '../../actions';

class CustomSettingsComponent extends React.Component {
	state = {setting: ''};

	initState = () => {
		this.setState({setting: ''});
	};

	handleChange = (event) => {
		this.setState({[event.target.name]: event.target.value});
		event.preventDefault();
	};

	handleSubmit = (event) => {
		const {customSettings, changeCustomData} = this.props;
		const {setting} = this.state;
		changeCustomData({...customSettings, [camelCase(setting)]: startCase(setting)}, 'customSettings');
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
		const {setting} = this.state;
		return (
			<div>
				<Row className='m-1 align-items-center'>
					<Col sm='2'><b>NEW SETTING:</b></Col>
					<Col>
						<Input type='text' value={setting} name='setting' maxLength='25'
							   onChange={this.handleChange}/>
					</Col>
					<Col>
						<Button onClick={this.handleSubmit} className='btn'>ADD</Button>
					</Col>
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

function mapStateToProps(state) {
	return {
		customSettings: state.customSettings,
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({changeCustomData}, dispatch);
}

export const CustomSettings = connect(mapStateToProps, matchDispatchToProps)(CustomSettingsComponent);

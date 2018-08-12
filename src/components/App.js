import firebase from '@firebase/app';
import '@firebase/auth';
import React from 'react';
import {connect} from 'react-redux';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import {Container} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {changeUser, loadCharacterList, loadCustomData, loadData} from '../actions';
import {DataPage, MainPage, User} from './';
import {CustomData} from './CustomData';

class AppComponent extends React.Component {
	state = {loading: true};

	componentWillMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.props.changeUser(user.uid);
				this.setState({loading: false});
			}
			else this.setState({loading: false});
		});
	}

	componentWillReceiveProps(nextProps) {
		const {loadCharacterList, loadCustomData, user} = this.props;
		if (nextProps.user && user !== nextProps.user) {
			loadCharacterList();
			loadCustomData();
		}
		if (nextProps.character && nextProps.character !== this.props.character) this.props.loadData();
		if (nextProps.setting && nextProps.setting !== this.props.setting) this.props.loadCustomData(nextProps.setting);
		if (nextProps.printContent !== this.props.printContent) setTimeout(() => window.print(), 300);
	}

	render() {
		const {loading} = this.state;
		const {loadingCustomData, loadingData} = this.props;
		const loadingPage = <h1 className='text-center mt-3'>LOADING</h1>;
		if (loading) return loadingPage;
		if (!(this.props.user)) return <User/>;
		if (loadingCustomData || loadingData) return loadingPage;
		else return (
			<Container className='ml-1' style={{marginBottom: '8rem'}}>
				<Tabs defaultIndex={0} className='m-1 d-print-none'>
					<TabList>
						<Tab>CHARACTERS</Tab>
						<Tab>CUSTOM DATA</Tab>
						<Tab>EXPORT / IMPORT</Tab>
					</TabList>
					<TabPanel className='w-100'>
						<MainPage/>
					</TabPanel>
					<TabPanel className='w-100'>
						<CustomData/>
					</TabPanel>
					<TabPanel className='w-100'>
						<DataPage/>
					</TabPanel>
				</Tabs>
				<div className='d-none d-print-block'>{this.props.printContent}</div>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.user,
		character: state.character,
		loadingData: state.loadingData,
		loadingCustomData: state.loadingCustomData,
		printContent: state.printContent,
		setting: state.setting,
	};
};

const matchDispatchToProps = dispatch => {
	return bindActionCreators({
		changeUser,
		loadCharacterList,
		loadData,
		loadCustomData
	}, dispatch);
};

export const App = connect(mapStateToProps, matchDispatchToProps)(AppComponent);

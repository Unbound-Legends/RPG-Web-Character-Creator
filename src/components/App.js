import firebase from '@firebase/app';
import '@firebase/auth';
import React from 'react';
import ReactGA from 'react-ga'
import {connect} from 'react-redux';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import {Container} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {changeUser, loadCharacterList, loadCustomData, loadData} from '../actions';
import {gaID} from '../config'
import {DataPage, MainPage, User} from './';
import {CustomData} from './CustomData';

class AppComponent extends React.Component {
	state = {loading: true};

	componentWillMount() {
		ReactGA.initialize(gaID);
		ReactGA.pageview(window.location.pathname);
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
		if (nextProps.setting && nextProps.setting !== this.props.setting) this.props.loadCustomData(nextProps.setting, nextProps.strict);
		if (nextProps.strict !== this.props.strict) this.props.loadCustomData(nextProps.setting, nextProps.strict);
		if (nextProps.printContent !== this.props.printContent) setTimeout(() => window.print(), 400);
	}

	render() {
		const {loading} = this.state;
		const {loadingCustomData, loadingData} = this.props;
		const loadingPage = <h1 className='text-center mt-3'>LOADING</h1>;
		if (loading) return loadingPage;
		if (!(this.props.user)) return <User/>;
		if (loadingCustomData || loadingData) return loadingPage;
		else return (
			<Container>
				<Tabs defaultIndex={0} className='d-print-none mt-2 mx-1' style={{marginBottom: '5rem'}}>
					<TabList>
						<Tab>CHARACTERS</Tab>
						<Tab>CUSTOM DATA</Tab>
						<Tab>EXPORT / IMPORT</Tab>
					</TabList>
					<TabPanel>
						<MainPage/>
					</TabPanel>
					<TabPanel>
						<CustomData/>
					</TabPanel>
					<TabPanel>
						<DataPage/>
					</TabPanel>
				</Tabs>
				<div className='d-none d-print-block'>{this.props.printContent}</div>
				<div className='bg bg-CRB d-print-none'/>
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
		strict: state.strict,
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

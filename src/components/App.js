import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeUser, loadCharacterList, loadCustomDataList, loadCustomDataSet, loadData} from '../actions';
import {DataPage, MainPage, User} from './index';
import firebase from '@firebase/app';
import '@firebase/auth';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';


class Component extends React.Component {
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
        const {loadCustomDataList, loadCharacterList, user} = this.props;
        if (nextProps.user && user !== nextProps.user) {
            loadCharacterList();
            loadCustomDataList();
        }
        if (nextProps.character && nextProps.character !== this.props.character) this.props.loadData();
        if (nextProps.customDataSet && nextProps.customDataSet !== this.props.customDataSet) this.props.loadCustomDataSet();
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
            <div>
                <Tabs defaultIndex={0} className='m-1 d-print-none'>
                <TabList>
                    <Tab>CHARACTERS</Tab>
                    <Tab>EXPORT / IMPORT</Tab>
                </TabList>
                <TabPanel>
                    <MainPage/>
                </TabPanel>
                <TabPanel>
                    <DataPage/>
                </TabPanel>
            </Tabs>
                <div className='d-none d-print-block'>{this.props.printContent}</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        character: state.character,
        loadingData: state.loadingData,
        loadingCustomData: state.loadingCustomData,
        customDataSet: state.customDataSet,
        printContent: state.printContent,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        changeUser,
        loadCharacterList,
        loadData,
        loadCustomDataList,
        loadCustomDataSet
    }, dispatch);
}

export const App = connect(mapStateToProps, matchDispatchToProps)(Component);

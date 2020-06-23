import firebase from '@firebase/app';
import '@firebase/auth';
import React from 'react';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { Container } from 'reactstrap';
import { bindActionCreators } from 'redux';
import {
    changeUser,
    loadCharacterList,
    loadData,
    loadDataSets,
    loadDoc,
    writeUser
} from '../redux/actions';
import { DataPage, Loading, MainPage, User, VehicleSelect } from './';
import { CustomData } from './CustomData';

class AppComponent extends React.Component {
    state = { loading: true };

    componentWillMount() {
        ReactGA.initialize(process.env.REACT_APP_gaID);
        ReactGA.pageview(window.location.pathname);
        firebase.auth().onAuthStateChanged(user => {
            if (user) this.props.changeUser(user.uid);
            this.setState({ loading: false });
        });
    }

    componentWillReceiveProps(nextProps) {
        const { loadCharacterList, user, loadDataSets, loadDoc } = this.props;
        if (nextProps.user && user !== nextProps.user) {
            writeUser();
            loadCharacterList();
            loadDataSets();
        }
        if (nextProps.character && nextProps.character !== this.props.character)
            this.props.loadData();
        if (nextProps.vehicle && nextProps.vehicle !== this.props.vehicle)
            loadDoc('vehicle', nextProps.vehicle);
        if (nextProps.printContent !== this.props.printContent)
            setTimeout(() => window.print(), 400);
    }

    render() {
        const { loading } = this.state;
        const { loadingData, theme } = this.props;

        if (loading) return <Loading />;
        if (!this.props.user) return <User />;
        if (loadingData) return <Loading />;
        else
            return (
                <Container className={`body-${theme}`}>
                    <Tabs
                        defaultIndex={0}
                        className="d-print-none mt-2 mx-1"
                        style={{ marginBottom: '5rem' }}
                    >
                        <TabList>
                            <Tab>CHARACTERS</Tab>
                            <Tab>VEHICLES</Tab>
                            <Tab>CUSTOM DATA</Tab>
                            <Tab>EXPORT / IMPORT</Tab>
                        </TabList>
                        <TabPanel>
                            <MainPage />
                        </TabPanel>
                        <TabPanel>
                            <VehicleSelect />
                        </TabPanel>
                        <TabPanel>
                            <CustomData />
                        </TabPanel>
                        <TabPanel>
                            <DataPage />
                        </TabPanel>
                    </Tabs>
                    <div className="d-none d-print-block">
                        {this.props.printContent}
                    </div>
                    <div className={`bg bg-${theme} d-print-none`} />
                </Container>
            );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        character: state.character,
        loadingData: state.loadingData,
        printContent: state.printContent,
        setting: state.setting,
        strict: state.strict,
        theme: state.theme,
        vehicle: state.vehicle
    };
};

const matchDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            changeUser,
            loadCharacterList,
            loadData,
            loadDataSets,
            loadDoc,
            writeUser
        },
        dispatch
    );
};

export const App = connect(mapStateToProps, matchDispatchToProps)(AppComponent);

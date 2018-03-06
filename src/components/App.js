import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeUser} from '../actions';
import {User, MainPage, Fix} from './index';
import firebase from 'firebase';

class App extends React.Component {
    state = {loading: true};

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.changeUser(user.uid);
                this.setState({loading: false});
            }
            else this.setState({loading: false});
        })
    }


    render() {
        const {loading} = this.state;
        if (loading) return <div> </div>;
        return (
          <div className='App'>
            {this.props.user === null ? <User /> : (this.props.fix ? <Fix/> : <MainPage />)}
          </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        fix: state.fix,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeUser}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(App);

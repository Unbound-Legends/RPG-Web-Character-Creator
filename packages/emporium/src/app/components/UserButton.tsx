import { changeUser } from '@emporium/actions';
import firebase from '@firebase/app';
import '@firebase/auth';
import React from 'react';
import { connect } from 'react-redux';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown } from 'reactstrap';
import { bindActionCreators } from 'redux';

class UserButtonComponent extends React.Component<any, any> {
    public getName = () => {
        const user = firebase.auth().currentUser;
        let name = 'Rando Calrissian';
        if (user) {
            if (user.email) {
                name = user.email;
            } else if (user.phoneNumber) {
                name = user.phoneNumber;
            }
        }
        return name;
    };

    public handleClick = async () => {
        firebase
            .auth()
            .signOut()
            .then(() => this.props.changeUser(null))
            .catch(console.error);
    };

    public render() {
        return (
            <UncontrolledButtonDropdown>
                <DropdownToggle caret size="sm">
                    {this.getName()}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={this.handleClick}>
                        Sign Out
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledButtonDropdown>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const matchDispatchToProps = dispatch =>
    bindActionCreators({ changeUser }, dispatch);

export const UserButton = connect(
    mapStateToProps,
    matchDispatchToProps
)(UserButtonComponent);

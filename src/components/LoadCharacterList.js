import React from "react";
import {getCharacterList} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {MainPage} from "./index";

class LoadCharacterList extends React.Component {
    componentWillMount() {
        this.props.getCharacterList();
    }

    render() {
        if (this.props.characterList === null) return <div/>;
        if (this.props.character !== null) return <MainPage />;
        return <div />;
    }
}

function mapStateToProps(state) {
    return {
        characterList: state.characterList,
        character: state.character,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({getCharacterList}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(LoadCharacterList);
import React from 'react';
import {Button} from 'reactstrap';

let checkbox = <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 22 22"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>

class DeleteButton extends React.Component {
    state = {confirmation: false}

    handleClick = () => {
        this.setState({confirmation: true})
    }
    render() {
        const {name, onClick} = this.props;
        if (this.state.confirmation) {
            return <Button name={name} onClick={onClick} className="button-success">{checkbox}</Button>
        }

        return <Button name={name} onClick={this.handleClick}>Delete</Button>
    }
}

export default DeleteButton;
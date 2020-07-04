import React from 'react';
import { Button } from 'reactstrap';
import './delete-button.scss';

export class DeleteButton extends React.Component<any, { confirmation: boolean }> {
    public state = { confirmation: false };
    private timer: any = null;

    public confirmDelete = () => {
        this.setState({ confirmation: true });
        this.timer = setTimeout(
            () => this.setState({ confirmation: false }),
            2000
        );
    };

    public componentWillUnmount() {
        clearTimeout(this.timer);
    }

    public render() {
        if (this.state.confirmation) {
            return (
                <Button {...this.props} size="sm" color="danger">
                    ✓
                </Button>
            );
        }
        return (
            <Button
                outline
                color="danger"
                size="sm"
                onClick={this.confirmDelete}
            >
                X
            </Button>
        );
    }
}

export default DeleteButton;

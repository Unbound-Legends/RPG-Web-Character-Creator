import React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';

class ErrorBoundaryComponent extends React.Component {
    state = {
        hasError: false,
        error: null,
        info: null
    };

    componentDidCatch(error, info) {
        this.setState({
            hasError: true,
            error: error,
            info: info
        });
    }

    buildMessage = () => {
        const text = `Component: ${this.props.component}%0D%0A User: ${
            this.props.user
        }%0D%0A Character: ${
            this.props.character
        }%0D%0A Error: ${this.state.error.toString()}%0D%0A`;
        const error = this.state.info.componentStack
            .split('\n')
            .filter(Boolean)
            .map(line => `${line.replace('\n', '').trim()}%0D%0A`)
            .join('');
        return text + error;
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="justify-content-center">
                    <Row className="text-danger">
                        <Col>
                            <b>Oops!!! Something went wrong</b>
                        </Col>
                    </Row>
                    <Row className="text-danger">
                        <Col>
                            <b>
                                Click button to send an error report to the man.
                            </b>
                        </Col>
                    </Row>
                    <Button
                        color="danger"
                        onClick={() =>
                            window.open(
                                `mailto:info@genesysemporium.com?subject=Genesys%20Emporium%20Error&body=${this.buildMessage()}`
                            )
                        }
                    >
                        Send Log
                    </Button>
                </div>
            );
        } else return this.props.children;
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        character: state.character
    };
};

export const ErrorBoundary = connect(mapStateToProps)(ErrorBoundaryComponent);

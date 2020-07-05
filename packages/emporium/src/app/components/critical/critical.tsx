import { changeData } from '@emporium/actions';
import { criticalText } from '@emporium/selectors';
import { DeleteButton } from '@emporium/ui';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Input, Row, Table } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { Description } from '../Description';
import './critical.scss';

class CriticalComponent extends React.Component<any, any> {
    public state = { value: null, modal: false };

    public handleSubmit = event => {
        const newArr = [...this.props.critical];
        const value = this.state.value;
        if (value != null && value > 0) {
            newArr.push(value);
            this.props.changeData(newArr, 'critical');
        }

        this.setState({ value: null });
        event.preventDefault();
    };

    public handleChange = event => {
        const radix = 10;
        const inputValue = event.target.value;
        if (inputValue) {
            const number = parseInt(inputValue.replace(/\D+/g, ''), radix);
            if (!isNaN(number) && number <= 999) {
                this.setState({ value: number });
            }
        } else {
            this.setState({ value: null });
        }

        event.preventDefault();
    };

    public handleDelete = event => {
        const newArr = [...this.props.critical];
        newArr.splice(event.target.value, 1);
        this.props.changeData(newArr, 'critical');
        this.setState({ modal: false });
    };

    public criticalInputKeypress = (event): void => {
        if (event.key === 'Enter') {
            this.handleSubmit(event);
        }
    };

    public render() {
        const { value } = this.state;
        const { critical, theme } = this.props;
        return (
            <div className="critical-container">
                <Row className="justify-content-end">
                    <div className={`header header-${theme}`}>
                        CRITICAL INJURES
                    </div>
                </Row>
                <hr />
                <Table className="bg-light">
                    <thead>
                        <tr>
                            <th>CRITICAL</th>
                            <th>DESCRIPTION</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {critical.map((critRoll, index) => (
                            <tr className="my-2" key={index}>
                                <td>
                                    <b>{critRoll}:</b>
                                </td>
                                <td>
                                    <Description
                                        text={criticalText(critRoll)}
                                    />
                                </td>
                                <td>
                                    <DeleteButton
                                        value={index}
                                        onClick={this.handleDelete}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Row className="my-2 justify-content-end">
                    <b className="my-auto">Add Critical:</b>
                    <Input
                        className="w-20 mx-2"
                        bsSize="sm"
                        type="number"
                        name="critical"
                        value={value != null ? value : ''}
                        onKeyPress={this.criticalInputKeypress}
                        onChange={this.handleChange}
                    />
                    <Button size="sm" onClick={this.handleSubmit}>
                        Add
                    </Button>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        critical: state.critical,
        theme: state.theme
    };
};

const matchDispatchToProps = dispatch =>
    bindActionCreators({ changeData }, dispatch);

export const Critical = connect(
    mapStateToProps,
    matchDispatchToProps
)(CriticalComponent);

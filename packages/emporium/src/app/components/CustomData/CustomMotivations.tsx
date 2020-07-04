import { addDataSet, modifyDataSet, removeDataSet } from '@emporium/actions';
import { ControlButtonSet, DeleteButton } from '@emporium/ui';
import { Type } from '@nrwl/web/src/utils/third-party/browser/schema';
import React from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Table } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { Fragment } from './Fragments';

class CustomMotivationsComponent extends React.Component<any, any> {
    public state: any = {};
    private _type = 'customMotivations';

    public componentWillMount = () => this.initState();

    public initState = () => {
        this.setState({ type: '', name: '', description: '', mode: 'add' });
    };

    public handleClose = () => {
        this.initState();
        this.props.handleClose();
    };

    public handleDuplicate = event => {
        const { customMotivations } = this.props;
        // @ts-ignore
        const { id, ...data } = { ...customMotivations[event.target.name] };
        this.props.addDataSet(this._type, {
            ...data,
            name: `${data.name} (copy)`
        });
        event.preventDefault();
    };

    public handleSubmit = () => {
        const { mode, ...data } = this.state;
        if (mode === 'add') {
            this.props.addDataSet(Type, data);
        } else if (mode === 'edit') {
            this.props.modifyDataSet(Type, data);
        }
        this.initState();
    };

    public handleDelete = event => {
        this.props.removeDataSet(
            Type,
            this.props[this._type][event.target.name].id
        );
        event.preventDefault();
    };

    public handleEdit = event => {
        const { customMotivations } = this.props;
        // noinspection JSUnusedLocalSymbols
        const data = customMotivations[event.target.name];
        this.setState({
            ...data,
            mode: 'edit'
        });
    };

    public render() {
        const { customMotivations } = this.props;
        const { name, type, description, mode } = this.state;
        return (
            <div>
                <Fragment
                    type="text"
                    title="name"
                    value={name}
                    mode={mode}
                    handleChange={event =>
                        this.setState({ name: event.target.value })
                    }
                />

                <Fragment
                    type="inputSelect"
                    name="type"
                    value={type}
                    array={['Strength', 'Flaw', 'Desire', 'Fear']}
                    handleChange={event =>
                        this.setState({ type: event.target.value })
                    }
                />

                <Fragment
                    type="description"
                    value={description}
                    mode={mode}
                    handleChange={event =>
                        this.setState({ description: event.target.value })
                    }
                />

                <ControlButtonSet
                    mode={this.state.mode}
                    type={'motivation'}
                    handleSubmit={this.handleSubmit}
                    onEditSubmit={this.handleSubmit}
                    onEditCancel={this.initState}
                    disabled={name === '' || type === ''}
                />

                <Table>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>TYPE</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(customMotivations).map(key => (
                            <tr key={key}>
                                <td>{customMotivations[key].name}</td>
                                <td>{customMotivations[key].type}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button
                                            name={key}
                                            onClick={this.handleEdit}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            name={key}
                                            onClick={this.handleDuplicate}
                                        >
                                            Duplicate
                                        </Button>
                                        <DeleteButton
                                            name={key}
                                            onClick={this.handleDelete}
                                        />
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        customMotivations: state.customMotivations
    };
};

const matchDispatchToProps = dispatch =>
    bindActionCreators({ removeDataSet, addDataSet, modifyDataSet }, dispatch);

export const CustomMotivations = connect(
    mapStateToProps,
    matchDispatchToProps
)(CustomMotivationsComponent);

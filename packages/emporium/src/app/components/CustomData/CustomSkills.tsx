import { addDataSet, modifyDataSet, removeDataSet } from '@emporium/actions';
import { chars } from '@emporium/data-lists';
import { ControlButtonSet, DeleteButton } from '@emporium/ui';
import React from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Table } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { Fragment } from './Fragments';

class CustomSkillsComponent extends React.Component<any, any> {
    public state: any = {};
    private _type = 'customSkills';

    public componentWillMount = () => this.initState();

    public initState = () => {
        this.setState({
            name: '',
            type: '',
            characteristic: '',
            setting: [],
            mode: 'add'
        });
    };

    public handleClose = () => {
        this.initState();
        this.props.handleClose();
    };

    public handleDuplicate = event => {
        const { customSkills } = this.props;
        // @ts-ignore
        const { id, ...data } = { ...customSkills[event.target.name] };
        this.props.addDataSet(this._type, {
            ...data,
            name: `${data.name} (copy)`
        });
        event.preventDefault();
    };

    public handleSubmit = event => {
        const { mode, ...rest } = this.state;
        const data = { ...rest };
        if (mode === 'add') {
            this.props.addDataSet(this._type, data);
        } else if (mode === 'edit') {
            this.props.modifyDataSet(this._type, data);
        }
        this.initState();
        event.preventDefault();
    };

    public handleDelete = event => {
        this.props.removeDataSet(
            this._type,
            this.props[this._type][event.target.name].id
        );
        event.preventDefault();
    };

    public handleEdit = event => {
        const { customSkills } = this.props;
        const skill = customSkills[event.target.name];
        this.setState({
            ...skill,
            mode: 'edit',
            setting:
                typeof skill.setting === 'string'
                    ? skill.setting.split(', ')
                    : skill.setting
        });
    };

    public render() {
        const { customSkills } = this.props;
        const { name, type, characteristic, setting, mode } = this.state;
        return (
            <div>
                <Fragment
                    type="text"
                    title="Name"
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
                    array={[
                        'General',
                        'Combat',
                        'Social',
                        'Magic',
                        'Knowledge'
                    ]}
                    handleChange={event =>
                        this.setState({ type: event.target.value })
                    }
                />

                <Fragment
                    type="inputSelect"
                    name="characteristic"
                    value={characteristic}
                    array={chars}
                    handleChange={event =>
                        this.setState({ characteristic: event.target.value })
                    }
                />

                <Fragment
                    type="setting"
                    setting={setting}
                    setState={selected => this.setState({ setting: selected })}
                />

                <ControlButtonSet
                    mode={this.state.mode}
                    type={'Skill'}
                    handleSubmit={this.handleSubmit}
                    onEditSubmit={this.handleSubmit}
                    onEditCancel={this.initState}
                    disabled={
                        name === '' || type === '' || characteristic === ''
                    }
                />

                <Table>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>TYPE</th>
                            <th>CHAR</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(customSkills)
                            .sort((a, b) =>
                                customSkills[a].name > customSkills[b].name
                                    ? 1
                                    : -1
                            )
                            .map(key => (
                                <tr key={key}>
                                    <td>{customSkills[key].name}</td>
                                    <td>{customSkills[key].type}</td>
                                    <td>{customSkills[key].characteristic}</td>
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
        customSkills: state.customSkills
    };
};

const matchDispatchToProps = dispatch =>
    bindActionCreators({ removeDataSet, addDataSet, modifyDataSet }, dispatch);

export const CustomSkills = connect(
    mapStateToProps,
    matchDispatchToProps
)(CustomSkillsComponent);

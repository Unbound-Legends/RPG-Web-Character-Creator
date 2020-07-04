import { addDataSet, modifyDataSet, removeDataSet } from '@emporium/actions';
import { ControlButtonSet, DeleteButton } from '@emporium/ui';
import { uniq } from 'lodash-es';
import React from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Table } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { Fragment } from './Fragments';

class CustomCareersComponent extends React.Component<any> {
    public state: any = {};
    private _type = 'customCareers';

    public componentWillMount = (): void => this.initState();

    public initState = () => {
        this.setState({
            name: '',
            selectedSkills: [],
            description: '',
            setting: [],
            mode: 'add'
        });
    };

    public handleClose = () => {
        this.initState();
        this.props.handleClose();
    };

    public handleSelect = event => {
        this.setState({
            selectedSkills: [...this.state.selectedSkills, event.target.value]
        });
        event.preventDefault();
    };

    public handleSubmit = () => {
        const { selectedSkills, mode, ...rest } = this.state;
        const data = { ...rest, skills: selectedSkills };
        if (mode === 'add') {
            this.props.addDataSet(this._type, data);
        } else if (mode === 'edit') {
            this.props.modifyDataSet(this._type, data);
        }
        this.initState();
    };

    public handleDuplicate = event => {
        const { customCareers } = this.props;
        // @ts-ignore
        const { id, ...data } = { ...customCareers[event.target.name] };
        this.props.addDataSet(this._type, {
            ...data,
            name: `${data.name} (copy)`
        });
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
        const { customCareers } = this.props;
        const career = customCareers[event.target.name];
        this.setState({
            ...career,
            selectedSkills: career.skills ? uniq(career.skills) : [],
            setting:
                typeof career.setting === 'string'
                    ? career.setting.split(', ')
                    : career.setting,
            mode: 'edit'
        });
    };

    public render() {
        const { skills, customCareers } = this.props;
        const { name, selectedSkills, description, setting, mode } = this.state;
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
                    type="setting"
                    setting={setting}
                    setState={selected => this.setState({ setting: selected })}
                />

                <Fragment
                    name="selectedSkills"
                    type="inputSelect"
                    array={Object.keys(skills)
                        .filter(skill => !selectedSkills.includes(skill))
                        .sort()}
                    nameObj={skills}
                    handleChange={this.handleSelect}
                />

                <Fragment
                    type="list"
                    array={selectedSkills}
                    nameObj={skills}
                    handleClear={() => this.setState({ selectedSkills: [] })}
                />

                <Fragment
                    type="description"
                    value={description}
                    handleChange={event =>
                        this.setState({ description: event.target.value })
                    }
                />

                <ControlButtonSet
                    mode={this.state.mode}
                    type={'Career'}
                    handleSubmit={this.handleSubmit}
                    onEditSubmit={this.handleSubmit}
                    onEditCancel={this.initState}
                    disabled={name === '' || 0 >= selectedSkills.length}
                />

                <Table>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>SKILLS</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(customCareers)
                            .sort((a, b) =>
                                customCareers[a].name > customCareers[b].name
                                    ? 1
                                    : -1
                            )
                            .map(key => (
                                <tr key={key} style={{ textAlign: 'left' }}>
                                    <td>{customCareers[key].name}</td>
                                    <td>
                                        {customCareers[key].skills &&
                                            customCareers[key].skills
                                                .map(skill =>
                                                    skills[skill]
                                                        ? skills[skill].name
                                                        : skill
                                                )
                                                .join(', ')}
                                    </td>
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
        customCareers: state.customCareers,
        skills: state.skills,
        career: state.career
    };
};

const matchDispatchToProps = dispatch =>
    bindActionCreators({ addDataSet, modifyDataSet, removeDataSet }, dispatch);

export const CustomCareers = connect(
    mapStateToProps,
    matchDispatchToProps
)(CustomCareersComponent);

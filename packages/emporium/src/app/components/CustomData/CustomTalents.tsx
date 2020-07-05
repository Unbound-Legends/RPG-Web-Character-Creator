import { addDataSet, modifyDataSet, removeDataSet } from '@emporium/actions';
import { chars, diceNames, modifiableAttributes } from '@emporium/data-lists';
import { ControlButtonSet, DeleteButton } from '@emporium/ui';
import React from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Table } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { Fragment } from './Fragments';

class CustomTalentsComponent extends React.Component<any, any> {
    public state: any = {};
    private _type = 'customTalents';

    public UNSAFE_componentWillMount = () => this.initState();

    public initState = () => {
        this.setState({
            name: '',
            tier: '',
            activation: '',
            turn: '',
            ranked: '',
            description: '',
            setting: [],
            modifier: false,
            modifierValue: '',
            prerequisite: '',
            antirequisite: '',
            mode: 'add'
        });
    };

    public handleList = event => {
        const { modifierValue } = this.state;
        let arr = [];
        if (Array.isArray(modifierValue)) {
            arr = [...modifierValue];
        }
        arr.push(event.target.value);
        this.setState({ modifierValue: arr });
        event.preventDefault();
    };

    public handleDuplicate = event => {
        const { customTalents } = this.props;
        const { id = '', ...data } = { ...customTalents[event.target.name] };
        this.props.addDataSet(this._type, { ...data, name: `${data.name} (copy)` });
        event.preventDefault();
    };

    public handleSubmit = () => {
        const { modifier, modifierValue, mode, ...rest } = this.state;
        const data = { ...rest };
        if (modifier) {
            data.modifier = { [modifier]: modifierValue };
        }
        if (mode === 'add') {
            this.props.addDataSet(this._type, data);
        } else if (mode === 'edit') {
            this.props.modifyDataSet(this._type, data);
        }
        this.initState();
    };

    public handleDelete = event => {
        this.props.removeDataSet(this._type, this.props[this._type][event.target.name].id);
        event.preventDefault();
    };

    public handleClose = () => {
        this.initState();
        this.props.handleClose();
    };

    public handleEdit = event => {
        const { customTalents } = this.props;
        const talent = customTalents[event.target.name];
        this.setState({
            ...talent,
            activation: talent.activation ? talent.activation : false,
            ranked: talent.ranked ? talent.ranked : false,
            setting:
                typeof talent.setting === 'string'
                    ? talent.setting.split(', ')
                    : talent.setting,
            modifier: talent.modifier ? Object.keys(talent.modifier)[0] : false,
            modifierValue: talent.modifier
                ? Object.values(talent.modifier)[0]
                : '',
            mode: 'edit'
        });
    };

    public render() {
        const { customTalents, skills, talents } = this.props;
        const {
            name,
            tier,
            ranked,
            activation,
            turn,
            description,
            setting,
            modifier,
            modifierValue,
            prerequisite,
            antirequisite,
            mode
        } = this.state;
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
                    type="setting"
                    setting={setting}
                    setState={selected => this.setState({ setting: selected })}
                />

                <Fragment
                    type="inputSelect"
                    title="tier"
                    array={[1, 2, 3, 4, 5]}
                    value={tier}
                    handleChange={event =>
                        this.setState({ tier: +event.target.value })
                    }
                />

                <Fragment
                    type="inputSelect"
                    title="activation"
                    array={[true, false]}
                    nameObj={{
                        true: { name: 'Active' },
                        false: { name: 'Passive' }
                    }}
                    value={activation}
                    handleChange={event =>
                        this.setState({
                            activation: JSON.parse(event.target.value)
                        })
                    }
                />

                {activation && (
                    <Fragment
                        type="text"
                        title="turn"
                        value={turn}
                        handleChange={event =>
                            this.setState({ turn: event.target.value })
                        }
                    />
                )}

                <Fragment
                    type="inputSelect"
                    title="ranked"
                    array={[true, false]}
                    nameObj={{ true: { name: 'Yes' }, false: { name: 'No' } }}
                    value={ranked}
                    handleChange={event =>
                        this.setState({
                            ranked: JSON.parse(event.target.value)
                        })
                    }
                />

                <Fragment
                    type="description"
                    value={description}
                    handleChange={event =>
                        this.setState({ description: event.target.value })
                    }
                />

                <Fragment
                    type="inputSelect"
                    title="prerequisite"
                    value={prerequisite}
                    array={Object.keys(talents)}
                    nameObj={talents}
                    blankText={'None'}
                    handleChange={event =>
                        this.setState({ prerequisite: event.target.value })
                    }
                />

                <Fragment
                    type="inputSelect"
                    title="antirequisite"
                    value={antirequisite}
                    array={Object.keys(talents)}
                    nameObj={talents}
                    blankText={'None'}
                    handleChange={event =>
                        this.setState({ antirequisite: event.target.value })
                    }
                />

                <Fragment
                    type="inputSelect"
                    title="modifier"
                    array={[true, false]}
                    nameObj={{ true: { name: 'Yes' }, false: { name: 'No' } }}
                    value={Boolean(modifier)}
                    blankOption={false}
                    handleChange={event =>
                        this.setState({
                            modifier: JSON.parse(event.target.value),
                            modifierValue: ''
                        })
                    }
                />

                {modifier && (
                    <Fragment
                        type="inputSelect"
                        title="Attribute"
                        value={modifier}
                        array={modifiableAttributes
                            .concat(Object.keys(skills), chars)
                            .sort()}
                        nameObj={skills}
                        handleChange={event =>
                            this.setState({
                                modifier: event.target.value,
                                modifierValue: ''
                            })
                        }
                    />
                )}

                {modifier === 'careerSkills' && (
                    <Fragment
                        type="inputSelect"
                        title="modifierValue"
                        value=""
                        array={Object.keys(skills).filter(
                            skill => !modifierValue.includes(skill)
                        )}
                        nameObj={skills}
                        handleChange={this.handleList}
                    />
                )}

                {modifiableAttributes.includes(modifier) &&
                    modifier !== 'careerSkills' && (
                        <Fragment
                            type="number"
                            value={modifierValue}
                            title="modifierValue"
                            handleChange={event =>
                                this.setState({
                                    modifierValue: +event.target.value
                                })
                            }
                        />
                    )}

                {Object.keys(skills).includes(modifier) && (
                    <Fragment
                        type="inputSelect"
                        title="modifierValue"
                        value=""
                        nameObj={diceNames}
                        array={[
                            '[blue]',
                            '[black]',
                            '[rmblack]',
                            '[success]',
                            '[advantage]',
                            '[failure]',
                            '[threat]'
                        ]}
                        handleChange={this.handleList}
                    />
                )}

                {Array.isArray(modifierValue) && (
                    <Fragment
                        type="list"
                        title="modifierList"
                        array={modifierValue}
                        nameObj={{ ...skills, diceNames }}
                        handleClear={() => this.setState({ modifierValue: [] })}
                    />
                )}
                <hr />
                <ControlButtonSet
                    mode={this.state.mode}
                    type={'Talent'}
                    handleSubmit={this.handleSubmit}
                    onEditSubmit={this.handleSubmit}
                    onEditCancel={this.initState}
                    disabled={
                        name === '' ||
                        tier === '' ||
                        ranked === '' ||
                        activation === ''
                    }
                />

                <Table>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>TIER</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {customTalents &&
                            Object.keys(customTalents)
                                .sort((a, b) =>
                                    customTalents[a].name >
                                    customTalents[b].name
                                        ? 1
                                        : -1
                                )
                                .map(key => (
                                    <tr key={key}>
                                        <td>{customTalents[key].name}</td>
                                        <td>{customTalents[key].tier}</td>
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
                                                    onClick={
                                                        this.handleDuplicate
                                                    }
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
        customTalents: state.customTalents,
        talents: state.talents,
        skills: state.skills
    };
};

const matchDispatchToProps = dispatch =>
    bindActionCreators({ removeDataSet, addDataSet, modifyDataSet }, dispatch);

export const CustomTalents = connect(
    mapStateToProps,
    matchDispatchToProps
)(CustomTalentsComponent);

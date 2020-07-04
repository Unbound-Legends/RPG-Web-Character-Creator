import { addDataSet, modifyDataSet, removeDataSet } from '@emporium/actions';
import { chars, diceNames, modifiableAttributes } from '@emporium/data-lists';
import { ControlButtonSet, DeleteButton } from '@emporium/ui';
import clone from 'clone';
import React from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Col, Row, Table } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { Fragment } from './Fragments';

class CustomEquipmentComponent extends React.Component<any, any> {
    public state: any = {};

    public componentWillMount = () => this.initState();

    public initState = () => {
        this.setState({
            name: '',
            damage: '',
            range: '',
            skill: 'All',
            critical: '',
            encumbrance: '',
            price: '',
            soak: '',
            defense: '',
            setting: [],
            meleeDefense: '',
            rangedDefense: '',
            qualityRank: '',
            description: '',
            specialQualities: '',
            strainThreshold: 0,
            qualityList: {},
            modifier: false,
            modifierValue: '',
            mode: 'add'
        });
    };

    public handleClose = () => {
        this.initState();
        this.props.handleClose();
    };

    public handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        event.preventDefault();
    };

    public handleAddQuality = () => {
        const data = {
            ...clone(this.state.qualityList),
            [this.state.specialQualities]: this.state.qualityRank
                ? +this.state.qualityRank
                : ''
        };
        this.setState({
            qualityList: data,
            specialQualities: '',
            qualityRank: ''
        });
    };

    public handleSubmit = () => {
        const { type } = this.props;
        // noinspection JSUnusedLocalSymbols
        const {
            range,
            damage,
            skill,
            critical,
            soak,
            defense,
            meleeDefense,
            rangedDefense,
            qualityList: qualities,
            modifierValue,
            modifier: mod,
            mode,
            qualityRank,
            specialQualities,
            strainThreshold,
            ...rest
        } = this.state;
        const modifier = mod ? { [mod]: modifierValue, strainThreshold } : {};
        let data;

        if (type === 'customWeapons') {
            data = {
                ...rest,
                damage,
                range,
                skill,
                critical,
                modifier,
                qualities
            };
        }
        if (type === 'customArmor') {
            data = {
                ...rest,
                soak,
                defense,
                meleeDefense,
                rangedDefense,
                modifier,
                qualities
            };
        }

        if (type === 'customGear') {
            data = { ...rest, modifier, qualities };
        }
        if (mode === 'add') {
            this.props.addDataSet(type, data);
        } else if (mode === 'edit') {
            this.props.modifyDataSet(type, data);
        }
        this.initState();
    };

    public handleDuplicate = event => {
        const type = event.target.getAttribute('type');
        // @ts-ignore
        const { id, ...data } = { ...this.props[type][event.target.name] };
        this.props.addDataSet(type, { ...data, name: `${data.name} (copy)` });
        event.preventDefault();
    };

    public handleDelete = event => {
        const type = event.target.getAttribute('type');
        this.props.removeDataSet(type, this.props[type][event.target.name].id);
        event.preventDefault();
    };

    public handleEdit = event => {
        event.preventDefault();
        const equipment = this.props[event.target.getAttribute('type')][
            event.target.name
        ];
        this.setState({
            ...equipment,
            setting:
                typeof equipment.setting === 'string'
                    ? equipment.setting.split(', ')
                    : equipment.setting,
            qualityList: equipment.qualities ? equipment.qualities : {},
            specialQualities: '',
            qualityRank: '',
            mode: 'edit',
            modifier: equipment.modifier
                ? Object.keys(equipment.modifier)[0]
                : false,
            modifierValue: equipment.modifier
                ? Object.values(equipment.modifier)[0]
                : ''
        });
    };

    public handleList = event => {
        const { modifierValue } = this.state,
            arr = Array.isArray(modifierValue)
                ? [...modifierValue, event.target.value]
                : [event.target.value];
        this.setState({ modifierValue: arr });
        event.preventDefault();
    };

    public buildField = field => {
        const { type, skills, qualities } = this.props;
        const {
            modifier,
            modifierValue,
            specialQualities,
            qualityList,
            qualityRank,
            strainThreshold
        } = this.state;

        switch (field) {
            case 'name':
                return (
                    <Fragment
                        key={field}
                        type="text"
                        title="name"
                        value={this.state[field]}
                        mode={this.state.mode}
                        handleChange={event =>
                            this.setState({ name: event.target.value })
                        }
                    />
                );
            case 'damage':
                return (
                    <Fragment
                        key={field}
                        type="text"
                        value={this.state[field]}
                        title={field}
                        handleChange={event =>
                            this.setState({ [field]: event.target.value })
                        }
                    />
                );
            case 'setting':
                return (
                    <Fragment
                        key={field}
                        type="setting"
                        setting={this.state.setting}
                        setState={selected =>
                            this.setState({ setting: selected })
                        }
                    />
                );
            case 'critical':
            case 'encumbrance':
            case 'price':
            case 'soak':
            case 'defense':
            case 'rangedDefense':
            case 'meleeDefense':
                return (
                    <Fragment
                        key={field}
                        type="number"
                        value={this.state[field]}
                        title={field}
                        handleChange={event =>
                            this.setState({ [field]: +event.target.value })
                        }
                    />
                );
            case 'range':
                return (
                    <Fragment
                        key={field}
                        type="inputSelect"
                        name={field}
                        value={this.state[field]}
                        array={[
                            'Engaged',
                            'Short',
                            'Medium',
                            'Long',
                            'Extreme'
                        ]}
                        handleChange={event =>
                            this.setState({ [field]: event.target.value })
                        }
                    />
                );
            case 'skill':
                return (
                    <Fragment
                        key={field}
                        type="inputSelect"
                        name={field}
                        value={this.state[field]}
                        array={Object.keys(skills).filter(
                            skill => skills[skill].type === 'Combat'
                        )}
                        nameObj={skills}
                        handleChange={event =>
                            this.setState({ [field]: event.target.value })
                        }
                    />
                );
            case 'specialQualities':
                return (
                    <div key={field}>
                        <Fragment
                            type="inputSelect"
                            title="specialQualities"
                            value={specialQualities}
                            array={Object.keys(qualities).filter(quality =>
                                qualities[quality].type.includes(
                                    type.toLowerCase().slice(6)
                                )
                            )}
                            nameObj={qualities}
                            handleChange={event =>
                                this.setState({
                                    specialQualities: event.target.value,
                                    qualityRank: ''
                                })
                            }
                        />

                        {specialQualities && (
                            <div>
                                {qualities[specialQualities] &&
                                    qualities[specialQualities].ranked && (
                                        <Fragment
                                            type="number"
                                            value={qualityRank}
                                            title={'qualityRank'}
                                            handleChange={event =>
                                                this.setState({
                                                    qualityRank:
                                                        event.target.value
                                                })
                                            }
                                        />
                                    )}

                                <Row>
                                    <Col sm="2" className="my-auto" />
                                    <Col className="text-left">
                                        <Button onClick={this.handleAddQuality}>
                                            Add Quality
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        )}

                        {Object.keys(qualityList).length > 0 && (
                            <Fragment
                                type="list"
                                title="Qualities List"
                                array={Object.keys(qualityList)}
                                object={qualityList}
                                nameObj={qualities}
                                handleClear={() =>
                                    this.setState({ qualityList: {} })
                                }
                            />
                        )}
                    </div>
                );
            case 'description':
                return (
                    <Fragment
                        key={field}
                        type="description"
                        value={this.state.description}
                        handleChange={event =>
                            this.setState({ description: event.target.value })
                        }
                    />
                );
            case 'modifier':
                return (
                    <div key={field}>
                        <Fragment
                            type="inputSelect"
                            title="modifier"
                            array={[true, false]}
                            nameObj={{
                                true: { name: 'Yes' },
                                false: { name: 'No' }
                            }}
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
                                array={Object.keys(skills)
                                    .concat(modifiableAttributes, chars)
                                    .sort()}
                                nameObj={skills}
                                handleChange={event =>
                                    this.setState({
                                        modifier: event.target.value,
                                        modifierValue: 1
                                    })
                                }
                            />
                        )}

                        {modifier === 'careerSkills' && (
                            <Fragment
                                type="inputSelect"
                                title="modifierValue"
                                value=""
                                array={Object.keys(skills).filter(skill =>
                                    Array.isArray(modifierValue)
                                        ? !modifierValue.includes(skill)
                                        : true
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

                        {Array.isArray(modifierValue) && (
                            <Fragment
                                type="list"
                                title="modifierList"
                                array={modifierValue}
                                nameObj={{ ...skills, diceNames }}
                                handleClear={() =>
                                    this.setState({ modifierValue: [] })
                                }
                            />
                        )}

                        <Fragment
                            type="numberSelect"
                            title="Strain Threshold Modifier"
                            array={[0, -1]}
                            value={strainThreshold}
                            handleChange={event =>
                                this.setState({
                                    strainThreshold: event.target.value
                                })
                            }
                        />

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
                                    '[threat]',
                                    '1 Free Rank',
                                    '2 Free Ranks',
                                    '3 Free Ranks',
                                    '4 Free Ranks',
                                    '5 Free Ranks'
                                ]}
                                handleChange={this.handleList}
                            />
                        )}
                    </div>
                );
            default:
                return <div />;
        }
    };

    public getFields = type => {
        switch (type) {
            case 'customWeapons':
                return [
                    'name',
                    'damage',
                    'critical',
                    'range',
                    'skill',
                    'encumbrance',
                    'price',
                    'description',
                    'setting',
                    'modifier'
                ];
            case 'customArmor':
                return [
                    'name',
                    'soak',
                    'defense',
                    'rangedDefense',
                    'meleeDefense',
                    'encumbrance',
                    'price',
                    'description',
                    'setting',
                    'modifier'
                ];
            case 'customGear':
                return [
                    'name',
                    'encumbrance',
                    'price',
                    'description',
                    'setting',
                    'modifier'
                ];
            default:
                return [];
        }
    };

    public render() {
        const { type } = this.props;
        return (
            <div>
                {this.getFields(type).map(field => this.buildField(field))}
                {this.buildField('specialQualities')}
                <ControlButtonSet
                    mode={this.state.mode}
                    type={type.replace('custom', '')}
                    handleSubmit={this.handleSubmit}
                    onEditSubmit={this.handleSubmit}
                    onEditCancel={this.initState}
                />
                <Table>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {type &&
                            Object.keys(this.props[type])
                                .sort((a, b) =>
                                    this.props[type][a].name >
                                    this.props[type][b].name
                                        ? 1
                                        : -1
                                )
                                .map(key => (
                                    <tr key={key}>
                                        <td>{this.props[type][key].name}</td>
                                        <td className="text-right">
                                            <ButtonGroup>
                                                <Button
                                                    name={key}
                                                    type={type}
                                                    onClick={this.handleEdit}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    name={key}
                                                    type={type}
                                                    onClick={
                                                        this.handleDuplicate
                                                    }
                                                >
                                                    Duplicate
                                                </Button>
                                                <DeleteButton
                                                    name={key}
                                                    type={type}
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
        armor: state.armor,
        weapons: state.weapons,
        gear: state.gear,
        qualities: state.qualities,
        skills: state.skills,
        customWeapons: state.customWeapons,
        customGear: state.customGear,
        customArmor: state.customArmor
    };
};

const matchDispatchToProps = dispatch =>
    bindActionCreators({ addDataSet, modifyDataSet, removeDataSet }, dispatch);

export const CustomEquipment = connect(
    mapStateToProps,
    matchDispatchToProps
)(CustomEquipmentComponent);

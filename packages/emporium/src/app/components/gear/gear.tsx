import { changeData } from '@emporium/actions';
import { books } from '@emporium/data-lists';
import clone from 'clone';
import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { connect } from 'react-redux';
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Table
} from 'reactstrap';
import { bindActionCreators } from 'redux';
import './gear.scss';

class GearComponent extends React.Component<
    any,
    {
        gearFilter: string;
        bookFilter: string[];
        selected: boolean;
        restrictToSetting: boolean;
    }
> {
    public state = {
        selected: false,
        gearFilter: '',
        bookFilter: [],
        restrictToSetting: false
    };

    public handleAdd = (event): void => {
        const { type, changeData } = this.props;
        const obj = { ...this.props[type] };
        const key = Math.random().toString(36).substr(2, 16);
        obj[key] = { id: event.target.name, carried: true, equipped: false };
        changeData(obj, `${type}`);
        this.handleClose();
        event.preventDefault();
    };

    public handleSelect = event => {
        this.setState({ selected: event.target.value });
        event.preventDefault();
    };

    public handleClose = () => {
        this.setState({ gearFilter: '', bookFilter: [] });
        this.props.handleClose();
    };

    public generateEquipmentTableHeader = () => {
        const { type } = this.props;

        switch (type) {
            case 'equipmentWeapons':
                return (
                    <tr className="text-center">
                        <th>Add</th>
                        <th className="text-left">Name</th>
                        <th className="text-left">Skill</th>
                        <th>DAM</th>
                        <th>CRIT</th>
                        <th>BOOK</th>
                    </tr>
                );
            case 'equipmentArmor':
                return (
                    <tr className="text-center">
                        <th>Add</th>
                        <th className="text-left">Name</th>
                        <th>Soak</th>
                        <th>Defense</th>
                        <th>BOOK</th>
                    </tr>
                );
            case 'equipmentGear':
                return (
                    <tr className="text-center">
                        <th>Add</th>
                        <th className="text-left">Name</th>
                        <th>Price</th>
                        <th>BOOK</th>
                    </tr>
                );
            default:
                break;
        }
    };

    public handleSettingRestrictionChange = (event): void => {
        const value = event.target.checked;
        this.setState({
            restrictToSetting: !!value
        });
    };

    public filterItem(
        item: string,
        filter: string,
        bookFilter: string[],
        restrictToSetting: boolean
    ): boolean {
        const { weapons, armor, gear, skills, type } = this.props;
        if (!filter && !bookFilter) {
            return true;
        }

        let selectedItem: any = null;
        switch (type) {
            case 'equipmentWeapons':
                selectedItem = weapons[item];
                break;
            case 'equipmentArmor':
                selectedItem = armor[item];
                break;
            case 'equipmentGear':
                selectedItem = gear[item];
                break;
            default:
                return false;
        }

        if (filter) {
            const name = (selectedItem?.name || '')
                .toLowerCase()
                .replace(/ /g, '');

            const passes = name.indexOf(filter) !== -1;
            if (!passes) {
                return false;
            }
        }

        if (bookFilter.length && bookFilter.indexOf('All') === -1) {
            const passes =
                bookFilter
                    .map(x => x?.toLowerCase())
                    .indexOf(selectedItem?.book?.toLowerCase()) !== -1;

            if (!passes) {
                return false;
            }
        }

        const { setting } = this.props;
        if (
            restrictToSetting &&
            setting.length > 0 &&
            setting.indexOf('All') === -1
        ) {
            let passes = false;
            for (let i = 0; i < setting.length; i++) {
                if ((selectedItem?.setting?.indexOf(setting[i]) ?? -1) !== -1) {
                    passes = true;
                    break;
                }
            }

            if (!passes) {
                return false;
            }
        }

        return true;
    }

    public generateEquipmentTableBody = (item: string) => {
        const { weapons, armor, gear, skills, type } = this.props;
        switch (type) {
            case 'equipmentWeapons':
                return (
                    <tr key={item}>
                        <td>
                            <Button
                                color="secondary"
                                name={item}
                                onClick={this.handleAdd}
                            >
                                +
                            </Button>
                        </td>
                        <td>{weapons[item].name}</td>
                        <td>
                            {skills[weapons[item].skill] &&
                                skills[weapons[item].skill].name}
                        </td>
                        <td className="text-center">{weapons[item].damage}</td>
                        <td className="text-center">
                            {weapons[item].critical}
                        </td>
                        <td>{weapons[item].book || 'Custom'}</td>
                    </tr>
                );

            case 'equipmentArmor':
                return (
                    <tr key={item}>
                        <td>
                            <Button
                                color="secondary"
                                name={item}
                                onClick={this.handleAdd}
                            >
                                +
                            </Button>
                        </td>
                        <td>{armor[item].name}</td>
                        <td className="text-center">{armor[item].soak}</td>
                        <td className="text-center">{armor[item].defense}</td>
                        <td>{armor[item].book || 'Custom'}</td>
                    </tr>
                );
            case 'equipmentGear':
                return (
                    <tr key={item}>
                        <td>
                            <Button
                                color="secondary"
                                name={item}
                                onClick={this.handleAdd}
                            >
                                +
                            </Button>
                        </td>
                        <td>{gear[item].name}</td>
                        <td className="text-center">{gear[item].price}</td>
                        <td>{gear[item].book || 'Custom'}</td>
                    </tr>
                );
            default:
                break;
        }
    };

    public handleFilterChange(event): void {
        const filterValue = (event?.target?.value || '')
            .trim()
            .toLowerCase()
            .replace(/ /g, '');

        this.setState({
            gearFilter: filterValue
        });
    }

    public render() {
        const { type, modal, weapons, armor, gear, theme } = this.props;
        let data;
        switch (type) {
            case 'equipmentWeapons':
                data = clone(weapons);
                break;
            case 'equipmentArmor':
                data = clone(armor);
                break;
            case 'equipmentGear':
                data = clone(gear);
                break;
            default:
                break;
        }

        return (
            <Modal
                className={`body-${theme} gear-modal`}
                isOpen={!!modal}
                toggle={this.handleClose}
            >
                <ModalHeader toggle={this.handleClose}>
                    Select your {type.toString().slice(9)}
                </ModalHeader>
                <ModalBody className="m-1">
                    <div>
                        <Typeahead
                            id={`settingChooser`}
                            multiple={true}
                            options={books}
                            placeholder="Book Filter"
                            clearButton={true}
                            onChange={selected =>
                                this.setState({
                                    bookFilter: selected.includes('All')
                                        ? ['All']
                                        : selected
                                })
                            }
                        />
                        <input
                            className="item-filter"
                            type="text"
                            placeholder="Name Filter"
                            onChange={this.handleFilterChange.bind(this)}
                        />
                    </div>
                    <Row className="table-container">
                        <Table>
                            <thead>{this.generateEquipmentTableHeader()}</thead>
                            <tbody>
                                {data &&
                                    Object.keys(data)
                                        .sort()
                                        .filter(item =>
                                            this.filterItem(
                                                item,
                                                this.state?.gearFilter,
                                                this.state?.bookFilter,
                                                this.state?.restrictToSetting
                                            )
                                        )
                                        .map(item =>
                                            this.generateEquipmentTableBody(
                                                item
                                            )
                                        )}
                            </tbody>
                        </Table>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <span
                        className="settings-restriction"
                        title="By enabling this, you restrict options to only those found in your selected settings"
                    >
                        <label htmlFor="settingsRestriction">
                            Restrict to Settings
                        </label>
                        <input
                            id="settingsRestriction"
                            type="checkbox"
                            checked={this.state.restrictToSetting}
                            onChange={this.handleSettingRestrictionChange}
                        />
                    </span>
                    <Button onClick={this.handleClose}>Close</Button>
                </ModalFooter>
            </Modal>
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
        equipmentArmor: state.equipmentArmor,
        equipmentGear: state.equipmentGear,
        equipmentWeapons: state.equipmentWeapons,
        theme: state.theme,
        setting: state.setting
    };
};

const matchDispatchToProps = dispatch =>
    bindActionCreators({ changeData }, dispatch);

export const Gear = connect(
    mapStateToProps,
    matchDispatchToProps
)(GearComponent);

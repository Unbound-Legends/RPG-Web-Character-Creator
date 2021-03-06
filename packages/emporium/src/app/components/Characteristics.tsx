import { changeData } from '@emporium/actions';
import { chars } from '@emporium/data-lists';
import * as images from '@emporium/images';
import { characteristics } from '@emporium/selectors';
import React from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { bindActionCreators } from 'redux';

class CharacteristicsComponent extends React.Component<any, any> {
    public countXP = () => {
        const { archetypes, archetype, creationCharacteristics } = this.props;
        let xp = 0;
        if (!archetype || !archetypes[archetype]) {
            return 0;
        }

        //starting characteristics
        const startingCharacteristics = archetypes[archetype];

        Object.keys(creationCharacteristics).forEach(characteristic => {
            const points = creationCharacteristics[characteristic];
            for (let i = 0; points > i; i++) {
                xp += (startingCharacteristics[characteristic] + i + 1) * 10;
            }
        });
        return xp;
    };

    public handleClick = event => {
        const {
            creationCharacteristics,
            characteristics,
            changeData
        } = this.props;
        const newObj = { ...creationCharacteristics };
        const characteristic = event.target.value;
        if (event.target.name === 'Up') {
            if (characteristics[characteristic] >= 5) {
                alert(`You have maxed out ${characteristic}`);
                return;
            }
            newObj[characteristic]++;
        }
        if (event.target.name === 'Down') {
            if (0 >= creationCharacteristics[characteristic]) {
                alert(`${characteristic} cannot be decreased further`);
                return;
            }
            newObj[characteristic]--;
        }
        changeData(newObj, 'creationCharacteristics');
    };

    public render() {
        const { characteristics, modal, handleClose, theme } = this.props;
        return (
            <Modal
                className={`body-${theme}`}
                isOpen={modal}
                toggle={handleClose}
            >
                <ModalHeader toggle={handleClose}>
                    Modify Characteristics
                </ModalHeader>
                <ModalBody className="m-1 text-left">
                    <Row>Total XP: {this.countXP()}</Row>
                    <Row className="justify-content-center">
                        {chars.map(stat => (
                            <div key={stat} className="m-2 text-center">
                                <div
                                    className={`imageBox characteristic characteristic-${stat}`}
                                >
                                    <img
                                        src={images[theme][stat]}
                                        alt=""
                                        className="svg"
                                    />
                                    <Row
                                        className={`characteristicValue characteristicValue-${theme}`}
                                    >
                                        {characteristics[stat]}
                                    </Row>
                                </div>
                                <ButtonGroup>
                                    <Button
                                        value={stat}
                                        name="Up"
                                        onClick={this.handleClick}
                                    >
                                        ↑
                                    </Button>
                                    <Button
                                        value={stat}
                                        name="Down"
                                        onClick={this.handleClick}
                                    >
                                        ↓
                                    </Button>
                                </ButtonGroup>
                            </div>
                        ))}
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleClose}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        archetype: state.archetype,
        archetypes: state.archetypes,
        creationCharacteristics: state.creationCharacteristics,
        theme: state.theme,
        characteristics: characteristics(state)
    };
};

const matchDispatchToProps = dispatch =>
    bindActionCreators({ changeData }, dispatch);

export const Characteristics = connect(
    mapStateToProps,
    matchDispatchToProps
)(CharacteristicsComponent);

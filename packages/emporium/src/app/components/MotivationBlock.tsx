import { changeData } from '@emporium/actions';
import clone from 'clone';
import { random } from 'lodash-es';
import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardFooter, CardHeader, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { bindActionCreators } from 'redux';

class MotivationBlockComponent extends React.Component<any, any> {
    public constructor(props) {
        super(props);
        this.state = {
            description: props.masterMotivations[props.type]
                ? props.masterMotivations[props.type].description
                : ''
        };
    }

    public handleChange = event => {
        this.setState({ description: event.target.value });
        event.preventDefault();
    };

    public handleSelect = event => {
        const { masterMotivations, type, motivations, changeData } = this.props;
        const obj = clone(masterMotivations);
        obj[type] = {
            key: event.target.value,
            description: motivations[event.target.value]
                ? motivations[event.target.value].description
                : ''
        };
        changeData(obj, 'masterMotivations');
        event.preventDefault();
    };

    public handleBlur = event => {
        const { masterMotivations, type, changeData } = this.props;
        const obj = clone(masterMotivations);
        obj[type].description = this.state.description;
        changeData(obj, 'masterMotivations');
        event.preventDefault();
    };

    public handleClick = () => {
        const { motivations, type, masterMotivations, changeData } = this.props;
        const list = Object.keys(motivations).filter(
            key => motivations[key].type === type
        );
        const newKey = list[random(list.length - 1)];
        const obj = clone(masterMotivations);
        obj[type] = {
            key: newKey,
            description: motivations[newKey].description
        };
        changeData(obj, 'masterMotivations', false);
    };

    public render() {
        const { type, masterMotivations, motivations } = this.props;
        const name = masterMotivations[type] ? masterMotivations[type].key : '';
        const { description } = this.state;
        return (
            <Card className="m-2 motivationCard">
                <CardHeader>
                    <InputGroup>
                        <InputGroupAddon className="m-auto" addonType="prepend">
                            {type}:
                        </InputGroupAddon>
                        <Input
                            type="select"
                            bsSize="sm"
                            onChange={this.handleSelect}
                            style={{ marginLeft: '1vw' }}
                            value={name}
                        >
                            <option value="" />
                            {Object.keys(motivations)
                                .filter(key => motivations[key].type === type)
                                .sort()
                                .map(key => (
                                    <option key={key} value={key}>
                                        {motivations[key].name}
                                    </option>
                                ))}
                        </Input>
                    </InputGroup>
                </CardHeader>
                <CardBody>
                    <textarea
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                        rows={10}
                        style={{ width: '100%' }}
                        className="textField"
                        maxLength={1000}
                        placeholder={description ? '' : `Enter your ${type}...`}
                        value={description}
                    ></textarea>
                </CardBody>
                <CardFooter>
                    <button onClick={this.handleClick}>Random</button>
                </CardFooter>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {
        masterMotivations: state.masterMotivations,
        motivations: state.motivations
    };
};

const matchDispatchToProps = dispatch =>
    bindActionCreators({ changeData }, dispatch);

export const MotivationBlock = connect(
    mapStateToProps,
    matchDispatchToProps
)(MotivationBlockComponent);

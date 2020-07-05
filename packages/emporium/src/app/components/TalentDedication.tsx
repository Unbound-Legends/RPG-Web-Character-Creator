import { changeData } from '@emporium/actions';
import { characteristics } from '@emporium/selectors';
import React from 'react';
import { connect } from 'react-redux';
import { Input, Row } from 'reactstrap';
import { bindActionCreators } from 'redux';

class TalentDedicationComponent extends React.Component<any, any> {
    public state = { options: [] };

    public UNSAFE_componentWillMount() {
        const { characteristics, talentModifiers, row } = this.props;
        const options = [];
        Object.keys(characteristics).forEach(characteristic => {
            if (
                5 > characteristics[characteristic] &&
                !Object.values(talentModifiers.Dedication).includes(
                    characteristic
                )
            ) {
                options.push(characteristic);
            }
        });
        talentModifiers.Dedication[row] &&
            options.push(talentModifiers.Dedication[row]);
        options.sort();
        this.setState({ options: options });
    }

    public componentWillUnmount() {
        this.props.handleDedicationChange('');
    }

    public handleChange = event => {
        this.props.handleDedicationChange(event.target.value);
        event.preventDefault();
    };

    public render() {
        const { options } = this.state;
        const { selection } = this.props;
        return (
            <Row>
                <b>Select a characteristic to increase:</b>
                <Input
                    type="select"
                    value={selection}
                    onChange={this.handleChange}
                >
                    <option value="" />
                    {options.map(key => (
                        <option value={key} key={key}>
                            {key}
                        </option>
                    ))}
                </Input>
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {
        characteristics: characteristics(state),
        talentModifiers: state.talentModifiers
    };
};

const matchDispatchToProps = dispatch =>
    bindActionCreators({ changeData }, dispatch);

export const TalentDedication = connect(
    mapStateToProps,
    matchDispatchToProps
)(TalentDedicationComponent);

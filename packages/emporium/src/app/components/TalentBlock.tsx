import { talentCount } from '@emporium/selectors';
import React from 'react';
import DynamicFont from 'react-dynamic-font';
import { connect } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { Description } from './Description';
import { TalentSelection } from './TalentSelection';

class TalentBlockComponent extends React.Component<any, any> {
    public state = { modal: false };

    public activation = () => {
        const { talents, talentKey } = this.props;
        if (talentKey === '') {
            return 'var(--light)';
        }

        if (!talents[talentKey]) {
            return 'var(--red)';
        }

        if (talents[talentKey].activation) {
            return 'var(--orange)';
        } else {
            return 'var(--lightblue)';
        }
    };

    public render() {
        const { talents, talentKey, row, tier } = this.props;
        const talent = talents[talentKey];
        const color = this.activation();
        return (
            <div>
                <TalentSelection
                    modal={this.state.modal}
                    handleClose={() => this.setState({ modal: false })}
                    row={row}
                    tier={tier}
                    talentKey={talentKey}
                />
                <Card
                    onClick={() => this.setState({ modal: true })}
                    className="m-1 talentCard"
                >
                    <CardHeader
                        className="p-1 text-center"
                        style={{ backgroundColor: color }}
                    >
                        <DynamicFont
                            content={
                                talentKey === ''
                                    ? 'inactive'
                                    : talent
                                    ? talent.name
                                    : 'Missing Talent'
                            }
                        />
                    </CardHeader>
                    <CardBody className="p-1 talentDesc">
                        <Description
                            text={
                                talent
                                    ? talent.description
                                        ? `${talent.description}\n\n ${
                                              talent.activation
                                                  ? talent.turn
                                                  : ''
                                          }`
                                        : ''
                                    : ''
                            }
                        />
                    </CardBody>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        masterTalents: state.masterTalents,
        talents: state.talents,
        talentCount: talentCount(state)
    };
};

export const TalentBlock = connect(mapStateToProps)(TalentBlockComponent);

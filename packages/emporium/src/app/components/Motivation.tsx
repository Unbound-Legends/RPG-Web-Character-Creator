import React from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import { MotivationBlock } from './MotivationBlock';

class MotivationComponent extends React.Component<any> {
    public render() {
        const { theme } = this.props;
        return (
            <div>
                <Row className="justify-content-end">
                    <div className={`header header-${theme}`}>MOTIVATIONS</div>
                </Row>
                <hr />
                <Row className="justify-content-center">
                    {['Strength', 'Flaw', 'Desire', 'Fear'].map(type => (
                        <MotivationBlock key={type} type={type} />
                    ))}
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        theme: state.theme
    };
};

export const Motivation = connect(mapStateToProps)(MotivationComponent);

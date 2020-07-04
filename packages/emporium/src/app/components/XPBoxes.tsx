import React from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import { bindActionCreators } from 'redux';
import * as images from '@emporium/images';
import { changeData } from '@emporium/actions';
import { totalXP, usedXP } from '@emporium/selectors';
import { XPPopup } from './XPPopup';

class XPBoxesComponent extends React.Component<any, any> {
    public state = { modal: false };

    public render() {
        const { totalXP, usedXP, theme } = this.props;
        return (
            <div>
                <div
                    className={`imageBox xpBox totalXP`}
                    onClick={() => this.setState({ modal: true })}
                >
                    <img src={images[theme].TotalXp} alt="" className="svg" />
                    <Row className={`xpValue xpValue-${theme}`}>{totalXP}</Row>
                </div>

                <div
                    className={`imageBox xpBox availableXP availableXP-${theme}`}
                    onClick={() => this.setState({ modal: true })}
                >
                    <img
                        src={images[theme].AvailableXp}
                        alt=""
                        className="svg"
                    />

                    <Row className={`xpValue xpValue-${theme}`}>
                        {totalXP - usedXP}
                    </Row>
                </div>
                <XPPopup
                    modal={this.state.modal}
                    handleClose={() => this.setState({ modal: false })}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        totalXP: totalXP(state),
        usedXP: usedXP(state),
        theme: state.theme
    };
};

const matchDispatchToProps = dispatch =>
    bindActionCreators({ changeData }, dispatch);

export const XPBoxes = connect(
    mapStateToProps,
    matchDispatchToProps
)(XPBoxesComponent);

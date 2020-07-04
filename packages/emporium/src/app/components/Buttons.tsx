import { changeData, changePrintContent } from '@emporium/actions';
import React from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Col, Input, Label, Row } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { UserButton } from './UserButton';
import { PrintLayout } from './printLayout';

class ButtonsComponent extends React.Component<any> {
    public render(): React.ReactNode {
        const { changePrintContent, theme, themes, changeData } = this.props;
        return (
            <Row className="m-1 justify-content-between d-print-none theme-select-container">
                <Col
                    className="d-inline-flex"
                    sm={4}
                    style={{ fontSize: '0.7rem' }}
                >
                    <Label for="theme" className="mr-1 my-auto">
                        <b>THEME</b>
                    </Label>
                    <Input
                        id="theme"
                        type="select"
                        value={theme}
                        bsSize="sm"
                        onChange={event =>
                            changeData(event.target.value, 'theme')
                        }
                    >
                        {Object.keys(themes)
                            .sort()
                            .map(key => (
                                <option value={key} key={key}>
                                    {themes[key]}
                                </option>
                            ))}
                    </Input>
                </Col>
                <div className="text-right print-button-container">
                    <ButtonGroup>
                        <Button
                            size="sm"
                            onClick={() => changePrintContent(<PrintLayout />)}
                        >
                            Print
                        </Button>
                        <UserButton />
                    </ButtonGroup>
                </div>
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {
        theme: state.theme,
        themes: state.themes
    };
};

const matchDispatchToProps = dispatch =>
    bindActionCreators({ changePrintContent, changeData }, dispatch);

export const Buttons = connect(
    mapStateToProps,
    matchDispatchToProps
)(ButtonsComponent);

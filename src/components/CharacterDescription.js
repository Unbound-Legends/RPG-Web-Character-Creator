import clone from 'clone';
import React from 'react';
import { connect } from 'react-redux';
import { Col, Input, Label, Row } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { changeData } from '../redux/actions';

class CharacterDescriptionComponent extends React.Component {
    constructor(props) {
        super(props);
        const {
            gender = '',
            age = '',
            height = '',
            build = '',
            hair = '',
            eyes = '',
            features = ''
        } = props.description;
        this.state = {
            gender,
            age,
            height,
            build,
            hair,
            eyes,
            features
        };
    }

    handleBlur = event => {
        const { changeData, description } = this.props;
        let obj = clone(description);
        obj[event.target.name] = this.state[event.target.name];
        changeData(obj, 'description');
        event.preventDefault();
    };

    render() {
        const { theme } = this.props;
        return (
            <div>
                <Row className="justify-content-end">
                    <div className={`header header-${theme}`}>
                        CHARACTER DESCRIPTION
                    </div>
                </Row>
                <hr />
                {['gender', 'age', 'height', 'build', 'hair', 'eyes'].map(
                    aspect => (
                        <Row key={aspect} className="align-items-center">
                            <Label for={aspect} sm={2}>
                                <b>{aspect.toLocaleUpperCase()}</b>
                            </Label>
                            <Col md="10" className="align-self-center">
                                <Input
                                    value={this.state[aspect]}
                                    id={aspect}
                                    maxLength="25"
                                    bsSize="sm"
                                    name={aspect}
                                    onBlur={this.handleBlur}
                                    onChange={event =>
                                        this.setState({
                                            [aspect]: event.target.value
                                        })
                                    }
                                />
                            </Col>
                            <hr />
                        </Row>
                    )
                )}
                <Row>
                    <Label sm={6} for="features">
                        <b>NOTABLE FEATURES</b>
                    </Label>
                    <Col sm={12}>
                        <Input
                            onChange={event =>
                                this.setState({ features: event.target.value })
                            }
                            onBlur={this.handleBlur}
                            type="textarea"
                            rows="12"
                            className="w-100 my-auto"
                            maxLength="1000"
                            name="features"
                            id="features"
                            value={this.state.features}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        description: state.description,
        theme: state.theme
    };
};

const matchDispatchToProps = dispatch =>
    bindActionCreators({ changeData }, dispatch);

export const CharacterDescription = connect(
    mapStateToProps,
    matchDispatchToProps
)(CharacterDescriptionComponent);

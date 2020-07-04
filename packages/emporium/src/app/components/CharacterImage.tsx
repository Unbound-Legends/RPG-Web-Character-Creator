import { changeData } from '@emporium/actions';
import * as images from '@emporium/images';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { bindActionCreators } from 'redux';

class CharacterImageComponent extends React.Component<any, any> {
    public state = { modal: false, text: this.props.description.image };
    public img: any = null;

    public handleBlur = event => {
        const { changeData, description } = this.props;
        const obj = { ...description };
        obj.image = this.state.text;
        changeData(obj, 'description');
        event.preventDefault();
    };

    public render() {
        const { description, theme } = this.props;
        const { modal, text } = this.state;
        return (
            <div className="align-items-center m-auto">
                <Row className="justify-content-end">
                    <div className={`header header-${theme}`}>
                        CHARACTER IMAGE
                    </div>
                    <Button
                        color="link"
                        className="noUnderLine p-0"
                        onClick={() => this.setState({ modal: true })}
                    >
                        ⚙
                    </Button>
                </Row>
                <hr />
                <Row className="justify-content-center">
                    <img
                        className="characterImage m-1 w-100 h-100"
                        src={description.image ? description.image : ''}
                        alt="not found"
                        ref={img => (this.img = img)}
                        onError={() => (this.img.src = images.user)}
                    />
                </Row>
                <Modal
                    className={`body-${theme}`}
                    isOpen={modal !== false}
                    toggle={() => this.setState({ modal: false })}
                >
                    <ModalHeader toggle={() => this.setState({ modal: false })}>
                        Edit Character Image
                    </ModalHeader>
                    <ModalBody className="m-3">
                        <div>
                            <Row>CHARACTER IMAGE URL:</Row>
                            <Input
                                type="text"
                                value={text}
                                onBlur={this.handleBlur}
                                onChange={event =>
                                    this.setState({ text: event.target.value })
                                }
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => this.setState({ modal: false })}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
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

export const CharacterImage = connect(
    mapStateToProps,
    matchDispatchToProps
)(CharacterImageComponent);

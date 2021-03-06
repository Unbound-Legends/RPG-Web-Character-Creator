import React from 'react';
import { connect } from 'react-redux';
import { Input, Row } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { changeData } from '@emporium/actions';

class NotesComponent extends React.Component<any, any> {
    public constructor(props) {
        super(props);
        this.state = {
            notes: props.description.notes
        };
    }

    public render() {
        const { notes } = this.state;
        const { changeData, description, theme } = this.props;
        return (
            <div>
                <Row className="justify-content-end">
                    <div className={`header header-${theme}`}>NOTES</div>
                </Row>
                <hr />
                <Row className="justify-content-center mx-auto">
                    <Input
                        onBlur={() =>
                            changeData({ ...description, notes }, 'description')
                        }
                        onChange={event =>
                            this.setState({ notes: event.target.value })
                        }
                        type="textarea"
                        className="w-100"
                        rows="31"
                        maxLength="5000"
                        value={notes}
                    />
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

export const Notes = connect(
    mapStateToProps,
    matchDispatchToProps
)(NotesComponent);

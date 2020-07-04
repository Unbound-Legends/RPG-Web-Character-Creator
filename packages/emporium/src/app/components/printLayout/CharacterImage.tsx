import * as images from '@emporium/images';
import React from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';

class Component extends React.Component<any> {
    public img: { src: string } = null;

    public render(): React.ReactNode {
        const { description, theme } = this.props;
        return (
            <div>
                <Row className="justify-content-end">
                    <div className={`header header-${theme}`}>
                        CHARACTER IMAGE
                    </div>
                </Row>
                <hr />
                <img
                    className="characterImage m-1 w-100 h-100"
                    src={description.image ? description.image : ''}
                    alt="not found"
                    ref={img => (this.img = img)}
                    onError={() => (this.img.src = images.user)}
                />
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

export const CharacterImage = connect(mapStateToProps)(Component);

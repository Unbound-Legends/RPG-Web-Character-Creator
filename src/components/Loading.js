import React from 'react';
import { Progress } from 'reactstrap';

export class Loading extends React.Component {
    state = { time: 0 };

    componentWillUnmount() {
        clearInterval(this.timer);
        this.setState({ time: 100 });
    }

    componentDidMount() {
        this.timer = setInterval(
            () => this.setState({ time: this.state.time + 4 }),
            100
        );
    }

    render() {
        return (
            <div className="text-center mt-5">
                <h1>LOADING</h1>
                <Progress
                    animated
                    className="w-50 mx-auto"
                    value={this.state.time}
                />
            </div>
        );
    }
}

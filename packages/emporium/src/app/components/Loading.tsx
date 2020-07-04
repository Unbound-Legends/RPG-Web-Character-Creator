import React from 'react';
import { Progress } from 'reactstrap';

export class Loading extends React.Component<any, any> {
    public state = { time: 0 };
    public timer: any = null;

    public componentWillUnmount() {
        clearInterval(this.timer);
        this.setState({ time: 100 });
    }

    public componentDidMount() {
        this.timer = setInterval(
            () => this.setState({ time: this.state.time + 4 }),
            100
        );
    }

    public render() {
        return (
            <div className="text-center mt-5">
                <h1>LOADING</h1>
                <Progress
                    animated
                    className="w-50 mx-auto"
                    value={this.state.time}
                />
                <div>
                    Comments? Questions? Concerns?<br />
                    <a href="https://discord.gg/wc7BGW5">Join our Discord!</a>
                </div>
            </div>
        );
    }
}

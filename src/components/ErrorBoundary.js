import LogRocket from 'logrocket';
import React from 'react';

export class ErrorBoundary extends React.Component {
	state = {
		hasError: false,
		error: null,
		info: null
	};

	componentDidCatch(error, info) {
		this.setState({
			hasError: true,
			error: error,
			info: info
		});
		LogRocket.captureException(error);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div>
					<h1>Oops!!! Something went wrong</h1>
					<p>The error: {this.state.error.toString()}</p>
					<p>Where it occurred: {this.state.info.componentStack}</p>
				</div>
			);
		} else return this.props.children;
	}
}
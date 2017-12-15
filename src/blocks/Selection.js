import React, { Component } from 'react';
import '../index.css';

class Selection extends Component {
  constructor() {
      super();
      this.state = {
        value: '',
      };
  }

  componentDidMount() {
    this.setState({value: this.props.value});
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.props.submit(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
    <div>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <select value={this.state.value} className='talent-select' onChange={this.handleChange.bind(this)}>
        {Object.keys(this.props.data).map((key)=>
          <option value={key} key={key}>{this.props.data[key].name}</option>
        )}
        </select>
        <input type="submit" value="Submit" />
      </form>
        {this.props.data[this.state.value] &&
          <h3>{this.props.data[this.state.value].name}</h3>
        }
    </div>
    )
  }
}
export default Selection;

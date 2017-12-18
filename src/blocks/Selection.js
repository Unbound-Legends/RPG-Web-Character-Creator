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
        <select value={this.state.value} className='popup-select' onChange={this.handleChange.bind(this)}>
        {Object.keys(this.props.data).map((key)=>
          <option value={key} key={key}>{this.props.data[key].name}</option>
        )}
        </select>

        {this.props.data[this.state.value] &&
          <p>
            <br/>
            <b>Name:</b> {this.props.data[this.state.value].name}<br/>
            <b>Tier:</b> {this.props.data[this.state.value].tier}<br/>
            <b>Activation:</b> {this.props.data[this.state.value].activation ? 'Active' : 'Passive' }<br/>
            {this.props.data[this.state.value].ranked ? <b>Ranked</b> : <b>Not Ranked</b> }<br/>
            {this.props.data[this.state.value].turn}<br/>
          <b>Description:</b> {this.props.data[this.state.value].description}<br/>
          </p>
        }

        <input type="submit" value="Submit" />
      </form>


    </div>
    )
  }
}
export default Selection;

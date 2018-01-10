import React from 'react';
const seedrandom = require('seedrandom');
var rng = seedrandom('added entropy.', { entropy: true });


export default class MotivationBlock extends React.Component {
  state = {text: this.props.description, name: this.props.name};

  componentWillReceiveProps(nextProps) {
    this.setState({text: nextProps.description, name: nextProps.name})
  }

  handleBlur = (event) => {
    this.props.textEdit(this.props.type, this.props.name, event.target.value);
    event.preventDefault();
  }

  handleSelect = (event) => {
    this.props.select(this.props.type, event.target.value);
    event.preventDefault();
  }

  handleChange = (event) => {
    this.setState({text: event.target.value});
    event.preventDefault();
  }

  handleClick = () => {
    const {list} = this.props;
    let key = list[Math.floor(rng() * list.length)];
    this.props.select(this.props.type, key);
  }

  render() {
    const {type, description, list} = this.props;
    const {text, name} = this.state;
    return (
    <div className='module motivation-module'>
      <div className='motivation-title'>{type}:
          <select onChange={this.handleSelect} style={{marginLeft: '1vw'}} value={name}>
            <option></option>
            {list.map((key)=>
              <option key={key}>{key}</option>
            )}
          </select>
      </div>
        <textarea onBlur={this.handleBlur}
                  onChange={this.handleChange}
                  rows='10'
                  cols='45'
                  className='textField'
                  placeholder={description ? '' : `Enter your ${type}...`}
                  value={description ? text : ''}>
        </textarea>
        <button onClick={this.handleClick}>Random</button>
    </div>
    )
  }
}

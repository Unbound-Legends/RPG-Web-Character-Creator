import React from 'react';

export default class SkillRow extends React.Component {
  state = {show: this.props.masterSkill.show}

  handleChange = () => {
    this.props.handleChange(this.props.type, 'show', !this.state.show);
    this.setState({show: !this.state.show})
  }

  render() {
    const {skill} = this.props;
    const {show} = this.state;
    return (
      <div className='skill-row'>
        <div className='skill-cell'>
          <form>
            <input type='checkbox' defaultChecked={show} onChange={this.handleChange}/>
          </form>
        </div>
        <div className='skill-cell'>
          {skill.name}
        </div>
      </div>
    )
  }
}

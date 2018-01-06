import React from 'react';
import Description from './Description';

export default class SkillRow extends React.Component {
  state = {rank: this.props.masterSkill.rank, show: 'skill-row', dice: '', checked: this.props.masterSkill.career};

  componentDidMount() {
    this.checkShow(this.props.masterSkill.show);
    this.calcDice(this.props.characteristics[this.props.skill.characteristic], this.state.rank);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({rank: nextProps.masterSkill.rank});
    this.setState({checked : nextProps.masterSkill.career})
    this.checkShow(nextProps.masterSkill.show);
    this.calcDice(nextProps.characteristics[nextProps.skill.characteristic], nextProps.masterSkill.rank);
  }

  checkShow = (show) => {
    show ? this.setState({show: 'skill-row'}) : this.setState({show: 'skill-row-hide'})
  }

  calcDice = (characteristic, rank) => {
    let dice, upgrade = 0;
    let text = '';
    if (characteristic>=rank) {
      dice=characteristic;
      upgrade=characteristic-rank;
    } else {
      dice=rank;
      upgrade=rank-characteristic;
    }
    for (let i=dice; i>0; i--) {
      if (i>upgrade) text += '[yellow] ';
      else text += '[green] ';
    }
    this.setState({dice: text});
  }

  handleRankChange = (event) => {
    this.props.handleChange(this.props.type, 'rank', event.target.value);
    event.preventDefault();
  }

  render() {
    const {skill} = this.props;
    const {rank, show, dice, checked} = this.state;
    return (
      <div className={show}>
        <div className='skill-cell'>
          {skill.name}
        </div>
        <div className='skill-cell'>
          {skill.characteristic}
        </div>
        <div className='skill-cell'>
          <input type='checkbox' checked={checked} readOnly/>
        </div>
        <div className='skill-cell'>
          <select defaultValue={rank} onChange={this.handleRankChange}>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div className='skill-cell'>
          <Description text={dice}/>
        </div>
      </div>
    )
  }
}

import React from 'react';
import popup from 'react-popup';
import Selection from '../blocks/Selection';
import StatBlock from '../blocks/StatBlock';
import talents from '../data/talents';
import '../index.css';
import '../popup.css';

export default class TalentBlock extends React.Component {
  state = {activation: '', talent: talents[this.props.talentKey]};

  componentDidMount() {
    this.activation(this.props.talentKey);
  }

  componentWillReceiveProps(nextProps){
    this.setState({talent: talents[nextProps.talentKey]});
    this.activation(nextProps.talentKey);
  }

  select = (key) => {
    this.props.submit(key);
    popup.close();
  }

  activation = (key) => {
    if (talents[key] === undefined) this.setState({activation: 'inactive'});
    else {
      if (talents[key].activation) this.setState({activation: 'active'});
      else this.setState({activation: 'passive'});
    }
  }

  makeList = (cb) => {
    const {tier, masterTalents} = this.props;
    let count = {};
    let options = [];
    Object.keys(masterTalents).forEach((row)=>{
      Object.keys(masterTalents[row]).forEach((tier)=>{
        let talent = masterTalents[row][tier];
        if (talent !== '') count[talent] = count[talent] ? count[talent]+1 : 1;
      })
    })
    Object.keys(talents).forEach((key)=>{
      //talent from this tier and has not been selected already
      if (tier===talents[key].tier && !count[key]) options.push(key);
      //talent is ranked and has been selected enough for this tier
      if (talents[key].ranked && ((talents[key].tier+count[key])===tier)) options.push(key);
    })

    options.sort();
    cb(options);
  }

  selectPopup = () => {
    this.makeList((options) => {
      popup.create({
        title: 'Talent',
        className: 'alert',
        content: (
          <Selection options={options} data={talents} value={this.props.talentKey} submit={this.select}/>
        ),
      })
    })
  }

  render() {
    const {talent, activation} = this.state;

    return (
      <StatBlock  onClick={this.selectPopup}
                  textTop={talent &&<b>{talent.name}</b>}
                  textBottom={talent ? talent.description : 'inactive'}
                  block='talent'
                  topMod={activation} />
    )
  }
}

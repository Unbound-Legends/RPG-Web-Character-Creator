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
    talents[key] ?
    talents[key].activation ? this.setState({activation: 'active'}) : this.setState({activation: 'passive'}) :
    this.setState({activation: 'inactive'})
  }

  makeOptions = (cb) => {
    const {tier, row, count, masterTalents} = this.props;
      let options = [];
      Object.keys(talents).forEach((key)=>{
        //checked to make surre the improved and supreme talensts aren't selected first
        if (key.includes('Improved') || key.includes('Supreme')) {
          if ((key.includes('Improved') && count[key.slice(0, -8)]) ||
              (key.includes('Supreme') && count[key.slice(0, -7)])) {
              if (tier===talents[key].tier && !count[key]) options.push(key);
          }
        }
        //talent from this tier and has not been selected already
        else if (tier===talents[key].tier && !count[key]) options.push(key);
        //talent is ranked and has been selected enough for this tier
        else if (talents[key].ranked && ((talents[key].tier+count[key])===tier)) options.push(key);
        console.log(masterTalents[row][tier]);
        if (masterTalents[row][tier]!=='') options.push(masterTalents[row][tier]);
      })

      options.sort();
      cb(options);
  }

  selectPopup = () => {
    this.makeOptions((options) => {
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
                  textTop={talent && talent.name}
                  textBottom={(talent ? talent.description+'\n'+(talent.activation ? talent.turn : '') : 'inactive')}
                  block='talent'
                  topMod={activation} />
    )
  }
}

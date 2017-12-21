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

  selectPopup = () => {
    popup.create({
      title: 'Talent',
      className: 'alert',
      content: (
        <Selection data={talents} value={this.props.talentKey} submit={this.select}/>
      ),
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

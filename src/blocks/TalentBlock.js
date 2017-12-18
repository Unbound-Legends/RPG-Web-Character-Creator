import React, { Component } from 'react';
import popup from 'react-popup';
import Selection from '../blocks/Selection';
import talents from '../data/talents';
import '../index.css';
import '../popup.css';


class TalentBlock extends Component {
  constructor() {
      super();
      this.state = {
        activation: '',
        talent: {},
      };
    }

  componentDidMount() {
    this.setState({talent: talents[this.props.talentKey]});
    this.activation(this.props.talentKey);
  }

  componentWillReceiveProps(nextProps){
    this.setState({talent: talents[nextProps.talentKey]});
    this.activation(nextProps.talentKey);
  }

  select(key) {
    this.props.submit(key);
    popup.close();
  }

  activation(key) {
    if (talents[key] === undefined) this.setState({activation: 'stats-box-top talent-box-inactive'});
    else {
      if (talents[key].activation) this.setState({activation: 'stats-box-top talent-box-active'});
      else this.setState({activation: 'stats-box-top talent-box-passive'});
    }
  }


  selectPopup() {
    popup.create({
      title: 'Talent',
      className: 'alert',
      content: (
        <Selection data={talents} value={this.props.talentKey} submit={this.select.bind(this)}/>
      ),
    })
  }

  render() {
    return (
      <div className='stats-box talent-box' onClick={this.selectPopup.bind(this)}>
        <div className={this.state.activation}>
          {this.state.talent &&
            <b>{this.state.talent.name}</b>
          }
        </div>
          <div className='stats-box-bottom talent-box-bottom'>{this.state.talent ? this.state.talent.description : 'Inactive'}</div>
      </div>
    )
  }
}
export default TalentBlock;

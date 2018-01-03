import React from 'react';
import '../styles/index.css';
import MotivationBlock from '../blocks/MotivationBlock';
import motivations from '../data/motivations';

export default class Motivation extends React.Component {
  state = {masterMotivations: {Desire: {}, Fear: {}, Strength: {}, Flaw: {}}};

  select = (type, key) => {
    const {masterMotivations} = this.state;
    let newMasterMotivations = masterMotivations;
    let newMotivation = {};
    newMotivation[key] = motivations[type][key];
    newMasterMotivations[type] = newMotivation;
    this.setState({masterMotivations: newMasterMotivations});
  }

  textEdit = (type, key, description) => {
    const {masterMotivations} = this.state;
    let newMasterMotivations = masterMotivations;
    newMasterMotivations[type][key] = description;
    this.setState({masterMotivations: newMasterMotivations});
  }

  render() {
    const {masterMotivations} = this.state;
    return (
      <div>
        {Object.keys(masterMotivations).map((type)=>
          <MotivationBlock  key={type}
                            type={type}
                            name={Object.keys(masterMotivations[type])[0]}
                            description={Object.values(masterMotivations[type])[0]}
                            list={Object.keys(motivations[type])}
                            select={this.select}
                            textEdit={this.textEdit}
          />
        )}
      </div>
    )
  }
}

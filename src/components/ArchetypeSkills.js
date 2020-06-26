import clone from 'clone';
import { get } from 'lodash-es';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Row } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { changeData } from '../redux/actions';

class ArchetypeSkillsComponent extends React.Component {
    handleCheck = event => {
        const {
            archetype,
            changeData,
            archetypeSpecialSkills,
            archetypes
        } = this.props;
        const masterArchetypeSkills = archetypes[archetype].skills;
        let obj = {};
        let count = 0;
        if (masterArchetypeSkills?.choose) {
            count = masterArchetypeSkills?.choose?.count || 1;
        } else {
            count = masterArchetypeSkills.choice;
        }
        if (count > Object.keys(archetypeSpecialSkills).length) {
            obj = clone(archetypeSpecialSkills);
        } else changeData('', 'archetypeSpecialSkills');
        obj[event.target.value] = {
            rank: Object.keys(masterArchetypeSkills).includes('any')
                ? masterArchetypeSkills.any
                : masterArchetypeSkills[event.target.value] ||
                  masterArchetypeSkills?.choose?.skills?.[event.target.value] ||
                  1
        };

        changeData(obj, 'archetypeSpecialSkills');
    };

    render() {
        const {
            archetype,
            archetypes,
            archetypeSpecialSkills,
            careers,
            career,
            skills
        } = this.props;
        const masterArchetype = archetypes[archetype];
        const careerSkills = get(careers, `${career}.skills`, []);
        let list = [];
        let count = 0;
        let existing = <></>;
        if (masterArchetype?.skills?.choose) {
            count = masterArchetype?.skills?.choose?.count || 1;
            list = masterArchetype?.skills?.choose?.skills || {};
            const masterArchetypeSkills = Object.keys(
                masterArchetype?.skills
            ).filter(x => x !== 'choose' && x !== 'choice');
            existing = (
                <Row>
                    {masterArchetypeSkills.map((skill, index) => (
                        <div key={index}>
                            {masterArchetype?.skills[skill]} rank in{' '}
                            {skills[skill]?.name}
                        </div>
                    ))}
                </Row>
            );
            console.log('List:', list);
        } else {
            list = Object.keys(masterArchetype.skills).includes('any')
                ? skills
                : masterArchetype.skills;
        }

        if (archetype === null) return <div />;
        const keys = Object.keys(masterArchetype.skills);
        if (keys.includes('choice') || keys.includes('choose')) {
            return (
                <Col>
                    {existing}
                    <Row>
                        Select {count || masterArchetype.skills.choice}{' '}
                        {(count || masterArchetype.skills.choice) > 1
                            ? 'options'
                            : 'option'}{' '}
                        to get free rank(s)
                    </Row>
                    <Input
                        type="select"
                        bsSize="sm"
                        value=""
                        name="archetypeSpecialSkills"
                        onChange={this.handleCheck}
                    >
                        <option value="" />
                        {Object.keys(list).map(
                            key =>
                                skills[key] &&
                                !Object.keys(archetypeSpecialSkills).includes(
                                    key
                                ) && (
                                    <option value={key} name={key} key={key}>
                                        {skills[key].name} ({list[key]})
                                    </option>
                                )
                        )}
                    </Input>
                    <Row className="my-2">
                        {Object.keys(archetypeSpecialSkills)
                            .filter(
                                x =>
                                    // Ignore skills that are given with choice skills,
                                    // if choice skills are available. If we don't do the
                                    // or, we'll filter out skills from `choose`
                                    keys.includes('choice') || !keys.includes(x)
                            )
                            .map(skill =>
                                skills[skill]
                                    ? skills[skill].name +
                                      (list[skill] ? ` (${list[skill]})` : '')
                                    : skill
                            )
                            .join(', ')}
                    </Row>
                    <Row className="my-2">
                        <Button
                            onClick={() =>
                                this.props.changeData(
                                    '',
                                    'archetypeSpecialSkills'
                                )
                            }
                        >
                            Clear
                        </Button>
                    </Row>
                </Col>
            );
        }
        return (
            <div>
                {Object.keys(list).map(key => (
                    <Col key={key}>
                        {masterArchetype.skills[key]} rank in{' '}
                        {skills[key]?.name || key}
                    </Col>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        archetype: state.archetype,
        archetypes: state.archetypes,
        archetypeSpecialSkills: state.archetypeSpecialSkills,
        skills: state.skills,
        careers: state.careers,
        career: state.career
    };
};

const matchDispatchToProps = dispatch =>
    bindActionCreators({ changeData }, dispatch);

export const ArchetypeSkills = connect(
    mapStateToProps,
    matchDispatchToProps
)(ArchetypeSkillsComponent);

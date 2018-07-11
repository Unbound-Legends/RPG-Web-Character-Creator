import React from 'react';

export class Description extends React.Component {

    checkText = () => {
        if (this.props.text === null || this.props.text === undefined) return '';
        let text = this.props.text.split(' ');
        let newString = [];
        text.forEach(word => {
            switch (true) {
                case word.includes('CRB'):
                    newString.push(`<a href="http://www.drivethrurpg.com/product/228813/Genesys-Core-Rulebook?affiliate_id=1131280" target="_blank" rel="noopener noreferrer">${word}</a> `);
                    break;
                case word.includes('ROT'):
                    newString.push(`<a href="http://www.drivethrurpg.com/product/239561/Realms-of-Terrinoth?affiliate_id=1131280" target="_blank" rel="noopener noreferrer">${word}</a> `);
                    break;
                case word === '[blue]':
                case word === '[boost]':
                    newString.push('<i class="ffi ffi-d6 ffi-border ffi-grpg-boost-color"></i>');
                    break;
                case word === '[green]':
                case word === '[ability]':
                    newString.push('<i class="ffi  ffi-d8 ffi-border ffi-grpg-ability-color"></i>');
                    break;
                case word === '[yellow]':
                case word === '[proficiency]':
                    newString.push('<i class="ffi ffi-d12 ffi-border ffi-grpg-proficiency-color"></i>');
                    break;
                case word === '[black]':
                case word === '[setback]':
                    newString.push('<i class="ffi ffi-d6 ffi-border ffi-grpg-setback-color"></i>');
                    break;
                case word === '[purple]':
                case word === '[difficulty]':
                    newString.push('<i class="ffi ffi-d8 ffi-border ffi-grpg-difficulty-color"></i>');
                    break;
                case word === '[red]':
                case word === '[challenge]':
                    newString.push('<i class="ffi ffi-d12 ffi-border ffi-grpg-challenge-color"></i>');
                    break;
                case word === '[white]':
                    newString.push('<i class="ffi ffi-d12 ffi-border"></i>');
                    break;
                case word === '[advantage]':
                case word === '[adv]':
                    newString.push('<i class="ffi ffi-grpg-advantage"></i>');
                    break;
                case word === '[success]':
                case word === '[suc]':
                    newString.push('<i class="ffi ffi-grpg-success"></i>');
                    break;
                case word === '[triumph]':
                case word === '[tri]':
                    newString.push('<i class="ffi ffi-grpg-triumph"></i>');
                    break;
                case word === '[threat]':
                case word === '[thr]':
                    newString.push('<i class="ffi ffi-grpg-threat"></i>');
                    break;
                case word === '[failure]':
                case word === '[fail]':
                    newString.push('<i class="ffi ffi-grpg-failure"></i>');
                    break;
                case word === '[despair]':
                case word === '[des]':
                    newString.push('<i class="ffi ffi-grpg-despair"></i>');
                    break;
                case word === '[rmsetback]':
                case word === '[rmblack]':
                    newString.push(`<b>(-</b><i class="ffi ffi-d6 ffi-border ffi-grpg-setback-color"></i><b>)</b>`);
                    break;
                default:
                    newString.push(`${word} `);
                    break;
            }
        });

        return {__html: newString.join('')};
    };

    render() {
        return <div className='description' dangerouslySetInnerHTML={this.checkText()}
                    style={{margin: '0'}}/>

    }
}

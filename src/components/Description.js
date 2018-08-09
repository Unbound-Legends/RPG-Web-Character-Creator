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
				case word.includes('[blue]'):
				case word.includes('[boost]'):
					newString.push('<i class="ffi ffi-d6 ffi-border ffi-grpg-boost-color"></i>');
					break;
				case word.includes('[green]'):
				case word.includes('[ability]'):
					newString.push('<i class="ffi  ffi-d8 ffi-border ffi-grpg-ability-color"></i>');
					break;
				case word.includes('[yellow]'):
				case word.includes('[proficiency]'):
					newString.push('<i class="ffi ffi-d12 ffi-border ffi-grpg-proficiency-color"></i>');
					break;
				case word.includes('[black]'):
				case word.includes('[setback]'):
					newString.push('<i class="ffi ffi-d6 ffi-border ffi-grpg-setback-color"></i>');
					break;
				case word.includes('[purple]'):
				case word.includes('[difficulty]'):
					newString.push('<i class="ffi ffi-d8 ffi-border ffi-grpg-difficulty-color"></i>');
					break;
				case word.includes('[red]'):
				case word.includes('[challenge]'):
					newString.push('<i class="ffi ffi-d12 ffi-border ffi-grpg-challenge-color"></i>');
					break;
				case word.includes('[white]'):
					newString.push('<i class="ffi ffi-d12 ffi-border"></i>');
					break;
				case word.includes('[advantage]'):
				case word.includes('[adv]'):
					newString.push('<i class="ffi ffi-grpg-advantage"></i>');
					break;
				case word.includes('[success]'):
				case word.includes('[suc]'):
					newString.push('<i class="ffi ffi-grpg-success"></i>');
					break;
				case word.includes('[triumph]'):
				case word.includes('[tri]'):
					newString.push('<i class="ffi ffi-grpg-triumph"></i>');
					break;
				case word.includes('[threat]'):
				case word.includes('[thr]'):
					newString.push('<i class="ffi ffi-grpg-threat"></i>');
					break;
				case word.includes('[failure]'):
				case word.includes('[fail]'):
					newString.push('<i class="ffi ffi-grpg-failure"></i>');
					break;
				case word.includes('[despair]'):
				case word.includes('[des]'):
					newString.push('<i class="ffi ffi-grpg-despair"></i>');
					break;
				case word.includes('[rmsetback]'):
				case word.includes('[rmblack]'):
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
		return <div className='description m-auto' dangerouslySetInnerHTML={this.checkText()}/>
	}
}

import React from 'react';
import * as images from '../images';

export class Description extends React.Component {

	checkText = () => {
		if (this.props.text === null || this.props.text === undefined) return '';
		let text = this.props.text.split(' ');
		let array = [];
		text.forEach(word => {
			let target = word.toLowerCase();
			switch (true) {
				case target.includes('crb'):
					array.push(`<a href="http://www.drivethrurpg.com/product/228813/Genesys-Core-Rulebook?affiliate_id=1131280" target="_blank" rel="noopener noreferrer">CRB</a>`);
					break;
				case target.includes('rot'):
					array.push(`<a href="http://www.drivethrurpg.com/product/239561/Realms-of-Terrinoth?affiliate_id=1131280" target="_blank" rel="noopener noreferrer">ROT</a>`);
					break;
				case target.includes('[blue]'):
				case target.includes('[boost]'):
					array.push('<i class="ffi ffi-d6 ffi-border ffi-grpg-boost-color"></i>');
					break;
				case target.includes('[green]'):
				case target.includes('[ability]'):
					array.push('<i class="ffi  ffi-d8 ffi-border ffi-grpg-ability-color"></i>');
					break;
				case target.includes('[yellow]'):
				case target.includes('[proficiency]'):
					array.push('<i class="ffi ffi-d12 ffi-border ffi-grpg-proficiency-color"></i>');
					break;
				case target.includes('[black]'):
				case target.includes('[setback]'):
					array.push('<i class="ffi ffi-d6 ffi-border ffi-grpg-setback-color"></i>');
					break;
				case target.includes('[purple]'):
				case target.includes('[difficulty]'):
					array.push('<i class="ffi ffi-d8 ffi-border ffi-grpg-difficulty-color"></i>');
					break;
				case target.includes('[red]'):
				case target.includes('[challenge]'):
					array.push('<i class="ffi ffi-d12 ffi-border ffi-grpg-challenge-color"></i>');
					break;
				case target.includes('[white]'):
					array.push('<i class="ffi ffi-d12 ffi-border"></i>');
					break;
				case target.includes('[advantage]'):
				case target.includes('[adv]'):
					array.push('<i class="ffi ffi-grpg-advantage"></i>');
					break;
				case target.includes('[success]'):
				case target.includes('[suc]'):
					array.push('<i class="ffi ffi-grpg-success"></i>');
					break;
				case target.includes('[triumph]'):
				case target.includes('[tri]'):
					array.push('<i class="ffi ffi-grpg-triumph"></i>');
					break;
				case target.includes('[threat]'):
				case target.includes('[thr]'):
					array.push('<i class="ffi ffi-grpg-threat"></i>');
					break;
				case target.includes('[failure]'):
				case target.includes('[fail]'):
					array.push('<i class="ffi ffi-grpg-failure"></i>');
					break;
				case target.includes('[despair]'):
				case target.includes('[des]'):
					array.push('<i class="ffi ffi-grpg-despair"></i>');
					break;
				case target.includes('[rmsetback]'):
				case target.includes('[rmblack]'):
					array.push(`<b>(-</b><i class="ffi ffi-d6 ffi-border ffi-grpg-setback-color"></i><b>)</b>`);
					break;
				case target.includes('[gm]'):
					array.push(`<img src=${images.gm} class="textSymbols" /> `);
					break;
				case target.includes('[pc]'):
					array.push(`<img src=${images.pc} class="textSymbols" /> `);
					break;
				default:
					array.push(`${word}`);
					break;
			}
		});
		let final = '';
		array.forEach((word, index) => {
			if ((word.includes('ffi') && (array[index + 1] && array[index + 1].includes('ffi'))) || array.length === index + 1) final += word;
			else final += `${word} `;
		});
		return {__html: final};
	};

	render() {
		return <div className='m-auto' dangerouslySetInnerHTML={this.checkText()}/>
	}
}

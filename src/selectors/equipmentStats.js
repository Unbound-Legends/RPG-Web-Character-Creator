import clone from 'clone';
import {lowerCase, replace} from "lodash-es";
import {createSelector} from "reselect";

const armor = state => state.armor;
const craftsmanship = state => state.craftsmanship;
const equipmentArmor = state => state.equipmentArmor;
const equipmentGear = state => state.equipmentGear;
const equipmentWeapons = state => state.equipmentWeapons;
const gear = state => state.gear;
const weapons = state => state.weapons;

export const equipmentStats = (state) => calcEquipmentStats(state);

const calcEquipmentStats = createSelector(
	armor, gear, weapons, equipmentArmor, equipmentGear, equipmentWeapons, craftsmanship,
	(armor, gear, weapons, equipmentArmor, equipmentGear, equipmentWeapons, craftsmanship) => {
		let final = {};
		['equipmentArmor', 'equipmentGear', 'equipmentWeapons'].forEach(equipments => {
			let data, inventory;
			let type = `${lowerCase(replace(equipments, 'equipment', ''))}`;
			switch (equipments) {
				case 'equipmentWeapons':
					data = clone(weapons);
					inventory = clone(equipmentWeapons);
					break;
				case "equipmentArmor":
					data = clone(armor);
					inventory = clone(equipmentArmor);
					break;
				case 'equipmentGear':
					data = clone(gear);
					inventory = clone(equipmentGear);
					break;
				default:
					break;
			}
			Object.keys(inventory).forEach(item => {
				let derivedStats = {...clone(data[inventory[item].id]), ...inventory[item], type: type};
				let craftType = inventory[item].craftsmanship;
				let quantity = inventory[item].quantity;
				if (!quantity) quantity = 1;

				//modify item with craftsmanship
				if (craftType) {
					let craftModifier = clone(craftsmanship[craftType]);
					Object.keys(craftModifier[type]).forEach(field => {
						if (typeof craftModifier[type][field] === 'object') {
							Object.keys(craftModifier[type][field]).forEach(modifier => {
								if (!derivedStats[field]) derivedStats[field] = {};
								if (typeof craftModifier[type][field][modifier] === 'string') {
									if (!derivedStats[field][modifier]) derivedStats[field][modifier] = '';
									derivedStats[field][modifier] += ` ${craftModifier[type][field][modifier]}`;
								} else if (Array.isArray(craftModifier[type][field][modifier])) {
									if (!Array.isArray(derivedStats[field][modifier])) derivedStats[field][modifier] = [];
									derivedStats[field][modifier] = [...derivedStats[field][modifier], ...craftModifier[type][field][modifier]];
								} else {
									if (!derivedStats[field][modifier]) derivedStats[field][modifier] = 0;
									derivedStats[field][modifier] = +craftModifier[type][field][modifier] + derivedStats[field][modifier];
								}
							});
						}
						else {
							let value = +derivedStats[field] + +craftModifier[type][field];
							if (typeof derivedStats[field] === 'string' && value > 0) value = `+${value.toString()}`;
							derivedStats[field] = value;
						}
					});
					if (craftModifier.price && derivedStats.price) derivedStats.price = +craftModifier.price * +derivedStats.price;
					if (craftModifier.rarity && derivedStats.rarity) {
						derivedStats.rarity = +craftModifier.rarity + +derivedStats.rarity;
						if (derivedStats.rarity > 10) derivedStats.rarity = 10;
					}
				}

				//modify encumbrance via quantity
				derivedStats.encumbrance = derivedStats.encumbrance * quantity;

				//modify modifiers via quantity
				if (derivedStats.modifier) {
					Object.keys(derivedStats.modifier).forEach(modifier => {
						if (typeof derivedStats.modifier[modifier] === 'number') derivedStats.modifier[modifier] = derivedStats.modifier[modifier] * quantity;
					})
				}

				final[item] = derivedStats;
			});
		});
		return final;
	}
);
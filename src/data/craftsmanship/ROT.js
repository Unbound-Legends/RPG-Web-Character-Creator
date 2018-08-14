export const ROT = {
	Ancient: {
		name: 'Ancient',
		armor: {
			soak: +1,
			defense: +1,
			qualities: {Reinforced: 1}
		},
		weapons: {
			hardPoint: -1,
			damage: +1,
			critical: -1,
			qualities: {Reinforced: 1}
		},
		price: 20,
		rarity: 10
	},
	Dwarven: {
		name: 'Dwarven',
		armor: {
			encumbrance: +1,
			hardPoint: +1,
		},
		weapons: {
			damage: +1,
			encumbrance: +1,
		},
		price: 2,
		rarity: +2
	},
	Elven: {
		name: 'Elven',
		armor: {
			encumbrance: -2,
			modifier: {Stealth: ['[rmblack]']}
		},
		weapons: {
			damage: -1,
			critical: -1,
		},
		price: 2,
		rarity: +3
	},
	Iron: {
		name: 'Iron',
		armor: {
			encumbrance: +2,
			modifier: {Athletics: ['[black]'], Coordination: ['[black]'], Riding: ['[black]'], Stealth: ['[black]']}
		},
		weapons: {
			critical: +1,
		},
		price: 0.5,
		rarity: -1
	},
	Steel: {
		name: 'Steel',
		armor: {},
		weapons: {},
		price: 1,
		rarity: 0
	}
};
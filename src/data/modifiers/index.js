/* form:

{
    name: string,
    type: string ("weapon", or "armor", or "gear"),
    exclusions: string[],
    hardPointCost: int,
    priceMultiplier: int,
    rarity: string (use '=' to set value, '+' or '-' to adjust value),
    effect: object (key is the value to adjust, value is the change)
}
*/

export const modifiers = [
    {
        name: "Ancient",
        type: "weapon",
        exclusions: [],
        hardPointCost: 1,
        priceMultiplier: 20,
        rarity: 10,
        effect: {
            damage: 1,
            critical: -1,
            qualities: {Reinforced: 1}
        }
    },
    {
        name: "Ancient",
        type: "armor",
        exclusions: [],
        hardPointCost: 1,
        priceMultiplier: 20,
        rarity: "=10",
        effect: {
            soak: 1,
            defense: 1,
            qualities: {Reinforced: 1}
        }
    },
    {
        name: "Dwarven",
        type: "weapon",
        exclusions: [],
        hardPointCost: 0,
        priceMultiplier: 2,
        rarity: "+2",
        effect: {
            damage: 1,
            encumbrance: 1
        }
    },
    {
        name: "Dwarven",
        type: "armor",
        exclusions: [],
        hardPointCost: -1,
        priceMultiplier: 2,
        rarity: "+2",
        effect: {
            encumbrance: 1
        }
    },
    {
        name: "Elven",
        type: "weapon",
        exclusions: [],
        hardPointCost: 0,
        priceMultiplier: 2,
        rarity: "+3",
        effect: {
            damage: -1,
            critical: -1
        }
    },
    {
        name: "Elven",
        type: "armor",
        exclusions: [],
        hardPointCost: 0,
        priceMultiplier: 2,
        rarity: "+3",
        effect: {
            encumbrance: -2,
            special: [{action: 'remove', die: "black", skill: "stealth"}]
        }
    },
    {
        name: "Iron",
        type: "weapon",
        exclusions: [],
        hardPointCost: 0,
        priceMultiplier: 0.5,
        rarity: "-1",
        effect: {
            critical: 1
        }
    },
    {
        name: "Iron",
        type: "armor",
        exclusions: [],
        hardPointCost: 0,
        priceMultiplier: 0.5,
        rarity: "-1",
        effect: {
            encumbrance: 2,
            special: [
                {
                    action: "add",
                    die: "black",
                    skill: "athletics"
                },
                {
                    action: "add",
                    die: "black",
                    skill: "coordination"
                },
                {
                    action: "add",
                    die: "black",
                    skill: "riding"
                },
                {
                    action: "add",
                    die: "black",
                    skill: "riding"
                }
            ]
        }
    }
]
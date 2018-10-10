export const criticalText = (state) => CriticalText(state);

const CriticalText = (total) => {
	let textCrit = '';
	switch (true) {
		case (total < 5):
			textCrit = '[purple] Minor Nick: The target suffers 1 strain.';
			break;
		case (total >= 6 && total <= 10):
			textCrit = '[purple] Slowed Down: The target can only act during the last allied Initiative slot on their next turn.';
			break;
		case (total >= 11 && total <= 15):
			textCrit = '[purple] Sudden Jolt: The target drops whatever is in hand.';
			break;
		case (total >= 16 && total <= 20):
			textCrit = '[purple] Distracted: The target cannot perform a free maneuver during their next turn.';
			break;
		case (total >= 21 && total <= 25):
			textCrit = '[purple] Off-Balance: Add [black] to the target’s next skill check.';
			break;
		case (total >= 26 && total <= 30):
			textCrit = '[purple] Discouraging Wounds.svg: Move one player pool Story Point to the Game Master pool (reverse if NPC).';
			break;
		case (total >= 31 && total <= 35):
			textCrit = '[purple] Stunned: The target is staggered until the end of their next turn.';
			break;
		case (total >= 36 && total <= 40):
			textCrit = '[purple] Stinger: Increase the dfficulty of the target’s next check by one.';
			break;
		case (total >= 41 && total <= 45):
			textCrit = '[purple] [purple] Bowled Over: The target is knocked prone and suffers 1 strain.';
			break;
		case (total >= 46 && total <= 50):
			textCrit = '[purple] [purple] Head Ringer: The target increases the difficulty of all Intellect and Cunning checks by one until this Critical Injury is healed.';
			break;
		case (total >= 51 && total <= 55):
			textCrit = '[purple] [purple] Fearsome Wounds.svg: The target increases the difficulty of all Presence and Willpower checks by one until this Critical Injury is healed.';
			break;
		case (total >= 56 && total <= 60):
			textCrit = '[purple] [purple] Agonizing Wounds.svg: The target increases the difficulty of all Brawn and Agility checks by one until this Critical Injury is healed.';
			break;
		case (total >= 61 && total <= 65):
			textCrit = '[purple] [purple] Slightly Dazed: The target is disoriented until this Critical Injury is healed.';
			break;
		case (total >= 66 && total <= 70):
			textCrit = '[purple] [purple] Scattered Senses: The target removes all [blue] from skill checks until this Critical Injury is healed.';
			break;
		case (total >= 71 && total <= 75):
			textCrit = '[purple] [purple] Hamstrung: The target loses their free maneuver until this Critical Injury is healed.';
			break;
		case (total >= 76 && total <= 80):
			textCrit = '[purple] [purple] Overpowered: The target leaves themself open, and the attacker may immediately attempt another attack against them as an incidental, using the exact same pool as the original attack.';
			break;
		case (total >= 81 && total <= 85):
			textCrit = '[purple] [purple] Winded: The target cannot voluntarily suffer strain to activate any abilities or gain additional maneuvers until this Critical Injury is healed.';
			break;
		case (total >= 86 && total <= 90):
			textCrit = '[purple] [purple] Compromised: Increase difficulty of all skill checks by one until this Critical Injury is healed.';
			break;
		case (total >= 91 && total <= 95):
			textCrit = '[purple] [purple] [purple] At the Brink: The target suffers 2 strain each time they perform an action until this Critical Injury is healed.';
			break;
		case (total >= 96 && total <= 100):
			textCrit = '[purple] [purple] [purple] Crippled: One of the target’s limbs (selected by the GM) is impaired until this Critical Injury is healed. Increase difficulty of all checks that require use of that limb by one.';
			break;
		case (total >= 101 && total <= 105):
			textCrit = '[purple] [purple] [purple] Maimed: One of the target’s limbs (selected by the GM) is permanently lost. Unless the target has a cybernetic or prosthetic replacement, the target cannot perform actions that would require the use of that limb. All other actions gain [black] until this Critical Injury is healed.';
			break;
		case (total >= 106 && total <= 110):
			textCrit = '[purple] [purple] [purple] Horrific Injury: Roll 1d10 to determine which of the target’s characteristics is affected: 1–3 for Brawn, 4–6 for Agility, 7 for Intellect, 8 for Cunning, 9 for Presence, 10 for Willpower. Until this Critical Injury is healed, treat that characteristic as one point lower.';
			break;
		case (total >= 111 && total <= 115):
			textCrit = '[purple] [purple] [purple] Temporarily Disabled: The target is immobilized until this Critical Injury is healed.';
			break;
		case (total >= 116 && total <= 120):
			textCrit = '[purple] [purple] [purple] Blinded: The target can no longer see. Upgrade the difficulty of all checks twice, and upgrade the difficulty of Perception and Vigilance checks three times, until this Critical Injury is healed.';
			break;
		case (total >= 121 && total <= 125):
			textCrit = '[purple] [purple] [purple] Knocked Senseless: The target is staggered until this Critical Injury is healed.';
			break;
		case (total >= 126 && total <= 130):
			textCrit = '[purple] [purple] [purple] [purple] Gruesome Injury: Roll 1d10 to determine which of the target’s characteristics is affected: 1–3 for Brawn, 4–6  for Agility, 7 for Intellect, 8 for Cunning, 9 for Presence, 10 for Willpower. That characteristic is permanently reduced by one, to a minimum of 1.';
			break;
		case (total >= 131 && total <= 140):
			textCrit = '[purple] [purple] [purple] [purple] Bleeding Out: Until this Critical Injury is healed, every round, the target suffers 1 wound and 1 strain at the beginning of their turn. For every 5 wounds they suffer beyond their wound threshold, they suffer one additional Critical Injury. Roll on the chart, suffering the injury (if they suffer this result a second time due to this, roll again).';
			break;
		case (total >= 141 && total <= 150):
			textCrit = '[purple] [purple] [purple] [purple] The End Is Nigh: The target dies after the last Initiative slot during the next round unless this Critical Injury is healed.';
			break;
		case (total >= 151):
			textCrit = 'Dead: Complete, obliterated death.';
			break;
		default:
			break;
	}
	return textCrit;
};
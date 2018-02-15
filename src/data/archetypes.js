export default {
    AverageHuman: {
        name: 'Average Human',
        book: 'CRB',
        page: '36',
        description: 'See CRB, page 36, for more details.',
        setting: 'All',
        woundThreshold: 10,
        strainThreshold: 10,
        experience: 110,
        skills: {choice: 2, any: 1},
        talents: {
            readyforanything: {
                name: 'Ready for Anything',
                activation: true,
                turn: 'Incidental, Out of Turn',
                book: 'CRB',
                page: '36',
                description: 'See CRB, page 36, for more details.',
            }
        },
        characteristics: {
            Brawn: 2,
            Agility: 2,
            Intellect: 2,
            Cunning: 2,
            Willpower: 2,
            Presence: 2
        }
    },

    Laborer: {
        name: 'The Laborer',
        book: 'CRB',
        page: '37',
        description: 'See CRB, page 37, for more details.',
        setting: 'All',
        woundThreshold: 12,
        strainThreshold: 8,
        experience: 100,
        skills: {Athletics: 1},
        talents: {
            toughasnails: {
                name: 'Tough as Nails',
                activation: true,
                turn: 'Incidental, Out of Turn',
                book: 'CRB',
                page: '37',
                description: 'See CRB, page 37, for more details.',
            }
        },
        characteristics: {
            Brawn: 3,
            Agility: 2,
            Intellect: 2,
            Cunning: 2,
            Willpower: 1,
            Presence: 2
        }
    },

    Intellectual: {
        name: 'The Intellectual',
        book: 'CRB',
        page: '38',
        description: 'See CRB, page 38, for more details.',
        setting: 'All',
        woundThreshold: 8,
        strainThreshold: 12,
        experience: 100,
        skills: {Knowledge: 1},
        talents: {
            brilliant: {
                name: 'Brilliant!',
                activation: true,
                turn: 'Incidental',
                book: 'CRB',
                page: '38',
                description: 'See CRB, page 38, for more details.',
            }
        },
        characteristics: {
            Brawn: 2,
            Agility: 1,
            Intellect: 3,
            Cunning: 2,
            Willpower: 2,
            Presence: 2
        }
    },

    Aristocrat: {
        name: 'The Aristocrat',
        book: 'CRB',
        page: '39',
        description: 'See CRB, page 39, for more details.',
        setting: 'All',
        woundThreshold: 10,
        strainThreshold: 10,
        experience: 100,
        skills: {Cool: 1},
        talents: {
            forcefulPersonality: {
                name: 'Forceful Personality',
                activation: true,
                turn: 'Incidental',
                book: 'CRB',
                page: '39',
                description: 'See CRB, page 39, for more details.',
            }
        },
        characteristics: {
            Brawn: 1,
            Agility: 2,
            Intellect: 2,
            Cunning: 2,
            Willpower: 2,
            Presence: 3
        }
    },

    Elf: {
        name: 'Elf',
        book: 'CRB',
        page: '142',
        description: 'See CRB, page 142, for more details.',
        setting: 'Fantasy',
        woundThreshold: 9,
        strainThreshold: 10,
        experience: 90,
        skills: {Perception: 1},
        talents: {
            nimble: {
                name: 'Nimble',
                activation: false,
                turn: false,
                book: 'CRB',
                page: '142',
                description: 'See CRB, page 142, for more details.',
            }
        },
        modifier: {
            defense: 1
        },
        characteristics: {
            Brawn: 2,
            Agility: 3,
            Intellect: 2,
            Cunning: 2,
            Willpower: 1,
            Presence: 2
        }
    },

    Dwarf: {
        name: 'Dwarf',
        book: 'CRB',
        page: '142',
        description: 'See CRB, page 142, for more details.',
        setting: 'Fantasy',
        woundThreshold: 11,
        strainThreshold: 10,
        experience: 90,
        skills: {Resilience: 1},
        talents: {
            darkvision: {
                name: 'Dark Vision',
                activation: false,
                turn: false,
                book: 'CRB',
                page: '142',
                description: 'See CRB, page 142, for more details.',
            },
            toughasnails: {
                name: 'Tough as Nails',
                activation: true,
                turn: 'Incidental, Out of Turn',
                book: 'CRB',
                page: '37',
                description: 'See CRB, page 37, for more details.',
            }
        },
        characteristics: {
            Brawn: 2,
            Agility: 1,
            Intellect: 2,
            Cunning: 2,
            Willpower: 3,
            Presence: 2
        }
    },

    Orc: {
        name: 'Orc',
        book: 'CRB',
        page: '143',
        description: 'See CRB, page 143, for more details.',
        setting: 'Fantasy',
        woundThreshold: 12,
        strainThreshold: 8,
        experience: 100,
        skills: {Coercion: 1},
        talents: {
            battlerage: {
                name: 'Battle Rage',
                activation: true,
                turn: 'Attack',
                book: 'CRB',
                page: '143',
                description: 'See CRB, page 143, for more details.',
            }
        },
        characteristics: {
            Brawn: 3,
            Agility: 2,
            Intellect: 2,
            Cunning: 2,
            Willpower: 2,
            Presence: 1
        }
    },

    Mongrel: {
        name: 'Mongrel',
        book: 'CRB',
        page: '152',
        description: 'See CRB, page 152, for more details.',
        setting: 'Steampunk',
        woundThreshold: 10,
        strainThreshold: 8,
        experience: 100,
        skills: {Discipline: 1},
        talents: {
            thebeastwithin: {
                name: 'The Beast Within',
                activation: true,
                turn: 'Incidental, Out of Turn',
                book: 'CRB',
                page: '152',
                description: 'See CRB, page 152, for more details.',
            },
            thehumanspirt: {
                name: 'The Human Spirit',
                activation: true,
                turn: 'Incidental, Out of Turn',
                book: 'CRB',
                page: '152',
                description: 'See CRB, page 152, for more details.',
            }
        },
        characteristics: {
            Brawn: 2,
            Agility: 2,
            Intellect: 2,
            Cunning: 2,
            Willpower: 2,
            Presence: 2
        }
    },

    Revenant: {
        name: 'Revenant',
        book: 'CRB',
        page: '152',
        description: 'See CRB, page 152, for more details.',
        setting: 'Steampunk',
        woundThreshold: 11,
        strainThreshold: 9,
        experience: 100,
        skills: {Coercion: 1},
        talents: {
            reanimated: {
                name: 'Reanimated',
                activation: false,
                turn: false,
                book: 'CRB',
                page: '153',
                description: 'See CRB, page 153, for more details.',
            },
            deadnerves: {
                name: 'Dead Nerves',
                activation: false,
                turn: false,
                book: 'CRB',
                page: '153',
                description: 'See CRB, page 153, for more details.',
            }
        },
        characteristics: {
            Brawn: 3,
            Agility: 2,
            Intellect: 2,
            Cunning: 2,
            Willpower: 2,
            Presence: 1
        }
    },

    Bioroid: {
        name: 'Bioroid',
        book: 'CRB',
        page: '174',
        description: 'See CRB, page 174, for more details.',
        setting: 'Science Fiction',
        woundThreshold: 11,
        strainThreshold: 8,
        experience: 155,
        skills: {},
        talents: {
            robot: {
                name: 'Robot',
                activation: false,
                turn: false,
                book: 'CRB',
                page: '174',
                description: 'See CRB, page 174, for more details.',
            },
            inorganic: {
                name: 'Inorganic',
                activation: false,
                turn: false,
                book: 'CRB',
                page: '174',
                description: 'See CRB, page 174, for more details.',
            }
        },
        characteristics: {
            Brawn: 3,
            Agility: 1,
            Intellect: 1,
            Cunning: 1,
            Willpower: 1,
            Presence: 1
        }
    },

    Clone: {
        name: 'Clone',
        book: 'CRB',
        page: '174',
        description: 'See CRB, page 174, for more details.',
        setting: 'Science Fiction',
        woundThreshold: 11,
        strainThreshold: 10,
        experience: 80,
        skills: {choice: 2, any: 2},
        talents: {
            afaceinacrowd: {
                name: 'A Face in a Crowd',
                activation: false,
                turn: false,
                book: 'CRB',
                page: '174',
                description: 'See CRB, page 174, for more details.',
            }
        },
        characteristics: {
            Brawn: 2,
            Agility: 2,
            Intellect: 2,
            Cunning: 2,
            Willpower: 2,
            Presence: 2
        }
    },

    AnimalisticAlien: {
        name: 'Animalistic Alien',
        book: 'CRB',
        page: '182',
        description: 'See CRB, page 182, for more details.',
        setting: 'Space Opera',
        woundThreshold: 10,
        strainThreshold: 8,
        experience: 70,
        skills: {
            choice: 1,
            Athletics: 1,
            Coordination: 1,
            Resilience: 1
        },
        talents: {
            naturalweapons: {
                name: 'Natural Weapons',
                activation: false,
                turn: 'Attack',
                book: 'CRB',
                page: '182',
                description: 'See CRB, page 182, for more details.',
            }
        },
        characteristics: {
            Brawn: 3,
            Agility: 3,
            Intellect: 2,
            Cunning: 2,
            Willpower: 1,
            Presence: 2
        }
    },

    Psionic: {
        name: 'Psionic',
        book: 'CRB',
        page: '182',
        description: 'See CRB, page 182, for more details.',
        setting: 'Space Opera',
        woundThreshold: 7,
        strainThreshold: 11,
        experience: 70,
        skills: {},
        talents: {
            mindreader: {
                name: 'Mind Reader',
                activation: true,
                turn: 'Action',
                book: 'CRB',
                page: '182',
                description: 'See CRB, page 182, for more details.',
            },
            mindshaper: {
                name: 'Mind Shaper',
                activation: true,
                turn: 'Action',
                book: 'CRB',
                page: '182',
                description: 'See CRB, page 182, for more details.',
            },
            mindbreaker: {
                name: 'Mind Breaker',
                activation: true,
                turn: 'Action',
                book: 'CRB',
                page: '182',
                description: 'See CRB, page 182, for more details.',
            },

        },
        characteristics: {
            Brawn: 2,
            Agility: 2,
            Intellect: 2,
            Cunning: 2,
            Willpower: 2,
            Presence: 2
        }
    },

    Robot: {
        name: 'Robot',
        book: 'CRB',
        page: '183',
        description: 'See CRB, page 183, for more details.',
        setting: 'Space Opera',
        woundThreshold: 10,
        strainThreshold: 10,
        experience: 175,
        skills: {careerSkills: 6},
        talents: {
            robot: {
                name: 'Robot',
                activation: false,
                turn: false,
                book: 'CRB',
                page: '174',
                description: 'See CRB, page 174, for more details.',
            },
            networkedintelligence: {
                name: 'Networked Intelligence',
                activation: false,
                turn: false,
                book: 'CRB',
                page: '183',
                description: 'See CRB, page 183, for more details.',
            },
            inorganic: {
                name: 'Inorganic',
                activation: false,
                turn: false,
                book: 'CRB',
                page: '174',
                description: 'See CRB, page 174, for more details.',
            }
        },
        characteristics: {
            Brawn: 1,
            Agility: 1,
            Intellect: 1,
            Cunning: 1,
            Willpower: 1,
            Presence: 1
        }
    },

    Vanguard: {
        name: 'Vanguard',
        book: 'CRB',
        page: '183',
        description: 'See CRB, page 183, for more details.',
        setting: 'Space Opera',
        woundThreshold: 9,
        strainThreshold: 9,
        experience: 100,
        skills: {Knowledge: 1},
        talents: {
            spaceisourbirthright: {
                name: 'Space is our Birth Right',
                activation: false,
                turn: 'Action',
                book: 'CRB',
                page: '183',
                description: 'See CRB, page 183, for more details.',
            },
            hightechbaubles: {
                name: 'High Tech Baubles',
                activation: false,
                turn: false,
                source: 'CRB page 183',
                description: 'See CRB, page 183, for more details.',
            }
        },
        modifier: {
            Astrocartography: '[advantage]',
            Knowledge: '[advantage]'
        },
        characteristics: {
            Brawn: 2,
            Agility: 2,
            Intellect: 2,
            Cunning: 1,
            Willpower: 2,
            Presence: 3
        }
    },
}

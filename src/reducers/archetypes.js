export default function () {
  return {
    AverageHuman: {
      name: 'Average Human',
      book: 'CRB',
      page: '36',
      description: 'See CRB, page 36, for more details.',
      setting: 'All',
      woundThreshold: 10,
      strainThreshold: 10,
      experience: 110,
      skills: {Any: 2},
      talents: {
        readyforanything: {
          name: 'Ready for Anything',
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
          skills: {
            meleeDefense: 1,
            rangedDefense: 1
          },
          name: 'Nimble',
          book: 'CRB',
          page: '142',
          description: 'See CRB, page 142, for more details.',
        }
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
      page:  '142',
      description: 'See CRB, page 142, for more details.',
      setting: 'Fantasy',
      woundThreshold: 11,
      strainThreshold: 10,
      experience: 90,
      skills: {Resilience: 1},
      talents: {
        darkvision: {
          name: 'Dark Vision',
          book: 'CRB',
          page: '142',
          description: 'See CRB, page 142, for more details.',
        },
        toughasnails: {
          name: 'Tough as Nails',
          book: 'CRB', page: '37',
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
          book: 'CRB',
          page: '152',
          description: 'See CRB, page 152, for more details.',
        },
        thehumanspirt: {
          name: 'The Human Spirit',
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
          book: 'CRB',
          page: '153',
          description: 'See CRB, page 153, for more details.',
        },
        deadnerves: {
          name: 'Dead Nerves',
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
          book: 'CRB',
          page: '174',
          description: 'See CRB, page 174, for more details.',
        },
        inorganic: {
          name: 'Inorganic',
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
      skills: {Any: 2},
      talents: {
        afaceinacrowd: {
          name: 'A Face in a Crowd',
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
        Athletics: 1,
        Coordination: 1,
        Resilience: 1
      },
      talents: {
        naturalweapons: {
          name: 'Natural Weapons',
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
          book: 'CRB',
          page: '182',
          description: 'See CRB, page 182, for more details.',
        },
        mindshaper: {
          name: 'Mind Shaper',
          book: 'CRB',
          page: '182',
          description: 'See CRB, page 182, for more details.',
        },
        mindbreaker: {
          name: 'Mind Breaker',
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
          book: 'CRB',
          page: '174',
          description: 'See CRB, page 174, for more details.',
        },
        networkedintelligence: {
          name: 'Networked Intelligence',
          book: 'CRB',
          page: '183',
          description: 'See CRB, page 183, for more details.',
        },
        inorganic: {
          name: 'Inorganic',
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
          book: 'CRB',
          page: '183',
          description: 'See CRB, page 183, for more details.',
        },
        hightechbaubles: {
          name: 'High Tech Baubles',
          source: 'CRB page 183',
          description: 'See CRB, page 183, for more details.',
        }
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
}

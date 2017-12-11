const archetypes = {
  AverageHuman: {
    name: 'Average Human',
    source: 'CRB page 36',
    description: 'See CRB, page 36, for more details.',
    setting: 'All',
    woundThreshold: 10,
    strainThreshold: 10,
    experience: 110,
    skills: {
      Any: 2,
      description: 'One rank in two non-career skills.'
    },
    talents: {
      readyforanything: {
        name: 'Ready for Anything',
        source: 'CRB page 36',
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
    source: 'CRB page 37',
    description: 'See CRB, page 37, for more details.',
    setting: 'All',
    woundThreshold: 12,
    strainThreshold: 8,
    experience: 100,
    skills: {
      Athletics: 1,
      description: 'One rank in Athletics.'
    },
    talents: {
      toughasnails: {
        name: 'Tough as Nails',
        source: 'CRB page 37',
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
    source: 'CRB page 36',
    description: 'See CRB, page 36, for more details.',
    setting: 'All',
    woundThreshold: 8,
    strainThreshold: 12,
    experience: 100,
    skills: {
      Knowledge: 1,
      description: 'One rank in Knowledge.'
    },
    talents: {
      brilliant: {
        name: 'Brilliant!',
        source: 'CRB page 38',
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
    source: 'CRB page 39',
    description: 'See CRB, page 39, for more details.',
    setting: 'All',
    woundThreshold: 10,
    strainThreshold: 10,
    experience: 100,
    skills: {
      Cool: 1,
      description: 'One rank in Cool.'
    },
    talents: {
      forcefulPersonality: {
        name: 'Forceful Personality',
        source: 'CRB page 39',
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
    source: 'CRB page 142',
    description: 'See CRB, page 142, for more details.',
    setting: 'Fantasy',
    woundThreshold: 9,
    strainThreshold: 10,
    experience: 90,
    skills: {
      Perception: 1,
      description: 'One rank in Perception.'
    },
    talents: {
      nimble: {
        skills: {
          meleeDefense: 1,
          rangedDefense: 1
        },
        name: 'Nimble',
        source: 'CRB page 142',
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
    source: 'CRB page 142',
    description: 'See CRB, page 142, for more details.',
    setting: 'Fantasy',
    woundThreshold: 11,
    strainThreshold: 10,
    experience: 90,
    skills: {
      Resilience: 1,
      description: 'One rank in Resilience.'
    },
    talents: {
      darkvision: {
        name: 'Dark Vision',
        source: 'CRB page 142',
        description: 'See CRB, page 142, for more details.',
      },
      toughasnails: {
        name: 'Tough as Nails',
        source: 'CRB page 37',
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
    source: 'CRB page 143',
    description: 'See CRB, page 143, for more details.',
    setting: 'Fantasy',
    woundThreshold: 12,
    strainThreshold: 8,
    experience: 100,
    skills: {
      Coercion: 1,
      description: 'One rank in Coercion.'
    },
    talents: {
      battlerage: {
        name: 'Battle Rage',
        source: 'CRB page 143',
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
    source: 'CRB page 152',
    description: 'See CRB, page 152, for more details.',
    setting: 'Steampunk',
    woundThreshold: 10,
    strainThreshold: 8,
    experience: 100,
    skills: {
      Discipline: 1,
      description: 'One rank in Discipline.'
    },
    talents: {
      thebeastwithin: {
        name: 'The Beast Within',
        source: 'CRB page 152',
        description: 'See CRB, page 152, for more details.',
      },
      thehumanspirt: {
        name: 'The Human Spirit',
        source: 'CRB page 152',
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
    source: 'CRB page 152',
    description: 'See CRB, page 152, for more details.',
    setting: 'Steampunk',
    woundThreshold: 11,
    strainThreshold: 9,
    experience: 100,
    skills: {
      Coercion: 1,
      description: 'One rank in Coercion.'
    },
    talents: {
      reanimated: {
        name: 'Reanimated',
        source: 'CRB page 153',
        description: 'See CRB, page 153, for more details.',
      },
      deadnerves: {
        name: 'Dead Nerves',
        source: 'CRB page 153',
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
    source: 'CRB page 174',
    description: 'See CRB, page 174, for more details.',
    setting: 'Science Fiction',
    woundThreshold: 11,
    strainThreshold: 8,
    experience: 155,
    skills: {},
    talents: {
      robot: {
        name: 'Robot',
        source: 'CRB page 174',
        description: 'See CRB, page 174, for more details.',
      },
      inorganic: {
        name: 'Inorganic',
        source: 'CRB page 174',
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
    source: 'CRB page 174',
    description: 'See CRB, page 174, for more details.',
    setting: 'Science Fiction',
    woundThreshold: 11,
    strainThreshold: 10,
    experience: 80,
    skills: {
      Any: 2,
      description: '1 rank in 2 non-career skills.'
    },
    talents: {
      afaceinacrowd: {
        name: 'A Face in a Crowd',
        source: 'CRB page 174',
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
    source: 'CRB page 182',
    description: 'See CRB, page 182, for more details.',
    setting: 'Space Opera',
    woundThreshold: 10,
    strainThreshold: 8,
    experience: 70,
    skills: {
      Athletics: 1,
      Coordination: 1,
      Resilience: 1,
      description: 'One rank in Athletics, Coordination or Resilience.'
    },
    talents: {
      naturalweapons: {
        name: 'Natural Weapons',
        source: 'CRB page 182',
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
    source: 'CRB page 182',
    description: 'See CRB, page 182, for more details.',
    setting: 'Space Opera',
    woundThreshold: 7,
    strainThreshold: 11,
    experience: 70,
    skills: {},
    talents: {
      mindreader: {
        name: 'Mind Reader',
        source: 'CRB page 182',
        description: 'See CRB, page 182, for more details.',
      },
      mindshaper: {
        name: 'Mind Shaper',
        source: 'CRB page 182',
        description: 'See CRB, page 182, for more details.',
      },
      mindbreaker: {
        name: 'Mind Breaker',
        source: 'CRB page 182',
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
    source: 'CRB page 183',
    description: 'See CRB, page 183, for more details.',
    setting: 'Space Opera',
    woundThreshold: 10,
    strainThreshold: 10,
    experience: 175,
    skills: {
      careerSkills: 6,
      description: 'Choose 6 career skills.'
    },
    talents: {
      robot: {
        name: 'Robot',
        source: 'CRB page 174',
        description: 'See CRB, page 174, for more details.',
      },
      networkedintelligence: {
        name: 'Networked Intelligence',
        source: 'CRB page 183',
        description: 'See CRB, page 183, for more details.',
      },
      inorganic: {
        name: 'Inorganic',
        source: 'CRB page 174',
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

  Vangaurd: {
    name: 'Vangaurd',
    source: 'CRB page 183',
    description: 'See CRB, page 183, for more details.',
    setting: 'Space Opera',
    woundThreshold: 9,
    strainThreshold: 9,
    experience: 100,
    skills: {
      Knowledge: 1,
      description: 'One rank in Knowledge.'
    },
    talents: {
      spaceisourbirthright: {
        name: 'Space is our Birth Right',
        source: 'CRB page 183',
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
export default archetypes;

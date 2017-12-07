const archetypes = {
  averageHuman: {
    name: 'Average Human',
    source: 'CRB page 36',
    description: 'See CRB, page 36, for more details.',
    setting: 'all',
    woundThreshold: 10,
    strainThreshold: 10,
    experience: 110,
    skills: {
      any: 2
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

  laborer: {
    name: 'The Laborer',
    source: 'CRB page 37',
    description: 'See CRB, page 37, for more details.',
    setting: 'all',
    woundThreshold: 12,
    strainThreshold: 8,
    experience: 100,
    skills: {
      athletics: 1
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

  intellectual: {
    name: 'The Intellectual',
    source: 'CRB page 36',
    description: 'See CRB, page 36, for more details.',
    setting: 'all',
    woundThreshold: 8,
    strainThreshold: 12,
    experience: 100,
    skills: {
      knowledge: 1
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

  aristocrat: {
    name: 'The Aristocrat',
    source: 'CRB page 39',
    description: 'See CRB, page 39, for more details.',
    setting: 'all',
    woundThreshold: 10,
    strainThreshold: 10,
    experience: 100,
    skills: {
      cool: 1
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

  elf: {
    name: 'Elf',
    source: 'CRB page 142',
    description: 'See CRB, page 142, for more details.',
    setting: 'fantasy',
    woundThreshold: 9,
    strainThreshold: 10,
    experience: 90,
    skills: {
      perception: 1
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

  dwarf: {
    name: 'dwarf',
    source: 'CRB page 142',
    description: 'See CRB, page 142, for more details.',
    setting: 'fantasy',
    woundThreshold: 11,
    strainThreshold: 10,
    experience: 90,
    skills: {
      resilience: 1
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

  orc: {
    name: 'Orc',
    source: 'CRB page 143',
    description: 'See CRB, page 143, for more details.',
    setting: 'fantasy',
    woundThreshold: 12,
    strainThreshold: 8,
    experience: 100,
    skills: {
      coercion: 1
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

  mongrel: {
    name: 'Mongrel',
    source: 'CRB page 152',
    description: 'See CRB, page 152, for more details.',
    setting: 'Steampunk',
    woundThreshold: 10,
    strainThreshold: 8,
    experience: 100,
    skills: {
      discipline: 1
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

  revenant: {
    name: 'Revenant',
    source: 'CRB page 152',
    description: 'See CRB, page 152, for more details.',
    setting: 'Steampunk',
    woundThreshold: 11,
    strainThreshold: 9,
    experience: 100,
    skills: {
      coercion: 1
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

  bioroid: {
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

  clone: {
    name: 'Clone',
    source: 'CRB page 174',
    description: 'See CRB, page 174, for more details.',
    setting: 'Science Fiction',
    woundThreshold: 11,
    strainThreshold: 10,
    experience: 80,
    skills: {
      any: 2
    },
    talents: {
      afaceinacrowd: {
        name: 'A face in a Crowd',
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

  animalisticAlien: {
    name: 'Animalitic Alien',
    source: 'CRB page 182',
    description: 'See CRB, page 182, for more details.',
    setting: 'Space Opera',
    woundThreshold: 10,
    strainThreshold: 8,
    experience: 70,
    skills: {
      athletics: 1,
      corrdination: 1,
      resilience: 1
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

  psionic: {
    name: 'Psionic',
    source: 'CRB page 182',
    description: 'See CRB, page 182, for more details.',
    setting: 'Space Opera',
    woundThreshold: 7,
    strainThreshold: 11,
    experience: 70,
    skills: {
    },
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

  robot: {
    name: 'Robot',
    source: 'CRB page 183',
    description: 'See CRB, page 183, for more details.',
    setting: 'Space Opera',
    woundThreshold: 10,
    strainThreshold: 10,
    experience: 175,
    skills: {
      careerSkills: 6
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

  vangaurd: {
    name: 'Vangaurd',
    source: 'CRB page 183',
    description: 'See CRB, page 183, for more details.',
    setting: 'Space Opera',
    woundThreshold: 9,
    strainThreshold: 9,
    experience: 100,
    skills: {
      knowledge: 1
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

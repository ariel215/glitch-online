import { assertType } from 'vitest'

export enum Attribute {
  Eide,
  Flore,
  Lore,
  Wyrd,
  Ability
}

export enum Cost {
  Stilling,
  Immersion,
  Fuge,
  Burn,
  Wear
}

export class Player {
  playerName: String = ''
  characterName: String = ''
  luthe: String = ''
  bane: String = ''
  attributes: Map<Attribute, Number> = new Map()
  costs: Map<Cost, Number> = new Map()
  infection: number = 2
  gifts: Array<Gift> = []
  bonds: Array<Bond> = []
  geasa: Array<Geas> = []
  treasures: Array<String> = []
  arcana: Array<String> = []
  technique: String = ''
  quest: Quest | null = null

  constructor() {
    for (const [, attr] of Object.entries(Attribute)) {
      this.attributes.set(<Attribute>attr, 0)
    }
    for (const [, cost] of Object.entries(Cost)) {
      this.costs.set(<Cost>cost, 0)
    }
  }
}

export class Geas {
  description: String = ''
  attribute!: Attribute
  rating!: Number
}

export class Bond {
  truth!: String
  technique!: String
}

export class Gift {
  level!: number
  name!: String
  description!: String
  cost!: Cost
  activation!: 'automatic' | 'invoked' | 'casual' | 'painful'
  range!: 'anywhere' | 'local' | 'target' | 'self'
  flexibility!: 'anything' | 'wide' | 'limited' | 'single'
}

enum QuestArc {
  Bindings,
  Shepherd,
  Emptiness
}

export class Quest {
  arcs!: Array<{ arc: QuestArc; position: Number }>
  cost!: number
  cost_paid!: number
  conditions:
    | {
        anytime: Array<String>
      }
    | {
        major: Array<String>
        minor: Array<String>
      } = { anytime: [] }
}

export type Attribute = 'Eide' | 'Flore' | 'Lore' | 'Wyrd' | 'Ability'
export type Cost = 'Stilling' | 'Immersion' | 'Fuge' | 'Burn' | 'Wear'
export const ATTRIBUTES: Array<Attribute> = ['Eide', 'Flore', 'Lore', 'Wyrd', 'Ability']
export const COSTS: Array<Cost> = ['Stilling', 'Immersion', 'Fuge', 'Burn', 'Wear']

export class Character {
  playerName: string = ''
  characterName: string = ''
  luthe: string = ''
  bane: string = ''
  attributes: Map<Attribute, Number> = new Map()
  costs: Map<Cost, Number> = new Map()
  infection_level: number = 2
  gifts: Array<Gift> = []
  bonds: Array<Bond> = []
  geasa: Array<Geas> = []
  treasures: Array<string> = []
  arcana: Array<string> = []
  technique: string = ''
  quest: Quest | null = null

  constructor() {
    for (const attr of ATTRIBUTES) {
      this.attributes.set(attr, 0)
    }
    for (const cost of COSTS) {
      this.costs.set(cost, 0)
    }
  }
}

export class Geas {
  description: string = ''
  attribute!: Attribute
  rating!: Number
}

export class Bond {
  truth!: string
  technique!: string
}

export class Gift {
  level!: number
  name!: string
  description!: string
  cost!: Cost
  activation!: 'automatic' | 'invoked' | 'casual' | 'painful'
  range!: 'anywhere' | 'local' | 'target' | 'self'
  flexibility!: 'anything' | 'wide' | 'limited' | 'single'
}

export enum QuestArc {
  Bindings,
  Shepherd,
  Emptiness
}

export class Quest {
  name!: string
  arcs!: Array<{ arc: QuestArc; position: Number }>
  cost!: number
  cost_paid!: number
  conditions:
    | {
        anytime: Array<string>
      }
    | {
        major: Array<string>
        minor: Array<string>
      } = { anytime: [] }
}

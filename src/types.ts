export type Attribute = 'Eide' | 'Flore' | 'Lore' | 'Wyrd' | 'Ability'
export type Cost = 'Stilling' | 'Immersion' | 'Fuge' | 'Burn' | 'Wear'
export const ATTRIBUTES: Array<Attribute> = ['Eide', 'Flore', 'Lore', 'Wyrd', 'Ability']
export const COSTS: Array<Cost> = ['Stilling', 'Immersion', 'Fuge', 'Burn', 'Wear']

export class Character {
  playerName: string = '(Unknown)'
  characterName: string = '(Unknown)'
  luthe: string = ''
  bane: string = '(Unknown)'
  attributes: Map<Attribute, number> = new Map()
  costs: Map<Cost, number> = new Map()
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

export type Activation = 'automatic' | 'invoked' | 'casual' | 'painful'
export const Activations = ['automatic', 'invoked', 'casual', 'painful']
export type Range = 'anywhere' | 'local' | 'target' | 'self'
export const Ranges = ['anywhere', 'local', 'target', 'self']
export type Flexibility = 'anything' | 'wide' | 'limited' | 'single'
export const Flexibilities = ['anything', 'wide', 'limited', 'single']

export class Gift {
  level: number = 1
  name: string = '(None)'
  description!: '(None)'
  cost: Cost = 'Burn'
  activation: Activation = 'casual'
  range: Range = 'local'
  flexibility: Flexibility = 'limited'

  price(): number {
    let cost = 0
    cost += Activations.indexOf(this.activation) * -2 + 1
    cost += Ranges.indexOf(this.range) * -2 + 1
    cost += Flexibilities.indexOf(this.flexibility) * -2 + 1
    cost += this.level
    return cost
  }
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

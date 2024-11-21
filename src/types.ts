export type Attribute = 'Eide' | 'Flore' | 'Lore' | 'Wyrd' | 'Ability'
export type Cost = 'Stilling' | 'Immersion' | 'Fuge' | 'Burn' | 'Wear'
export const ATTRIBUTES: Array<Attribute> = ['Eide', 'Flore', 'Lore', 'Wyrd', 'Ability']
export const COSTS: Array<Cost> = ['Stilling', 'Immersion', 'Fuge', 'Burn', 'Wear']
export const CHARPT_MAX: number = 25

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

  cp() {
    let total = 0
    for (const [attr, val] of this.attributes) {
      total += val * (attr === 'Ability' ? 3 : 2)
    }
    for (const gift of this.gifts) {
      total += gift.price()
    }
    for (const _bond of this.bonds) {
      total += 1
    }
    for (const _geas of this.geasa) {
      total += 1
    }
    return total
  }
}

export class Bond {
  truth!: string
  technique!: string
}

export type Geas = string

export type Activation = 'automatic' | 'invoked' | 'casual' | 'painful'
export const ACTIVATIONS = ['automatic', 'invoked', 'casual', 'painful']
export type Range = 'anywhere' | 'local' | 'target' | 'self'
export const RANGES = ['anywhere', 'local', 'target', 'self']
export type Flexibility = 'anything' | 'wide' | 'limited' | 'single'
export const FLEXIBILITIES = ['anything', 'wide', 'limited', 'single']

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
    cost += ACTIVATIONS.indexOf(this.activation) * -2 + 1
    cost += RANGES.indexOf(this.range) * -2 + 1
    cost += FLEXIBILITIES.indexOf(this.flexibility) * -2 + 1
    cost += this.level
    return cost
  }

  copy(): Gift {
    const copy = new Gift()
    copy.level = this.level
    copy.name = this.name
    copy.description = this.description
    copy.cost = this.cost
    copy.activation = this.activation
    copy.range = this.range
    copy.flexibility = this.flexibility
    return copy
  }
}

export enum QuestArc {
  Bindings,
  Shepherd,
  Emptiness
}

export class Quest {
  name!: string
  description!: string
  arcs!: Array<{ arc: QuestArc; position: number }>
  cost!: number
  cost_paid!: number
  conditions:
    | {
        anytime: string
      }
    | {
        major: Array<string>
        minor: Array<string>
      } = { anytime: '' }
}

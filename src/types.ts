import { ref } from 'vue'

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
  technique: string = ''
  sanctuary: string = ''
  sphere: string = ''
  destruction: string = ''
  attributes: Map<Attribute, number> = new Map()
  costs: Map<Cost, number> = new Map()
  infection_level: number = 2
  gifts: Array<Gift> = []
  bonds: Array<Bond> = []
  geasa: Array<Geas> = []
  treasures: Array<string> = []
  arcana: Array<string> = []
  quests: Array<Quest> = []

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
    total += this.bonds.length
    total += this.geasa.length
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

export const QUESTARCS = ['Bindings', 'Sheperd', 'Emptiness']
export enum QuestArc {
  Bindings,
  Shepherd,
  Emptiness
}

export class Arc {
  arc: QuestArc
  position: number
  constructor(arc: QuestArc, position: number) {
    this.arc = arc
    this.position = position
  }
  toString() {
    return `${this.arc} ${this.position}`
  }
}

type Anytime = {
  anytime: string
}

type Storyline = {
  major: Array<string>
  minor: Array<string>
}

export type QuestDescription = {
  name?: string
  description?: string
  arcs?: Array<Arc>
  xp_needed?: number
  conditions: Anytime | Storyline
}

export class Quest implements QuestDescription {
  name: string = ''
  description: string = ''
  arcs: Array<Arc> = []
  xp_needed: number = 25
  xp: number = 0
  conditions:
    | {
        anytime: string
      }
    | {
        major: Array<string>
        minor: Array<string>
      } = { anytime: '' }

  constructor(
    name?: string,
    description?: string,
    arcs?: Array<Arc>,
    xp_needed?: number,
    conditions?: Anytime | Storyline
  ) {
    this.name = name || ''
    this.description = description || ''
    this.arcs = arcs || []
    this.xp_needed = xp_needed || 25
    this.xp = 0
    this.conditions = conditions || { anytime: '' }
  }
}

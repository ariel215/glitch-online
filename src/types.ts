export const ATTRIBUTES = ['Eide', 'Flore', 'Lore', 'Wyrd', 'Ability'] as const
export const COSTS = ['Stilling', 'Immersion', 'Fuge', 'Burn', 'Wear'] as const
export type Attribute = (typeof ATTRIBUTES)[number]
type AttributeMap = {
  [key in Attribute]: number
}
export type Cost = (typeof COSTS)[number]
type CostMap = {
  [key in Cost]: number
}
export const CHARPT_MAX: number = 25

export type Bond = {
  technique: string
  truth: string
}

export class Character {
  static curr_id = 0
  id: number
  playerName: string = '(Unknown)'
  characterName: string = '(Unknown)'
  luthe: string = ''
  bane: string = '(Unknown)'
  technique: string = ''
  sanctuary: string = ''
  sphere: string = ''
  destruction: string = ''
  attributes: AttributeMap = {
    Eide: 0,
    Flore: 0,
    Lore: 0,
    Wyrd: 0,
    Ability: 0
  }
  costs: CostMap = {
    Stilling: 0,
    Immersion: 0,
    Fuge: 0,
    Burn: 0,
    Wear: 0
  }

  infection_level: number = 2
  gifts: Array<Gift> = []
  bonds: Array<Bond> = []
  geasa: Array<Geas> = []
  treasures: Array<string> = []
  arcana: Array<string> = []
  quests: Array<Quest> = []

  constructor(params: Character | null = null) {
    if (!params) {
      this.id = Character.curr_id
      Character.curr_id += 1
    } else {
      this.id = Character.curr_id
      Object.assign(this, params)
    }
  }

  cp() {
    let total = 0
    for (const [attr, val] of Object.entries(this.attributes)) {
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

  constructor(params: Gift = {} as Gift) {
    Object.assign(this, params)
  }

  price(): number {
    let cost = 0
    cost += ACTIVATIONS.indexOf(this.activation) * -2 + 1
    cost += RANGES.indexOf(this.range) * -2 + 1
    cost += FLEXIBILITIES.indexOf(this.flexibility) * -2 + 1
    cost += this.level
    return Math.min(cost, 1)
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

export type Anytime = {
  kind: 'anytime'
  anytime: string
}

export type Storyline = {
  kind: 'storyline'
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
  conditions: Anytime | Storyline = { kind: 'anytime', anytime: '' }
  constructor(params: QuestDescription = {} as QuestDescription) {
    Object.assign(this, params)
  }
}

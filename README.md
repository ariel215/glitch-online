# glitch-app

A web app for character creation and management in _Glitch_ by Dr. Jenna Moran

Entities:

- Character
- Player
- Luthe
- Bane
- attribute
- attribute value
- cost
- cost level
- infection level
- gift
  - name
  - description
  - level
  - cost
  - activation
  - range
  - flexibility
- bond
  - truth
  - technique
- geas
  - description
  - attribute
  - rating
- treasure
- arcanum
- technique
- quest
  - quest arc
  - xp cost
  - xp acquired
  - conditions

Relations: 
============

```
Character (many) - player (1)
character (1)   - luthe (1)
                - bane (1)
                - infection level (1) 
                - technique (1) 
                
                - gift (many) 
                - bond (many) 
                - geas (many) 
                - treasure (many) 
                - archanum (many) 
                - quest (many)
```

## Tables:


### Character 
```
id
player
name
luthe
bane
infection_level
technique
```

###  Gifts 
```
id
character_id
name
description
level
cost
activation
range
flexibility
```

### Geasa 
```
id
character_id
description
attribute
rating
```


### Bonds 
```
id
character_id
truth
technique
```

## Treasures 
```
id
character_id
description
```

### Arcana
```
id
character_id
description
```

### Quests
```
id
character_id
name
arcs
cost
cost_paid
```

### QuestCondition
```
id
quest_id
type
description
```
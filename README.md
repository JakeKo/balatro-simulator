# Balatro Simulator

This application allows a user to simulate a hand in Balatro given a custom configuration of cards, jokers, and game state.

Much love to the kind and watchful stewards of the [Balatro Fandom Wiki](https://balatrogame.fandom.com/wiki/Balatro_Wiki).

# Card Modifier Tally

#### Enhancements

- [x] Bonus Card
- [x] Glass Card
- [ ] Gold Card
- [x] Lucky Card
- [x] Mult Card
- [ ] Steel Card
- [ ] Stone Card
- [x] Wild Card

#### Editions

- [x] Foil
- [ ] Holographic
- [ ] Polychrome
- [ ] Negative

#### Chips

- [ ] Gold
- [x] Red
- [ ] Blue
- [ ] Purple

# Joker Tally (39 / 150)

**8 Ball**

- Description: 1 in 4 chance for each played 8 to create a Tarot card when scored (Must have room)
- Anticipated changes: Probabilities, conditional Tarot card creation

**✅ Abstract Joker**

- Description: +3 Mult for each Joker card (Currently +0 Mult)

**✅ Acrobat**

- Description: X3 Mult on final hand of round

**✅ Ancient Joker**

- Description: Each played card with \[suit\] gives X1.5 Mult when scored, suit changes at end of round

**✅ Arrowhead**

- Description: Played cards with Spade suit give +50 Chips when scored

**Astronomer**

- Description: All Planet cards and Celestial Packs in the shop are free
- Anticipated changes: None - no hand effects

**✅ Banner**

- Description: +30 Chips for each remaining discard

**✅ Baron**

- Description: Each King held in hand gives X1.5 Mult

**Baseball Card**

- Description: Uncommon Jokers each give X1.5 Mult
- Anticipated changes: Traverse jokers, identify uncommon jokers, activate on visiting uncommon joker even if not scored

**✅ Blackboard**

- Description: X3 Mult if all cards held in hand are Spades or Clubs
- Anticipated changes: None - joker metadata

**Bloodstone**

- Description: 1 in 2 chance for played cards with Heart suit to give X1.5 Mult when scored
- Anticipated changes: Probabilities

**✅ Blue Joker**

- Description: +2 Chips for each remaining card in deck (Currently +104 Chips)

**Blueprint**

- Description: Copies ability of Joker to the right
- Anticipated changes: Traverse jokers, copy abilities

**Bootstraps**

- Description: +2 Mult for every $5 you have (Currently +0 Mult)
- Anticipated changes: None - joker metadata

**Brainstorm**

- Description: Copies the ability of leftmost Joker
- Anticipated changes: Traverse jokers, copy abilities

**Bull**

- Description: +2 Chips for each $1 you have (Currently +0 Chips)
- Anticipated changes: None - joker metadata

**Burglar**

- Description: When Blind is selected, gain +3 Hands and lose all discards
- Anticipated changes: Unify remainingDiscards(?)

**Burnt Joker**

- Description: Upgrade the level of the first discarded poker hand each round
- Anticipated changes: None - hand table updates

**Business Card**

- Description: Played face cards have a 1 in 2 chance to give $2 when scored
- Anticipated changes: Probabilities, adjusting money

**Campfire**

- Description: This Joker gains X0.25 Mult for each card sold, resets when Boss Blind is defeated (Currently X1 Mult)
- Anticipated changes: None - joker metadata

**Canio**

- Description: This Joker gains X1 Mult when a face card is destroyed (Currently X1 Mult)
- Anticipated changes: None - joker metadata

**Card Sharp**

- Description: X3 Mult if played poker hand has already been played this round
- Anticipated changes: None - joker metadata

**Cartomancer**

- Description: Create a Tarot card when Blind is selected (Must have room)
- Anticipated changes: None - no hand effects

**Castle**

- Description: This Joker gains +3 Chips per discarded \[suit\] card, suit changes every round (Currently +0 Chips)
- Anticipated changes: Persistent, mutable joker metadata (chip count)

**✅ Cavendish**

- Description: X3 Mult 1 in 1000 chance this card is destroyed at the end of round

**Ceremonial Dagger**

- Description: When Blind is selected, destroy Joker to the right and permanently add double its sell value to it's Mult (Currently +0 Mult)
- Anticipated changes: None - joker metadata

**Certificate**

- Description: When round begins, add a random playing card with a random seal to your hand
- Anticipated changes: None - no hand effects

**Chaos the Clown**

- Description: 1 free Reroll per shop
- Anticipated changes: None - no hand effects

**Chicot**

- Description: Disables effect of every Boss Blind
- Anticipated changes: None - no hand effects

**✅ Clever Joker**

- Description: +80 Chips if played hand contains a Two Pair

**Cloud 9**

- Description: Earn $1 for each 9 in your full deck at end of round (Currently $4)
- Anticipated changes: None - joker metadata

**Constellation**

- Description: This Joker gains X0.1 Mult every time a Planet card is used (Currently X1 Mult)
- Anticipated changes: None - joker metadata

**✅ Crafty Joker**

- Description: +80 Chips if played hand contains a Flush

**✅ Crazy Joker**

- Description: +12 Mult if played hand contains a Straight

**Credit Card**

- Description: Go up to -$20 in debt
- Anticipated changes: None - no hand effects

**Delayed Gratification**

- Description: Earn $2 per discard if no discards are used by end of the round
- Anticipated changes: Track money

**✅ Devious Joker**

- Description: +100 Chips if played hand contains a Straight

**Diet Cola**

- Description: Sell this card to create a free Double Tag
- Anticipated changes: None - no hand effects

**DNA**

- Description: If first hand of round has only 1 card, add a permanent copy to deck and draw it to hand
- Anticipated changes: None - no hand effects

**Driver's License**

- Description: X3 Mult if you have at least 16 Enhanced cards in your full deck (Currently 0)
- Anticipated changes: None - joker metadata

**✅ Droll Joker**

- Description: +10 Mult if played hand contains a Flush

**Drunkard**

- Description: +1 discard each round
- Anticipated changes: None - joker metadata

**Dusk**

- Description: Retrigger all played cards in final hand of the round
- Anticipated changes: None - retrigger mechanics

**Egg**

- Description: Gains $3 of sell value at end of round
- Anticipated changes: None - no hand effects

**Erosion**

- Description: +4 Mult for each card below \[the deck's starting size\] in your full deck (Currently +0 Mult)
- Anticipated changes: None - joker metadata

**✅ Even Steven**

- Description: Played cards with even rank give +4 Mult when scored (10, 8, 6, 4, 2)

**Faceless Joker**

- Description: Earn $5 if 3 or more face cards are discarded at the same time
- Anticipated changes: None - no hand effects

**Fibonacci**

- Description: Each played Ace, 2, 3, 5, or 8 gives +8 Mult when scored
- Anticipated changes: None

**Flash Card**

- Description: This Joker gains +2 Mult per reroll in the shop (Currently +0 Mult)
- Anticipated changes: None - joker metadata

**Flower Pot**

- Description: X3 Mult if poker hand contains a Diamond card, Club card, Heart card, and Spade card
- Anticipated changes: None

**✅ Fortune Teller**

- Description: +1 Mult per Tarot card used this run (Currently +0)

**Four Fingers**

- Description: All Flushes and Straights can be made with 4 cards
- Anticipated changes: Intercept checks for straights and flushes

**Gift Card**

- Description: Add $1 of sell value to every Joker and Consumable card at end of round
- Anticipated changes: None - no hand effects

**Glass Joker**

- Description: This Joker gains X0.75 Mult for every Glass Card that is destroyed (Currently X1 Mult)
- Anticipated changes: Probabilities

**Gluttonous Joker**

- Description: Played cards with Club suit give +3 Mult when scored
- Anticipated changes: None

**Golden Joker**

- Description: Earn $4 at end of round
- Anticipated changes: Track money

**Golden Ticket**

- Description: Played Gold cards earn $4 when scored
- Anticipated changes: Track money

**Greedy Joker**

- Description: Played cards with Diamond suit give +3 Mult when scored
- Anticipated changes: None

**Green Joker**

- Description: +1 Mult per hand played -1 Mult per discard (Currently +0 Mult)
- Anticipated changes: None - joker metadata

**✅ Gros Michel**

- Description: +15 Mult 1 in 6 chance this card is destroyed at the end of round.

**Hack**

- Description: Retrigger each played 2, 3, 4, or 5
- Anticipated changes: None - retrigger mechanics

**✅ Half Joker**

- Description: +20 Mult if played hand contains 3 or fewer cards

**Hallucination**

- Description: 1 in 2 chance to create a Tarot card when any Booster Pack is opened (Must have room)
- Anticipated changes: None - no hand effects

**✅ Hanging Chad**

- Description: Retrigger first played card used in scoring 2 additional times

**Hiker**

- Description: Every played card permanently gains +5 Chips when scored
- Anticipated changes: Persistent, mutable joker metadata

**Hit the Road**

- Description: This Joker gains X0.5 Mult for every Jack discarded this round (Currently X1 Mult)
- Anticipated changes: None - joker metadata

**Hologram**

- Description: This Joker gains X0.25 Mult every time a playing card is added to your deck (Currently X1 Mult)
- Anticipated changes: None - joker metadata

**Ice Cream**

- Description: +100 Chips -5 Chips for every hand played
- Anticipated changes: None - joker metadata

**Invisible Joker**

- Description: After 2 rounds, sell this card to Duplicate a random Joker (Currently 0/2) (Removes Negative from copy)
- Anticipated changes: None - no hand effects

**✅ Joker**

- Description: +4 Mult

**Joker Stencil**

- Description: X1 Mult for each empty Joker slot. Joker Stencil included (Currently X1)
- Anticipated changes: Traverse jokers

**✅ Jolly Joker**

- Description: +8 Mult if played hand contains a Pair

**Juggler**

- Description: +1 hand size
- Anticipated changes: None - no hand effects

**Loyalty Card**

- Description: X4 Mult every 6 hands played (5 remaining)
- Anticipated changes: None - joker metadata

**Luchador**

- Description: Sell this card to disable the current Boss Blind
- Anticipated changes: None - joker metadata

**Lucky Cat**

- Description: This Joker gains X0.25 Mult every time a Lucky card successfully triggers (Currently X1 Mult)
- Anticipated changes: Persistent, mutable joker metadata

**Lusty Joker**

- Description: Played cards with Heart suit give +3 Mult when scored
- Anticipated changes: None

**✅ Mad Joker**

- Description: +10 Mult if played hand contains a Two Pair

**Madness**

- Description: When Small Blind or Big Blind is selected, gain X0.5 Mult and destroy a random Joker (Currently X1 Mult)
- Anticipated changes: None - no hand effects

**Mail-In Rebate**

- Description: Earn $5 for each discarded \[rank\], rank changes every round
- Anticipated changes: Track money

**Marble Joker**

- Description: Adds one Stone card to the deck when Blind is selected
- Anticipated changes: None - no hand effects

**Matador**

- Description: Earn $8 if played hand triggers the Boss Blind ability
- Anticipated changes: Track money

**Merry Andy**

- Description: +3 discards each round, -1 hand size
- Anticipated changes: None - joker metadata

**Midas Mask**

- Description: All played face cards become Gold cards when scored
- Anticipated changes: None - no hand effects

**Mime**

- Description: Retrigger all card held in hand abilities
- Anticipated changes: Traver cards in hand, retrigger mechanics

**Misprint**

- Description: +0-23 Mult
- Anticipated changes: Probabilities

**Mr. Bones**

- Description: Prevents Death if chips scored are at least 25% of required chips self destructs
- Anticipated changes: None - no hand effects

**Mystic Summit**

- Description: +15 Mult when 0 discards remaining
- Anticipated changes: None - joker metadata

**Obelisk**

- Description: This Joker gains X0.2 Mult per consecutive hand played without playing your most played poker hand (Currently X1 Mult)
- Anticipated changes: None - joker metadata

**✅ Odd Todd**

- Description: Played cards with odd rank give +31 Chips when scored (A, 9, 7, 5, 3)

**Onyx Agate**

- Description: Played cards with Club suit give +7 Mult when scored
- Anticipated changes: None

**Oops! All 6s**

- Description: Doubles all listed probabilities (ex: 1 in 3 -> 2 in 3)
- Anticipated changes: Probabilities, intercept probability check

**Pareidolia**

- Description: All cards are considered face cards
- Anticipated changes: Intercept face card check

**Perkeo**

- Description: Creates a Negative copy of 1 random consumable card in your possession at the end of the shop
- Anticipated changes: None - no hand effects

**✅ Photograph**

- Description: First played face card gives X2 Mult when scored

**Popcorn**

- Description: +20 Mult -4 Mult per round played
- Anticipated changes: None - joker metadata

**Raised Fist**

- Description: Adds double the rank of lowest ranked card held in hand to Mult
- Anticipated changes: None - joker metadata

**Ramen**

- Description: X2 Mult, loses X0.01 Mult per card discarded
- Anticipated changes: None - joker metadata

**Red Card**

- Description: This Joker gains +3 Mult when any Booster Pack is skipped (Currently +0 Mult)
- Anticipated changes: None - joker metadata

**Reserved Parking**

- Description: Each face card held in hand has a 1 in 2 chance to give $1
- Anticipated changes: Probabilities, track money

**Ride the Bus**

- Description: This Joker gains +1 Mult per consecutive hand played without a scoring face card (Currently +0 Mult)
- Anticipated changes: None - no hand effects

**Riff-Raff**

- Description: When Blind is selected, create 2 Common Jokers (Must have room)
- Anticipated changes: None - no hand effects

**Rocket**

- Description: Earn $1 at end of round. Payout increases by $2 when Boss Blind is defeated
- Anticipated changes: None - no hand effects

**Rough Gem**

- Description: Played cards with Diamond suit earn $1 when scored
- Anticipated changes: Track money

**Runner**

- Description: Gains +15 Chips if played hand contains a Straight (Currently +0 Chips)
- Anticipated changes: None

**Satellite**

- Description: Earn $1 at end of round per unique Planet card used this run
- Anticipated changes: None - no hand effects

**✅ Scary Face**

- Description: Played face cards give +30 Chips when scored

**✅ Scholar**

- Description: Played Aces give +20 Chips and +4 Mult when scored

**Séance**

- Description: If poker hand is a Straight Flush, create a random Spectral card (Must have room)
- Anticipated changes: None - no hand effects

**Seeing Double**

- Description: X2 Mult if played hand has a scoring Club card and a scoring card of any other suit
- Anticipated changes: None

**Seltzer**

- Description: Retrigger all cards played for the next 10 hands
- Anticipated changes: Retrigger mechanics, joker metadata

**Shoot the Moon**

- Description: Each Queen held in hand gives +13 Mult
- Anticipated changes: None - joker metadata

**Shortcut**

- Description: Allows Straights to be made with gaps of 1 rank (ex: 10 8 6 5 3)
- Anticipated changes: Intercept check for straight

**Showman**

- Description: Joker, Tarot, Planet, and Spectral cards may appear multiple times
- Anticipated changes: None - no hand effects

**Sixth Sense**

- Description: If first hand of round is a single 6, destroy it and create a Spectral card (Must have room)
- Anticipated changes: None - no hand effects

**✅ Sly Joker**

- Description: +50 Chips if played hand contains a Pair

**Smeared Joker**

- Description: Hearts and Diamonds count as the same suit, Spades and Clubs count as the same suit
- Anticipated changes: Intercept suit check

**✅ Smiley Face**

- Description: Played face cards give +5 Mult when scored

**Sock and Buskin**

- Description: Retrigger all played face cards
- Anticipated changes: Retrigger mechanics

**Space Joker**

- Description: 1 in 4 chance to upgrade level of played poker hand
- Anticipated changes: Probabilities, hand table updates

**Spare Trousers**

- Description: This Joker gains +2 Mult if played hand contains a Two Pair (Currently +0 Mult)
- Anticipated changes: Persistent, mutable joker metadata

**Splash**

- Description: Every played card counts in scoring
- Anticipated changes: Intercept scored cards calculation

**Square Joker**

- Description: This Joker gains +4 Chips if played hand has exactly 4 cards (Currently 0 Chips)
- Anticipated changes: Persistent, mutable joker metadata

**Steel Joker**

- Description: Gives X0.2 Mult for each Steel Card in your full deck (Currently X1 Mult)
- Anticipated changes: None - joker metadata

**Stone Joker**

- Description: Gives +25 Chips for each Stone Card in your full deck (Currently +0 Chips)
- Anticipated changes: None - joker metadata

**Stuntman**

- Description: +250 Chips, -2 hand size
- Anticipated changes: None - joker metadata

**Supernova**

- Description: Adds the number of times poker hand has been played this run to Mult
- Anticipated changes: None - joker metadata

**Superposition**

- Description: Create a Tarot card if poker hand contains an Ace and a Straight (Must have room)
- Anticipated changes: None - no hand effects

**Swashbuckler**

- Description: Adds the sell value of all other owned Jokers to Mult (Currently +1 Mult)
- Anticipated changes: Traverse jokers OR joker metadata

**The Duo**

- Description: X2 Mult if played hand contains a Pair
- Anticipated changes: None

**The Family**

- Description: X4 Mult if played hand contains a Four of a Kind
- Anticipated changes: None

**The Idol**

- Description: Each played \[rank\] of \[suit\] gives X2 Mult when scored Card changes every round
- Anticipated changes: None - joker metadata

**✅ The Order**

- Description: X3 Mult if played hand contains a Straight

**✅ The Tribe**

- Description: X2 Mult if played hand contains a Flush

**✅ The Trio**

- Description: X3 Mult if played hand contains a Three of a Kind

**✅ Throwback**

- Description: X0.25 Mult for each Blind skipped this run (Currently X1 Mult)

**To Do List**

- Description: Earn $4 if poker hand is a \[Poker Hand\], poker hand changes at end of round
- Anticipated changes: Track money, joker metadata

**To the Moon**

- Description: Earn an extra $1 of interest for every $5 you have at end of round
- Anticipated changes: Track money

**Trading Card**

- Description: If first discard of round has only 1 card, destroy it and earn $3
- Anticipated changes: Track money

**✅ Triboulet**

- Description: Played Kings and Queens each give X2 Mult when scored

**Troubadour**

- Description: +2 hand size, -1 hand per round
- Anticipated changes: None - no hand effects

**Turtle Bean**

- Description: +5 hand size, reduces by 1 each round
- Anticipated changes: None - no hand effects

**Vagabond**

- Description: Create a Tarot card if hand is played with $4 or less
- Anticipated changes: Track money, Tarot card creation

**Vampire**

- Description: This Joker gains X0.1 Mult per scoring Enhanced card played, removes card Enhancement (Currently X1 Mult)
- Anticipated changes: Persistent, mutable joker metadata

**✅ Walkie Talkie**

- Description: Each played 10 or 4 gives +10 Chips and +4 Mult when scored

**✅ Wee Joker**

- Description: This Joker gains +8 Chips when each played 2 is scored (Currently +0 Chips)

**✅ Wily Joker**

- Description: +100 Chips if played hand contains a Three of a Kind

**✅ Wrathful Joker**

- Description: Played cards with Spade suit give +3 Mult when scored

**✅ Yorick**

- Description: This Joker gains X1 Mult every 23 \[23\] cards discarded (Currently X1 Mult)

**✅ Zany Joker**

- Description: +12 Mult if played hand contains a Three of a Kind

# Known Failing Hands

- Any hands using jokers or card modifiers not indicated above
- Any hands requiring input from the blind (e.g. The Hook impacting cards in hand mid-round)

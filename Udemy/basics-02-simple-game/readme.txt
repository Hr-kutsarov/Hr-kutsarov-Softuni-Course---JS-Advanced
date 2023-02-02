How to use this file:

Unpack the zip folder
start the index.html file

Input username - start condition

The bottom part of the interface will show yours and your opponent's health respectively.

An attack will reduce the enemy's health.

If the attacker is the player - the monster's health will be reduced

If the attacker is the monster - the player's health will be reduced

Player's base attack damage = 10
Monster's base attack damage = 15
Player's Recuperate restores 45 health points for the player
The player has a chance to block = the value of shield block on his shield
The player has a base chance to block of 5%
The monster's base chance to block is 30% ( the monster is bigger = game logic )
The Player's base chance to deal extra damage (aka critical aka powerful hit) is 20%
The monsters's base chance to deal extra damage is 60%

Player can Recuperate:
    while healing the player takes 80% less damage
    while healing the monster has a 30% chance to miss
    player changes location / WIP
    player regains health

End game condition - 
    Player won or Player lost

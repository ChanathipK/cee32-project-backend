// (+1  atk)              : 1,  20 cards
// (+2  atk -2 hp)        : 2,  10 cards
// (+3  atk -3 hp)        : 3,  5  cards
// (+4  hp)               : 4,  15 cards
// (+1  def +1 hp)        : 5,  12 cards
// (+3  def)              : 6,  6  cards
// (+15 hp  -2 atk -2 def): 7,  3  cards
// (+5  def -3 atk)       : 8,  9  cards
// (+7  hp  -2 atk)       : 9,  10 cards
// (draw 2)               : 10, 10 cards
let cards = [];
for (let i = 0; i < 20; i++) {
    cards.push(1);
}
for (let i = 0; i < 10; i++) {
    cards.push(2);
}
for (let i = 0; i < 5; i++) {
    cards.push(3);
}
for (let i = 0; i < 15; i++) {
    cards.push(4);
}
for (let i = 0; i < 12; i++) {
    cards.push(5);
}
for (let i = 0; i < 6; i++) {
    cards.push(6);
}
for (let i = 0; i < 3; i++) {
    cards.push(7);
}
for (let i = 0; i < 9; i++) {
    cards.push(8);
}
for (let i = 0; i < 10; i++) {
    cards.push(9);
}
for (let i = 0; i < 10; i++) {
    cards.push(10);
}

module.exports = cards;
// (+1 atk): 1,  20 cards
// (+2 atk): 2,  10 cards
// (+1 atk): 3,  5  cards
// (-1 atk): 4,  15 cards
// (+1 def): 5,  12 cards
// (+2 def): 6,  6  cards
// (+1 def): 7,  3  cards
// (-1 def): 8,  9  cards
// (skip target 1 turn): 9,  10 cards
// (penertrate 1 time):  10, 10 cards
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
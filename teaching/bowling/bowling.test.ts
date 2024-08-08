import { BowlingGame } from "./bowling";
import { test, expect, beforeEach } from "vitest";

let game;

beforeEach(() => {
  game = new BowlingGame();
});

function rollMany(rolls, pins) {
  for (let i = 0; i < rolls; i++) {
    game.roll(pins);
  }
}

function rollSpare(firstRoll) {
  game.roll(firstRoll);
  game.roll(10 - firstRoll);
}

test("rolling 20 zeroes gives a score of zero", () => {
  rollMany(20, 0);
  expect(game.score()).toEqual(0);
});

test("rolling 20 ones gives a score of 20", () => {
  rollMany(20, 1);
  expect(game.score()).toEqual(20);
});

test("spare + 3 gives score of 16", () => {
  rollSpare(4);
  game.roll(3);
  rollMany(17, 0);
  expect(game.score()).toEqual(16);
});

test("stike, 3 +4 gives a score of 24", () => {
  game.roll(10); // Strike
  game.roll(3);
  game.roll(4);
  rollMany(16, 0);
  expect(game.score()).toBe(24);
});

test("perfect game is 300", () => {
  rollMany(12, 10);
  expect(game.score()).toBe(300);
});

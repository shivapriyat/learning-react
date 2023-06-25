import { timesTwo } from "./function"

test("Multiplies by two", ()=> {
    expect(timesTwo(3)).toBe(6);
})
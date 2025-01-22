import { evaluate } from "./evaluator";
import { describe, it, expect } from "vitest";
import { parse } from "./parser";
import { lex } from "./lexer";

describe("evaluate", () => {
  it("should evaluate empty program", () => {
    const input = "";
    expect(evaluate(parse(lex(input)))).toEqual(0);
  });

  it("should evaluate integer literal", () => {
    const input = "1";
    expect(evaluate(parse(lex(input)))).toEqual(1);
  });

  it("should evaluate addition expression", () => {
    const input = "1 + 2";
    expect(evaluate(parse(lex(input)))).toEqual(3);
  });

  it("should evaluate complex expression", () => {
    const input = "2 / 4 + 2 * 3 / 4 - 1";
    expect(evaluate(parse(lex(input)))).toEqual(1);
  });

  it("should evaluate variable declaration", () => {
    const input = "VAR a = 1";
    expect(evaluate(parse(lex(input)))).toEqual(1);
  });

  it("should evaluate variable assignment and usage", () => {
    const input = `
VAR a = 1
a
`.trim();
    expect(evaluate(parse(lex(input)))).toEqual(1);
  });

  it("should evaluate variable assignment and use in expression", () => {
    const input = `
VAR a = 1
VAR b = 2
a + b
`.trim();
    expect(evaluate(parse(lex(input)))).toEqual(3);
  });
});

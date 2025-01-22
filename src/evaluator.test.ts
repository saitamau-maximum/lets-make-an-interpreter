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

  describe("should evaluate if statement", () => {
    it("should evaluate if statement with true condition", () => {
      const input = `
VAR a = 1
IF a == 1 {
  2
}
`.trim();
      expect(evaluate(parse(lex(input)))).toEqual(2);
    });

    it("should evaluate if statement with false condition", () => {
      const input = `
VAR a = 2
IF a == 1 {
  2
}
`.trim();
      expect(evaluate(parse(lex(input)))).toEqual(0);
    });

    it("should evaluate if-else statement with true condition", () => {
      const input = `
VAR a = 1
IF a == 1 {
  2
} ELSE {
  3
}
`.trim();
      expect(evaluate(parse(lex(input)))).toEqual(2);
    });

    it("should evaluate if-else statement with false condition", () => {
      const input = `
VAR a = 2
IF a == 1 {
  2
} ELSE {
  3
}
`.trim();
      expect(evaluate(parse(lex(input)))).toEqual(3);
    });

    it("should evaluate complex if-else statement", () => {
      const input = `
VAR a = 1
VAR b = 2

IF a < b {
  a + b
} ELSE {
  a - b
}
`.trim();
      expect(evaluate(parse(lex(input)))).toEqual(3);
    });
  });
});

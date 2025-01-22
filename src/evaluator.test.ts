import { evaluate } from "./evaluator";
import { describe, it, expect } from "vitest";
import { parse } from "./parser";
import { lex } from "./lexer";

describe("evaluate", () => {
  it("should evaluate integer literal", () => {
    const input = "1";
    expect(evaluate(parse(lex(input)))).toEqual(1);
  });
});

import { lex } from "./lexer";
import { parse } from "./parser";
import { describe, it, expect } from "vitest";

describe("parser", () => {
  it("should parse variable declaration", () => {
    const input = "VAR a = 1";
    expect(parse(lex(input))).toEqual({
      type: "Program",
      body: [
        {
          type: "VariableDeclaration",
          identifier: "a",
          value: {
            type: "IntegerLiteral",
            value: 1,
          },
        },
      ],
    });
  });
});

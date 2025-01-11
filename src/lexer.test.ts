import { TokenType, lex } from "./lexer";
import { describe, it, expect } from "vitest";

describe("lex", () => {
  it("should parse variable declaration", () => {
    const input = "VAR a = 1";
    expect(lex(input)).toEqual([
      { type: TokenType.VAR },
      { type: TokenType.IDENTIFIER, value: "a" },
      { type: TokenType.ASSIGN },
      { type: TokenType.INT, value: 1 },
      { type: TokenType.EOF },
    ]);
  });

  it("should parse if statement", () => {
    const input = "IF a < b { a + b } ELSE { a - b }";
    expect(lex(input)).toEqual([
      { type: TokenType.IF },
      { type: TokenType.IDENTIFIER, value: "a" },
      { type: TokenType.LT },
      { type: TokenType.IDENTIFIER, value: "b" },
      { type: TokenType.LBRACE },
      { type: TokenType.IDENTIFIER, value: "a" },
      { type: TokenType.PLS },
      { type: TokenType.IDENTIFIER, value: "b" },
      { type: TokenType.RBRACE },
      { type: TokenType.ELSE },
      { type: TokenType.LBRACE },
      { type: TokenType.IDENTIFIER, value: "a" },
      { type: TokenType.MIN },
      { type: TokenType.IDENTIFIER, value: "b" },
      { type: TokenType.RBRACE },
      { type: TokenType.EOF },
    ]);
  });

  it("should parse arithmetic expression", () => {
    const input = "1 + 2 * 3 / 4";
    expect(lex(input)).toEqual([
      { type: TokenType.INT, value: 1 },
      { type: TokenType.PLS },
      { type: TokenType.INT, value: 2 },
      { type: TokenType.MUL },
      { type: TokenType.INT, value: 3 },
      { type: TokenType.DIV },
      { type: TokenType.INT, value: 4 },
      { type: TokenType.EOF },
    ]);
  });

  it("should parse comparison expression", () => {
    const input = "a < b > c == d != e";
    expect(lex(input)).toEqual([
      { type: TokenType.IDENTIFIER, value: "a" },
      { type: TokenType.LT },
      { type: TokenType.IDENTIFIER, value: "b" },
      { type: TokenType.GT },
      { type: TokenType.IDENTIFIER, value: "c" },
      { type: TokenType.EQ },
      { type: TokenType.IDENTIFIER, value: "d" },
      { type: TokenType.NE },
      { type: TokenType.IDENTIFIER, value: "e" },
      { type: TokenType.EOF },
    ]);
  });

  it("should parse block", () => {
    const input = "{ a + b }";
    expect(lex(input)).toEqual([
      { type: TokenType.LBRACE },
      { type: TokenType.IDENTIFIER, value: "a" },
      { type: TokenType.PLS },
      { type: TokenType.IDENTIFIER, value: "b" },
      { type: TokenType.RBRACE },
      { type: TokenType.EOF },
    ]);
  });

  it("should parse big program", () => {
    const input = `
VAR a = 1
VAR b = 2
IF a < b {
  a + b
} ELSE {
  a - b
}
`;
    expect(lex(input)).toEqual([
      { type: TokenType.VAR },
      { type: TokenType.IDENTIFIER, value: "a" },
      { type: TokenType.ASSIGN },
      { type: TokenType.INT, value: 1 },
      { type: TokenType.VAR },
      { type: TokenType.IDENTIFIER, value: "b" },
      { type: TokenType.ASSIGN },
      { type: TokenType.INT, value: 2 },
      { type: TokenType.IF },
      { type: TokenType.IDENTIFIER, value: "a" },
      { type: TokenType.LT },
      { type: TokenType.IDENTIFIER, value: "b" },
      { type: TokenType.LBRACE },
      { type: TokenType.IDENTIFIER, value: "a" },
      { type: TokenType.PLS },
      { type: TokenType.IDENTIFIER, value: "b" },
      { type: TokenType.RBRACE },
      { type: TokenType.ELSE },
      { type: TokenType.LBRACE },
      { type: TokenType.IDENTIFIER, value: "a" },
      { type: TokenType.MIN },
      { type: TokenType.IDENTIFIER, value: "b" },
      { type: TokenType.RBRACE },
      { type: TokenType.EOF },
    ]);
  });
});

import { TokenType, lex } from "./lexer";
import { describe, it, expect } from "vitest";

describe("lexer", () => {
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
});

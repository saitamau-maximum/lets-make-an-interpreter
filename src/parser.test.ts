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

  it("should parse complex expression statement", () => {
    const input = "2 / 4 + 2 * 3 / 4";
    expect(parse(lex(input))).toEqual({
      type: "Program",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "AdditionExpression",
            left: {
              type: "DivisionExpression",
              left: {
                type: "IntegerLiteral",
                value: 2,
              },
              right: {
                type: "IntegerLiteral",
                value: 4,
              },
            },
            right: {
              type: "DivisionExpression",
              left: {
                type: "MultiplicationExpression",
                left: {
                  type: "IntegerLiteral",
                  value: 2,
                },
                right: {
                  type: "IntegerLiteral",
                  value: 3,
                },
              },
              right: {
                type: "IntegerLiteral",
                value: 4,
              },
            },
          },
        },
      ],
    });
  });

  it("should parse variable declaration with expression", () => {
    const input = "VAR a = 1 + 2";
    expect(parse(lex(input))).toEqual({
      type: "Program",
      body: [
        {
          type: "VariableDeclaration",
          identifier: "a",
          value: {
            type: "AdditionExpression",
            left: {
              type: "IntegerLiteral",
              value: 1,
            },
            right: {
              type: "IntegerLiteral",
              value: 2,
            },
          },
        },
      ],
    });
  });
});

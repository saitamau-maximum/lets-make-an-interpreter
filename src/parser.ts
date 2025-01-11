import { Token } from "./lexer";

export type Program = {
  type: "Program";
  body: Statement[];
};

export type Statement =
  | VariableDeclaration
  | ExpressionStatement
  | IfStatement
  | BlockStatement;

export type Expression =
  | IntegerLiteral
  | Identifier
  | AdditionExpression
  | SubtractionExpression
  | MultiplicationExpression
  | DivisionExpression
  | LessThanExpression
  | GreaterThanExpression
  | EqualExpression
  | NotEqualExpression;

export type VariableDeclaration = {
  type: "VariableDeclaration";
  identifier: string;
  value: Expression;
};

export type IntegerLiteral = {
  type: "IntegerLiteral";
  value: number;
};

export type Identifier = {
  type: "Identifier";
  value: string;
};

type BinaryExpression<T extends string> = {
  type: T;
  left: Expression;
  right: Expression;
};

export type AdditionExpression = BinaryExpression<"AdditionExpression">;
export type SubtractionExpression = BinaryExpression<"SubtractionExpression">;
export type MultiplicationExpression =
  BinaryExpression<"MultiplicationExpression">;
export type DivisionExpression = BinaryExpression<"DivisionExpression">;
export type LessThanExpression = BinaryExpression<"LessThanExpression">;
export type GreaterThanExpression = BinaryExpression<"GreaterThanExpression">;
export type EqualExpression = BinaryExpression<"EqualExpression">;
export type NotEqualExpression = BinaryExpression<"NotEqualExpression">;

export type ExpressionStatement = {
  type: "ExpressionStatement";
  expression: Expression;
};

export type IfStatement = {
  type: "IfStatement";
  condition: Expression;
  consequent: BlockStatement;
  alternate: BlockStatement;
};

export type BlockStatement = {
  type: "BlockStatement";
  body: Statement[];
};

export function parse(tokens: Token[]): Program {
  return {
    type: "Program",
    body: [],
  };
}

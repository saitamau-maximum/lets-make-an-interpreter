import { Token, TokenType } from "./lexer";

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
  alternate?: BlockStatement;
};

export type BlockStatement = {
  type: "BlockStatement";
  body: Statement[];
};

export function parse(tokens: Token[]): Program {
  const program: Program = {
    type: "Program",
    body: [],
  };

  while (tokens.length > 0) {
    const token = tokens.at(0);

    if (!token) {
      break;
    }

    switch (token.type) {
      case TokenType.VAR:
        tokens.shift();
        program.body.push(parseVariableDeclaration(tokens));
        break;
      case TokenType.EOF:
        tokens.shift();
        break;
      default:
        throw new Error(`Unexpected token: ${token.type}`);
    }
  }

  return program;
}

function expectToken<T extends TokenType>(
  token: Token | undefined,
  type: T
): Extract<Token, { type: T }> {
  if (!token) {
    throw new Error(`Unexpected end of input. Expected ${type}`);
  }

  if (token.type !== type) {
    throw new Error(`Unexpected token: ${token.type}. Expected ${type}`);
  }

  return token as Extract<Token, { type: T }>;
}

function parseVariableDeclaration(tokens: Token[]): VariableDeclaration {
  const identifier = expectToken(tokens.shift(), TokenType.IDENTIFIER);
  expectToken(tokens.shift(), TokenType.ASSIGN);
  const value = parseValue(tokens);

  return {
    type: "VariableDeclaration",
    identifier: identifier.value,
    value,
  };
}

function parseValue(tokens: Token[]): Expression {
  const token = tokens.shift();

  if (!token) {
    throw new Error("Unexpected end of input");
  }

  switch (token.type) {
    case TokenType.INT:
      return { type: "IntegerLiteral", value: token.value };
    case TokenType.IDENTIFIER:
      return { type: "Identifier", value: token.value };
    default:
      throw new Error(`Unexpected token: ${token.type}`);
  }
}

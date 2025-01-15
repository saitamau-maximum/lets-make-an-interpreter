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

    if (token.type === TokenType.EOF) {
      break;
    }

    program.body.push(parseStatement(tokens));
  }

  return program;
}

function parseStatement(tokens: Token[]): Statement {
  const token = tokens.at(0);

  if (!token) {
    throw new Error("Unexpected end of input");
  }

  switch (token.type) {
    case TokenType.VAR:
      tokens.shift();
      return parseVariableDeclaration(tokens);
    case TokenType.IDENTIFIER:
    case TokenType.INT:
      return {
        type: "ExpressionStatement",
        expression: parseExpression(tokens),
      };
    case TokenType.LBRACE:
      return {
        type: "BlockStatement",
        body: parseBlock(tokens),
      };
    default:
      throw new Error(`Unexpected token: ${token.type}`);
  }
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

function parseBlock(tokens: Token[]): Statement[] {
  const statements: Statement[] = [];

  expectToken(tokens.shift(), TokenType.LBRACE);

  while (true) {
    const token = tokens.at(0);

    if (!token) {
      throw new Error("Unexpected end of input");
    }

    if (token.type === TokenType.RBRACE) {
      tokens.shift();
      return statements;
    }

    statements.push(parseStatement(tokens));
  }
}

function parseVariableDeclaration(tokens: Token[]): VariableDeclaration {
  const identifier = expectToken(tokens.shift(), TokenType.IDENTIFIER);
  expectToken(tokens.shift(), TokenType.ASSIGN);
  const value = parseExpression(tokens);

  return {
    type: "VariableDeclaration",
    identifier: identifier.value,
    value,
  };
}

function parseExpression(tokens: Token[]): Expression {
  let lhs = parseTerm(tokens);
  while (true) {
    const token = tokens.at(0);

    switch (token?.type) {
      case TokenType.PLS:
        tokens.shift();
        lhs = {
          type: "AdditionExpression",
          left: lhs,
          right: parseTerm(tokens),
        };
        break;
      case TokenType.MIN:
        tokens.shift();
        lhs = {
          type: "SubtractionExpression",
          left: lhs,
          right: parseTerm(tokens),
        };
        break;
      default:
        return lhs;
    }
  }
}

function parseTerm(tokens: Token[]): Expression {
  let lhs = parseValue(tokens);
  while (true) {
    const token = tokens.at(0);

    switch (token?.type) {
      case TokenType.MUL:
        tokens.shift();
        lhs = {
          type: "MultiplicationExpression",
          left: lhs,
          right: parseValue(tokens),
        };
        break;
      case TokenType.DIV:
        tokens.shift();
        lhs = {
          type: "DivisionExpression",
          left: lhs,
          right: parseValue(tokens),
        };
        break;
      default:
        return lhs;
    }
  }
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
      return parseExpression(tokens);
  }
}

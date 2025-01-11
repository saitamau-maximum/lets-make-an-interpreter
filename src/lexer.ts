export enum TokenType {
  INT = "INT",
  PLS = "PLS",
  MIN = "MIN",
  MUL = "MUL",
  DIV = "DIV",
  LT = "LT",
  GT = "GT",
  EQ = "EQ",
  NE = "NE",
  IF = "IF",
  ELSE = "ELSE",
  VAR = "VAR",
  EOF = "EOF",
  ASSIGN = "ASSIGN",
  LBRACE = "LBRACE",
  RBRACE = "RBRACE",
  IDENTIFIER = "IDENTIFIER",
}

export type Token =
  | { type: TokenType.INT; value: number }
  | { type: TokenType.PLS }
  | { type: TokenType.MIN }
  | { type: TokenType.MUL }
  | { type: TokenType.DIV }
  | { type: TokenType.LT }
  | { type: TokenType.GT }
  | { type: TokenType.EQ }
  | { type: TokenType.NE }
  | { type: TokenType.IF }
  | { type: TokenType.ELSE }
  | { type: TokenType.VAR }
  | { type: TokenType.EOF }
  | { type: TokenType.ASSIGN }
  | { type: TokenType.LBRACE }
  | { type: TokenType.RBRACE }
  | { type: TokenType.IDENTIFIER; value: string };


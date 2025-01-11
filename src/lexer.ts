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

export function lex(input: string): Token[] {
  const tokens: Token[] = [];
  let pos = 0;

  while (pos < input.length) {
    const char = input[pos];

    if (char === " " || char === "\t" || char === "\n") {
      pos++;
      continue;
    }

    // 英文字列が来たら、キーワードか識別子のどちらかを判定する
    if (char.match(/[a-zA-Z]/)) {
      // 英文字列が続く限り読み進める
      let value = "";
      while (pos < input.length && input[pos].match(/[a-zA-Z]/)) {
        value += input[pos];
        pos++;
      }
      switch (value) {
        case "VAR":
          tokens.push({ type: TokenType.VAR });
          break;
        default:
          // キーワードのどれにも一致しない場合は識別子
          tokens.push({ type: TokenType.IDENTIFIER, value });
          break;
      }

      continue;
    }

    // 数値が来たら、整数値としてトークンを切り出す
    if (char.match(/[0-9]/)) {
      let value = "";
      while (pos < input.length && input[pos].match(/[0-9]/)) {
        value += input[pos];
        pos++;
      }
      tokens.push({ type: TokenType.INT, value: parseInt(value, 10) });
      continue;
    }

    // 演算子をトークンとして切り出す
    switch (char) {
      case "=":
        tokens.push({ type: TokenType.ASSIGN });
        break;
      default:
        // それ以外は知らない文字なのでエラー
        throw new Error(`Unexpected character: ${char}`);
    }

    pos++;
  }

  tokens.push({ type: TokenType.EOF });

  return tokens;
}

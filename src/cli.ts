import { lex } from "./lexer";
import { parse } from "./parser";
import { evaluate } from "./evaluator";
import * as fs from "fs/promises";
import * as path from "path";

export const main = async () => {
  const args = process.argv.slice(2);
  const cwd = process.cwd();
  const input = args[0];

  if (!input) {
    console.error("Usage: lmai <filepath>");
    process.exit(1);
  }

  const absolutePath = path.resolve(cwd, input);
  const fileContent = await fs.readFile(absolutePath, "utf-8");
  const tokens = lex(fileContent);
  const ast = parse(tokens);
  const result = evaluate(ast);

  console.log(result);
};

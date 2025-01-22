import { Expression, Program, Statement } from "./parser";

type Env = Record<string, number>; // Variable name to value mapping (scope)

const evaluateProgram = (program: Program, env: Env): number => {
  let result = 0;
  for (const statement of program.body) {
    result = evaluateStatement(statement, env);
  }
  return result;
};

const evaluateStatement = (statement: Statement, env: Env): number => {
  switch (statement.type) {
    case "ExpressionStatement":
      return evaluateExpression(statement.expression, env);
    default:
      throw new Error(`Unknown statement: ${statement}`);
  }
};

const evaluateExpression = (expression: Expression, env: Env): number => {
  switch (expression.type) {
    case "IntegerLiteral":
      return expression.value;
    default:
      throw new Error(`Unknown expression: ${expression}`);
  }
};

export const evaluate = (program: Program): number => {
  const env: Env = {};
  return evaluateProgram(program, env);
};

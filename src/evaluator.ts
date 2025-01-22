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
    case "VariableDeclaration":
      env[statement.identifier] = evaluateExpression(statement.value, env);
      return env[statement.identifier];
    case "IfStatement":
      if (evaluateExpression(statement.condition, env) !== 0) {
        return evaluateStatement(statement.consequent, env);
      }
      if (statement.alternate) {
        return evaluateStatement(statement.alternate, env);
      }
      return 0;
    case "BlockStatement":
      let result = 0;
      for (const innerStatement of statement.body) {
        result = evaluateStatement(innerStatement, env);
      }
      return result;
    default:
      throw new Error(`Unknown statement: ${statement}`);
  }
};

const evaluateExpression = (expression: Expression, env: Env): number => {
  switch (expression.type) {
    case "IntegerLiteral":
      return expression.value;
    case "AdditionExpression":
      return (
        evaluateExpression(expression.left, env) +
        evaluateExpression(expression.right, env)
      );
    case "SubtractionExpression":
      return (
        evaluateExpression(expression.left, env) -
        evaluateExpression(expression.right, env)
      );
    case "MultiplicationExpression":
      return (
        evaluateExpression(expression.left, env) *
        evaluateExpression(expression.right, env)
      );
    case "DivisionExpression":
      return (
        evaluateExpression(expression.left, env) /
        evaluateExpression(expression.right, env)
      );
    case "LessThanExpression":
      return evaluateExpression(expression.left, env) <
        evaluateExpression(expression.right, env)
        ? 1
        : 0;
    case "GreaterThanExpression":
      return evaluateExpression(expression.left, env) >
        evaluateExpression(expression.right, env)
        ? 1
        : 0;
    case "EqualExpression":
      return evaluateExpression(expression.left, env) ===
        evaluateExpression(expression.right, env)
        ? 1
        : 0;
    case "NotEqualExpression":
      return evaluateExpression(expression.left, env) !==
        evaluateExpression(expression.right, env)
        ? 1
        : 0;
    case "Identifier":
      return env[expression.value];
    default:
      throw new Error(`Unknown expression: ${expression}`);
  }
};

export const evaluate = (program: Program): number => {
  const env: Env = {};
  return evaluateProgram(program, env);
};

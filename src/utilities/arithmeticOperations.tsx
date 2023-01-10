export type OperationArrayType = [Function, number];

export function zero(operation?: OperationArrayType): number {
  return operation! ? operation[0](0, operation[1]) : 0;
}
export function one(operation?: OperationArrayType): number {
  return operation! ? operation[0](1, operation[1]) : 1;
}
export function two(operation?: OperationArrayType): number {
  return operation! ? operation[0](2, operation[1]) : 2;
}
export function three(operation?: OperationArrayType): number {
  return operation! ? operation[0](3, operation[1]) : 3;
}
export function four(operation?: OperationArrayType): number {
  return operation! ? operation[0](4, operation[1]) : 4;
}
export function five(operation?: OperationArrayType): number {
  return operation! ? operation[0](5, operation[1]) : 5;
}
export function six(operation?: OperationArrayType): number {
  return operation! ? operation[0](6, operation[1]) : 6;
}
export function seven(operation?: OperationArrayType): number {
  return operation! ? operation[0](7, operation[1]) : 7;
}
export function eight(operation?: OperationArrayType): number {
  return operation! ? operation[0](8, operation[1]) : 8;
}
export function nine(operation?: OperationArrayType): number {
  return operation! ? operation[0](9, operation[1]) : 9;
}

export function plus(a: number, b: number): number | [Function, number] {
  return b !== undefined ? a + b : [plus, a];
}
export function minus(a: number, b: number): number | [Function, number] {
  return b !== undefined ? a - b : [minus, a];
}
export function times(a: number, b: number): number | [Function, number] {
  return b !== undefined ? a * b : [times, a];
}
export function divided_by(
  a: number,
  b: number
): number | [Function, number] | undefined {
  if (b === 0) {
    return undefined;
  }
  return b !== undefined ? a / b : [divided_by, a];
}

export function evalOperationExpression(
  expression: string
): number | undefined {
  const evaluation = eval(expression);

  return evaluation !== undefined ? parseInt(evaluation) : undefined;
}

export function operationExpression(
  leftOperand: string,
  rightOperand: string,
  operator: string
): string {
  return `${leftOperand}( ${operator}( ${rightOperand}() ) )`;
}

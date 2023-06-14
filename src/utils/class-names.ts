export type EvaluableClass = string | null | undefined | boolean | number

export function classNames(...classes: EvaluableClass[]) {
  return classes.filter(Boolean).join(" ");
}
export const foo = (arg: number) => {
  const _ = "a";

  const _test = _ === "a" ? 1 : 2;

  if (arg === 0) return 0;
  if (arg === 1) return 1;
  return arg;
};

foo(10);

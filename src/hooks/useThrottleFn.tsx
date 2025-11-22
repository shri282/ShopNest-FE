export function useThrottleFn<Func extends (...args: any[]) => void>(
  func: Func,
  limit: number
): Func {
  let inThrottle: boolean;
  let lastArgs: any;

  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          func.apply(this, lastArgs);
          lastArgs = null;
        }
      }, limit);
    } else {
      lastArgs = args;
    }
  } as Func;
}

export const promisify = function<T = unknown>(f: (...a: unknown[]) => T) {
  return function(...args: unknown[]): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        const result = f(...args);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }
}
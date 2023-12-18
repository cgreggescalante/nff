export const promiseWithTimeout = <T>(
  promise: Promise<T>,
  ms: number
): Promise<T> => {
  console.log('promiseWithTimeout');

  const timeout = new Promise<T>((_, reject) => {
    setTimeout(() => {
      reject(new Error('timeout'));
    }, ms);
  });

  return Promise.race([promise, timeout]);
};

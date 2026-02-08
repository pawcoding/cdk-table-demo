export function sleep(ms: number, abortSignal: AbortSignal): Promise<void> {
  let timeout: ReturnType<typeof setTimeout>;

  const promise = new Promise<void>((resolve, reject) => {
    timeout = setTimeout(() => resolve(), ms);

    abortSignal.addEventListener('abort', () => {
      clearTimeout(timeout);
      reject(new Error('Sleep aborted'));
    });
  }).finally(() => clearTimeout(timeout));

  return promise;
}

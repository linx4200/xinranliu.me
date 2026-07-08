import { useState, useEffect } from 'react';

// https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only

export const useEnsureRunOnClient = <ResultType>(fn: () => ResultType) => {
  const [result, setResult] = useState<null | ResultType>(null)

  useEffect(() => {
    // Using setTimeout(..., 0) is a workaround to avoid the 'cascading renders' error caused by calling setState synchronously within an effect.
    setTimeout(() => {
      const result = fn();
      setResult(result);
    }, 0);
  }, [fn]);

  return result;
}
import { useCallback, useState } from "react";

export interface UseActionHandler<Args extends any[]> {
  onClick: (...args: Args) => void | Promise<void>;
  disabled: boolean;
}

export const useActionHandler = <Args extends any[]>(
  action: (...args: Args) => void | Promise<void>,
): UseActionHandler<Args> => {
  const [loading, setLoading] = useState(false);

  const wrapped = useCallback(
    async (...args: Args) => {
      if (loading) return; // 二重実行防止
      try {
        setLoading(true);
        // 同期関数なら即時実行され、Promise.resolveで処理される
        await action(...args);
      } finally {
        setLoading(false);
      }
    },
    [action, loading],
  );

  return { onClick: wrapped, disabled: loading };
};

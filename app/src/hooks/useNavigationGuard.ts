import { useCallback } from "react";
import { useBlocker, type Blocker, type BlockerFunction } from "react-router";

export type UseNavigationGuardState = Blocker["state"];

export interface UseNavigationGuardControls {
  ok: () => void;
  cancel: () => void;
}

export interface UseNavigationGuard {
  state: UseNavigationGuardState;
  controls: UseNavigationGuardControls;
}

/**
 * 画面遷移をブロックしブロック後の処理に関する制御を提供するカスタムフック
 * @param {() => boolean} callback 画面遷移ブロックの条件を実装するコールバック関数（true: ブロックする, false: ブロックしない）
 */
export const useNavigationGuard = (
  callback?: () => boolean,
): UseNavigationGuard => {
  const shouldBlock = useCallback<BlockerFunction>(
    ({ currentLocation, nextLocation }) => {
      if (currentLocation.pathname === nextLocation.pathname) {
        return false;
      }
      // 画面遷移が発生したとき
      if (callback === undefined) {
        // 画面遷移ブロックのコールバックがないときはブロック
        return true;
      }
      // コールバックがあれば実行結果を元にブロック可否を制御する
      return callback();
    },
    [callback],
  );

  const blocker = useBlocker(shouldBlock);

  const ok = useCallback(() => {
    if (blocker.state === "blocked") {
      blocker.proceed();
    }
  }, [blocker]);

  const cancel = useCallback(() => {
    if (blocker.state === "blocked") {
      blocker.reset();
    }
  }, [blocker]);

  return {
    state: blocker.state,
    controls: {
      ok,
      cancel,
    },
  };
};

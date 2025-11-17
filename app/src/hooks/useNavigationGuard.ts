import { useCallback } from "react";
import { useBlocker, type Blocker, type BlockerFunction } from "react-router";

export type UseNavigationGuardValue = {
  state: Blocker["state"];
  location: Blocker["location"];
};

export interface UseNavigationGuardControls {
  ok: () => void;
  cancel: () => void;
}

export interface UseNavigationGuard {
  value: UseNavigationGuardValue;
  controls: UseNavigationGuardControls;
}

/**
 * 画面遷移をブロックしブロック後の処理に関する制御を提供するカスタムフック
 * @param {() => boolean} [callback] 画面遷移ブロックの条件を実装するコールバック関数（true: ブロックする, false: ブロックしない）
 * @example
 * ```jsx
 * export default function Page() {
 *   const navigationGuard = useNavigationGuard()
 *
 *   return (
 *     <div>
 *       <div>page</div>
 *       <Portal>
 *         {navigationGuard.value.state === "blocked" && (
 *           <Portal.ModalContainer>
 *             <Overlay />
 *             <Modal>
 *               <Modal.CloseButton onClick={navigationGuard.controls.cancel} />
 *               <Modal.Header>画面遷移を検知</Modal.Header>
 *               <Modal.Body>画面遷移します。よろしいですか？</Modal.Body>
 *               <Modal.Divider />
 *               <Modal.Footer>
 *                 <ActionPanel>
 *                   <ActionPanel.Left>
 *                     <Button onClick={navigationGuard.controls.ok}>ok</Button>
 *                   </ActionPanel.Left>
 *                   <ActionPanel.Center></ActionPanel.Center>
 *                   <ActionPanel.Right>
 *                     <Button onClick={navigationGuard.controls.cancel}>cancel</Button>
 *                   </ActionPanel.Right>
 *                 </ActionPanel>
 *               </Modal.Footer>
 *             </Modal>
 *           </Portal.ModalContainer>
 *         )}
 *       </Portal>
 *     </div>
 *   );
 * }
 * ```
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
    value: {
      state: blocker.state,
      location: blocker.location,
    },
    controls: {
      ok,
      cancel,
    },
  };
};

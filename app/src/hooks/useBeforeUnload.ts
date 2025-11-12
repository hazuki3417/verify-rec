import { useEffect } from "react";

/**
 * ページ離脱前に確認ダイアログを表示するカスタムフック
 * @param {() => boolean} callback ページ離脱の条件を実装するコールバック関数(true: 許可, false: 許可しない)
 */
export const useBeforeUnload = (callback: () => boolean) => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (callback()) {
        // callbackがtrueを返した場合、ページ離脱を許可する
        return;
      }
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [callback]);
};

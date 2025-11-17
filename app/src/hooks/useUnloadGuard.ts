import { useEffect } from "react";

/**
 * ページ離脱前に確認ダイアログを表示するカスタムフック
 * ページ離脱のトリガー
 * - ブラウザを閉じる
 * - タブを閉じる
 * - 更新
 * @param {() => boolean} callback ページ離脱の条件を実装するコールバック関数(true: ブロックする, false: ブロックしない)
 */
export const useUnloadGuard = (callback: () => boolean) => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (callback()) {
        // callbackがtrueを返した場合、ページ離脱の確認をする
        event.preventDefault();
        event.returnValue = "";
        return;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [callback]);
};

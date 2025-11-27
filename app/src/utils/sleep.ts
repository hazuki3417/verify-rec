/**
 * 指定した時間だけ待機します。
 * @param ms 待機する時間を指定します（ミリ秒)
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

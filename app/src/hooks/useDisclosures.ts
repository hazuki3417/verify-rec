import { useDisclosure } from "./useDisclosure";
import type {
  UseDisclosure,
  UseDisclosureState,
} from "./useDisclosure";

/** useDisclosures のキー配列の型 */
export type UseDisclosuresKeys = readonly string[];

/** useDisclosures のオプション型 */
export type UseDisclosuresOption<T extends UseDisclosuresKeys> = {
  /** 各キーごとの初期状態を指定 */
  initial?: Partial<Record<T[number], UseDisclosureState>>;
};

/** useDisclosures の戻り値型 */
export type UseDisclosures<T extends UseDisclosuresKeys> = Record<
  T[number],
  UseDisclosure
>;

/**
 * 複数の開閉状態をまとめて管理するカスタムフック
 *
 * @example
 * ```tsx
 * const disclosures = useDisclosures(["upload", "register", "confirm"], {
 *   initial: { upload: "opened" },
 * });
 *
 * disclosures.upload.state; // "opened" | "closed"
 * disclosures.register.controls.open();
 * ```
 *
 * @param keys 管理対象のキー配列
 * @param option 各キーの初期状態を指定（省略可）
 * @returns 各キーに対応する UseDisclosure オブジェクトを含むレコード
 */
export const useDisclosures = <const T extends UseDisclosuresKeys>(
  keys: T,
  option?: UseDisclosuresOption<T>,
): UseDisclosures<T> => {
  const disclosures = {} as UseDisclosures<T>;

  for (const key of keys) {
    const k = key as T[number];
    disclosures[k] = useDisclosure({
      initial: option?.initial?.[k] ?? "closed",
    });
  }

  return disclosures;
};

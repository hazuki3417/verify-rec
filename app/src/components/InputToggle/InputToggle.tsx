import React, { forwardRef, useState } from "react";
import styled from "styled-components";
import { type StyledProps } from "@/utils/props";

type BaseProps = React.InputHTMLAttributes<HTMLInputElement>;

interface StyleProps { }

const Base = styled.input<StyledProps<StyleProps>>`
  appearance: none;
  opacity: 0;
  pointer-events: none;
`;

export interface InputToggleProps
  extends StyleProps,
  Omit<BaseProps, "style" | "type" | "children"> {
  node: {
    on: React.ReactNode;
    off: React.ReactNode;
  };
}

/**
 * ON/OFF切り替え用ノードの定義
 * @typedef {Object} InputToggleNode
 * @property {React.ReactNode} on - ON状態のときに表示する要素
 * @property {React.ReactNode} off - OFF状態のときに表示する要素
 */

/**
 * InputToggle コンポーネントのプロパティ
 * @typedef {Object} InputToggleProps
 * @property {InputToggleNode} node - ON/OFF時の表示内容を定義するオブジェクト
 * @property {boolean} [defaultChecked=false] - 初期状態（ONならtrue）
 * @property {boolean} [disabled] - 無効状態を指定
 * @property {(e: React.ChangeEvent<HTMLInputElement>) => void} [onChange] - 状態変更時のコールバック
 */

/**
 * on/offのinputを提供するコンポーネントです。（input type="checkbox"と同じ機能）
 * on/off時のUIをカスタマイズ可能なinputコンポーネントです。
 *
 * @example
 * ```jsx
 * <InputToggle
 *   node={{
 *     on: <IconTakeOver color="pealEmerald" />, // on時の表示
 *     off: <IconTakeOver color="pealGray" />,   // off時の表示
 *   }}
 * />
 * ```
 */
export const InputToggle = forwardRef<HTMLInputElement, InputToggleProps>(
  (props, ref) => {
    const { node, defaultChecked = false, disabled, onChange, ...rest } = props;

    // NOTE: on/offの表示切り替えをするためのstate
    const [checked, setChecked] = useState(defaultChecked);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) setChecked((prev) => !prev);
      // 外部から渡されたonChangeを実行
      onChange?.(event);
    };

    // NOTE: disabledのUI変更も必要な場合はnode.disabledを許容するように拡張する

    return (
      <label style={{ cursor: disabled ? "not-allowed" : "pointer" }}>
        <Base
          ref={ref}
          {...rest}
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          type="checkbox"
        />
        {checked ? node.on : node.off}
      </label>
    );
  },
);

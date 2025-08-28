import { theme } from "@/theme";
import { color, type Color } from "./color";
import { valueResolver, type ResolverValueMapArg } from "./resolver";

export type IconColor = Color;
export type IconSize = keyof typeof theme.icon.size;

export type IconColorProp = { color?: IconColor };
export type IconSizeProp = { size?: IconSize };

export interface IconStyleProps extends IconColorProp, IconSizeProp {}

export type IconColorValueMap = Record<IconColor, string>;
export type IconSizeValueMap = Record<IconSize, string>;

/**
 * themeからコンポーネント内で利用するtokenを作成
 */

export const iconColorValueMap = Object.fromEntries(
	Object.entries(color).map(([key, value]) => [key, value]),
) as IconColorValueMap;

export const iconSizeValueMap = Object.fromEntries(
	Object.entries(theme.icon.size).map(([key, value]) => [key, value]),
) as IconSizeValueMap;

/**
 * propsの値に対応するcss propertiesを返す関数群
 * NOTE: ここで指定している初期値はprop基準の初期値
 */

export const resolveIconColor = (arg: ResolverValueMapArg<IconColor>) => {
	const { prop, value } = arg;
	return valueResolver(prop, value, "riverBlue");
};

export const resolveIconSize = (arg: ResolverValueMapArg<IconSize>) => {
	const { prop, value } = arg;
	return valueResolver(prop, value, "24");
};

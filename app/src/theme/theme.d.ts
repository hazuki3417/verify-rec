import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		color: {
			main: {
				emerald: string;
			};
			base: {
				pealGray: string;
				riverBlue: string;
				veryPealGray: string;
				white: string;
			};
			sub: {
				black: string;
				coral: string;
				darkEmerald: string;
				darkGray: string;
				gray: string;
				green: string;
				lightGray: string;
				lightPink: string;
				lightYellow: string;
				ocher: string;
				pealEmerald: string;
				skyBlue: string;
				slightlyEmerald: string;
				slightlyLightGray: string;
				slightlyLightPink: string;
			};
			status: {
				lightBeige: string;
				lightBlue: string;
				lightGreen: string;
				lightYellow: string;
				peacockGreen: string;
				pink: string;
				purple: string;
				slightlyLightBlue: string;
				slightlyLightOrange: string;
				slightlyLightRed: string;
				yellowGreen: string;
			};
		};
		font: {
			size: {
				"10": string;
				"11": string;
				"12": string;
				"14": string;
				"16": string;
				"18": string;
				"20": string;
				"24": string;
			};
			lineHight: {
				"160": string;
			};
			weight: {
				regular: string;
				medium: string;
				semiBold: string;
				bold: string;
			};
		};
	}
}

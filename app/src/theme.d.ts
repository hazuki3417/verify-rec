import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		color: {
			mainEmerald: string;

			basePealGray: string;
			baseRiverBlue: string;
			baseVeryPealGray: string;
			baseWhite: string;
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

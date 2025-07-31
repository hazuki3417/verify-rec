import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		colors: {
			primary: string;
			secondary: string;
			text: string;
			background: string;
		};
		spacing: {
			sm: string;
			md: string;
			lg: string;
		};
		font: {
			base: string;
			size: string;
		};
		radius: {
			sm: string;
			md: string;
		};
	}
}

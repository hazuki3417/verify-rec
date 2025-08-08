import { Providers } from "./../src/Providers";
import "./../src/css/token.css";
import { Styles } from "./../src/styles";

export const decorators = [
	(renderStory: any) => (
		<>
			<Styles />
			<Providers>{renderStory()}</Providers>
		</>
	),
];

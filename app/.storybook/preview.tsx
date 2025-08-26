import { Providers } from "./../src/components/Providers";
import { Styles } from "./../src/styles";

export const decorators = [
	(renderStory: any) => (
		<>
			<Styles />
			<Providers>{renderStory()}</Providers>
		</>
	),
];

import { Providers } from "./../src/Providers";
import "./../src/css/token.css";

export const decorators = [
	(renderStory: any) => <Providers>{renderStory()}</Providers>,
];

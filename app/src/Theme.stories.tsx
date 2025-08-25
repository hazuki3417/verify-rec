import type { Meta, StoryObj } from "@storybook/react";
import { theme } from "./theme";

const meta = {
	title: "Theme",
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

const Item = ({ name, value }: { name: string; value: string }) => (
	<div
		style={{
			display: "flex",
			alignItems: "center",
			gap: "8px",
			padding: "8px",
		}}
	>
		<div
			style={{
				width: "45px",
				height: "45px",
				border: "1px solid #000000",
				backgroundColor: value,
			}}
		></div>
		<div>{name}</div>
	</div>
);

export const ColorCatalog: Story = {
	render: (args) => {
		return (
			<div
				style={{
					display: "flex",
					gap: "8px",
					padding: "8px",
				}}
			>
				<div>
					<p>main</p>
					{Object.entries(theme.color.main).map(([key, value]) => {
						return <Item key={key} name={key} value={value} />;
					})}
				</div>
				<div>
					<div>
						<p>base</p>
					</div>
					{Object.entries(theme.color.base).map(([key, value]) => {
						return <Item key={key} name={key} value={value} />;
					})}
				</div>
				<div>
					<p>sub</p>
					{Object.entries(theme.color.sub).map(([key, value]) => {
						return <Item key={key} name={key} value={value} />;
					})}
				</div>
				<div>
					<p>status</p>
					{Object.entries(theme.color.status).map(([key, value]) => {
						return <Item key={key} name={key} value={value} />;
					})}
				</div>
			</div>
		);
	},
};

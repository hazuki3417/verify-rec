import type { Meta, StoryObj } from "@storybook/react";
import { ListItem } from "./ListItem";
import { List } from "./List";

const meta = {
  title: "List/List.Item",
  component: ListItem,
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "item",
  },
};

export const ShowProp: Story = {
  render: (args) => {
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            padding: "8px",
          }}
        >
          <div>true</div>
          <div>
            <List>
              <List.Item {...args} show={true}>
                item
              </List.Item>
            </List>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            padding: "8px",
          }}
        >
          <div>false</div>
          <div>
            <List>
              <List.Item {...args} show={false}>
                item
              </List.Item>
            </List>
          </div>
        </div>
      </div>
    );
  },
};

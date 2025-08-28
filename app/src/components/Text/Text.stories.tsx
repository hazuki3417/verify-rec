import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";
import {
  fontColorStyleMap,
  fontLineHeightStyleMap,
  fontSizeStyleMap,
  fontWeightStyleMap,
  type FontColor,
  type FontLineHeight,
  type FontSize,
  type FontWeight,
} from "../props/font";
import {
  textLineModeStyleMap,
  textOverflowModeStyleMap,
  type TextLineMode,
  type TextOverflowMode,
} from "../props";

const meta = {
  title: "Components/Text",
  component: Text,
  argTypes: {
    fontColor: {
      options: Object.keys(fontColorStyleMap),
    },
    fontLineHeight: {
      options: Object.keys(fontLineHeightStyleMap),
    },
    fontWeight: {
      options: Object.keys(fontWeightStyleMap),
    },
    fontSize: {
      options: Object.keys(fontSizeStyleMap),
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SetChildren: Story = {
  args: {
    children: "書き込みした図面を保存",
  },
};

export const ColorProp: Story = {
  render: (args) => {
    return (
      <div>
        {Object.entries(fontColorStyleMap).map(([prop]) => {
          const value = prop as FontColor;
          return (
            <div
              key={prop}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                padding: "8px",
              }}
            >
              <div>{prop}</div>
              <div>
                <Text {...args} fontColor={value}>
                  Text Component
                </Text>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};

export const SizeProp: Story = {
  render: (args) => {
    return (
      <div>
        {Object.entries(fontSizeStyleMap).map(([prop]) => {
          const value = prop as FontSize;
          return (
            <div
              key={prop}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                padding: "8px",
              }}
            >
              <div>{prop}</div>
              <div>
                <Text {...args} fontSize={value}>
                  Text Component
                </Text>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};

export const LineHeightProp: Story = {
  render: (args) => {
    return (
      <div>
        {Object.entries(fontLineHeightStyleMap).map(([prop]) => {
          const value = prop as FontLineHeight;
          return (
            <div
              key={prop}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                padding: "8px",
              }}
            >
              <div>{prop}</div>
              <div>
                <Text {...args} fontLineHeight={value}>
                  Text Component
                </Text>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};

export const WeightProp: Story = {
  render: (args) => {
    return (
      <div>
        {Object.entries(fontWeightStyleMap).map(([prop]) => {
          const value = prop as FontWeight;
          return (
            <div
              key={prop}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                padding: "8px",
              }}
            >
              <div>{prop}</div>
              <div>
                <Text {...args} fontWeight={value}>
                  Text Component
                </Text>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};

export const LineModeProp: Story = {
  render: (args) => {
    return (
      <div>
        {Object.entries(textLineModeStyleMap).map(([prop]) => {
          const value = prop as TextLineMode;
          return (
            <div
              key={prop}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                padding: "8px",
              }}
            >
              <div>{prop}</div>
              <div>
                <Text {...args} lineMode={value}>
                  ながいテキストながいテキストながいテキストながいテキストながいテキストながいテキストながいテキストながいテキストながいテキストながいテキストながいテキストながいテキスト
                  {
                    "ながいテキスト\nながいテキスト\nながいテキスト\nながいテキスト\nながいテキスト\nながいテキスト\nながいテキスト\nながいテキスト\nながいテキスト\nながいテキスト\nながいテキスト\n"
                  }
                </Text>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};

export const OverflowProp: Story = {
  render: (args) => {
    return (
      <div>
        {Object.entries(textOverflowModeStyleMap).map(([prop]) => {
          const value = prop as TextOverflowMode;
          return (
            <div
              key={prop}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                padding: "8px",
              }}
            >
              <div>{prop}</div>
              <div>
                <Text {...args} lineMode="single" overflowMode={value}>
                  ながいテキストながいテキストながいテキストながいテキストながいテキストながいテキストながいテキストながいテキストながいテキストながいテキストながいテキストながいテキスト
                  {
                    "ながいテキスト\nながいテキスト\nながいテキスト\nながいテキスト\nながいテキスト\nながいテキスト\nながいテキスト\nながいテキスト\nながいテキスト\nながいテキスト\nながいテキスト\n"
                  }
                </Text>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { Badge, badgeVariantStyleMap, badgeColorStyleMap } from "./Badge";
import type { BadgeVariant, BadgeColor } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  args: {
    children: "Badge",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const VariantProp: Story = {
  render: (args) => {
    return (
      <div>
        {Object.entries(badgeVariantStyleMap).map(([prop]) => {
          const value = prop as BadgeVariant;
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
                <Badge {...args} variant={value}>
                  {value}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};

export const ColorProp: Story = {
  render: (args) => {
    return (
      <div>
        {Object.entries(badgeColorStyleMap).map(([prop]) => {
          const value = prop as BadgeColor;
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
                <Badge {...args} color={value}>
                  {value}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};

export const VariantAndColorCombinations: Story = {
  render: (args) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {Object.entries(badgeVariantStyleMap).map(([variantProp]) => {
          const variantValue = variantProp as BadgeVariant;
          return (
            <div key={variantProp}>
              <h3>{variantValue}</h3>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {Object.entries(badgeColorStyleMap).map(([colorProp]) => {
                  const colorValue = colorProp as BadgeColor;
                  return (
                    <Badge
                      key={`${variantValue}-${colorValue}`}
                      {...args}
                      variant={variantValue}
                      color={colorValue}
                    >
                      {`${variantValue}-${colorValue}`}
                    </Badge>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};

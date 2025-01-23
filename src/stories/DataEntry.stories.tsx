import type { Meta, StoryObj } from "@storybook/react";
import DataEntry from "../components/DataEntry";
import MapContainer from "../components/MapContiainer";
import { waitFor, userEvent } from "@storybook/testing-library";
import { sendkeys } from "../test-utils/interactions";

import { expect } from "@storybook/jest";

import {
  CalciteShell,
  CalciteShellPanel,
  CalcitePanel,
} from "@esri/calcite-components-react";
import { useState } from "react";

const meta = {
  title: "Data Entry",
  component: DataEntry,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    location: {
      latitude: 0,
      longitude: 0,
    },
  },
  decorators: [
    (Story, { args }) => {
      const [mapPoint, setMapPoint] = useState({
        latitude: args.location!.latitude,
        longitude: args.location!.longitude,
      });
      return (
        <CalciteShell contentBehind>
          <CalciteShellPanel slot="panel-start" position="start">
            <CalcitePanel heading="Data Entry">
              <Story
                args={{
                  ...args,
                  location: {
                    latitude: mapPoint.latitude,
                    longitude: mapPoint.longitude,
                  },
                }}
              />
            </CalcitePanel>
          </CalciteShellPanel>
          <MapContainer
            onMapLoad={() => {
              console.log("Map loaded");
            }}
            onMapClick={(mapPoint) => setMapPoint(mapPoint)}
            loadedPoints={[]}
          />
        </CalciteShell>
      );
    },
  ],
  play: async () => {
    await waitFor(() =>
      expect(document.querySelector("#textInput")).not.toBeNull()
    );

    const observation = "This is a test observation";

    await sendkeys(
      document.querySelector("#textInput") as HTMLInputElement,
      observation,
      100
    );

    await expect(document.querySelector("#textInput")).toHaveValue(observation);

    await userEvent.click(
      document.querySelector("#submitText") as HTMLButtonElement
    );
  },
} satisfies Meta<typeof DataEntry>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    location: {
      latitude: 300,
      longitude: -49,
    },
    onSubmit: (observation) => console.log(observation),
  },
};

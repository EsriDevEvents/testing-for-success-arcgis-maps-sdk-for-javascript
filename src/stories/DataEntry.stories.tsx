import React, { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DataEntry, { DataEntryProps } from "../components/DataEntry";
import MapContainer from "../components/MapContainer";
import { waitFor, userEvent } from "@storybook/testing-library";
import { sendkeys } from "../test-utils/interactions";

import { Location, Observation } from "../types";

import { expect } from "@storybook/jest";

import "@esri/calcite-components/components/calcite-shell";
import "@esri/calcite-components/components/calcite-shell-panel";
import "@esri/calcite-components/components/calcite-panel";

const meta = {
  title: "Data Entry",
  component: DataEntry,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    location: {
      latitude: 0,
      longitude: 0,
    },
  },
  decorators: [
    (Story, { args }) => {
      const [currentPoint, setCurrentPoint] = useState<Location | null>(
        args.location
      );
      const [observations, setObservations] = useState<Observation[]>([]);

      const onSaveObservation = (observation: string) => {
        if (currentPoint !== null) {
          setObservations([...observations, { ...currentPoint, observation }]);
          setCurrentPoint(null);
        }
      };

      useEffect(() => {
        setCurrentPoint(args.location);
      }, [args.location]);

      console.log({ observations });

      return (
        <calcite-shell contentBehind={true}>
          <calcite-shell-panel slot="panel-start" position="start">
            <calcite-panel heading="Data Entry">
              {React.cloneElement(Story(), {
                location: currentPoint,
                onSubmit: args.onSubmit ?? onSaveObservation,
              })}
            </calcite-panel>
          </calcite-shell-panel>
          <MapContainer
            location={currentPoint}
            setLocation={setCurrentPoint}
            observations={observations}
          />
        </calcite-shell>
      );
    },
  ],
  play: async () => {
    await waitFor(() =>
      expect(document.querySelector("#textInput")).not.toBeNull()
    );

    const observation = "This tests observation";

    (document.querySelector("#textInput") as HTMLInputElement).focus();

    await sendkeys(
      document.querySelector("#textInput") as HTMLInputElement,
      observation,
      100
    );

    await expect(document.querySelector("#textInput")).toHaveValue(observation);

    await userEvent.click(
      document.querySelector("#submit-button") as HTMLButtonElement,
      {
        delay: 500,
      }
    );
  },
} satisfies Meta<typeof DataEntry>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Test: Story = {
  args: {
    location: {
      latitude: 34.0250437858476,
      longitude: -118.80448501586915,
    },
  } as DataEntryProps,
};

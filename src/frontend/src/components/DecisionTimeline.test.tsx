import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { DecisionEvent } from "../types/decision-event";
import { DecisionTimeline } from "./DecisionTimeline";

const sampleEvent: DecisionEvent = {
  event: "PromptReceived",
  timestamp: "2026-01-01T00:00:00Z",
  sessionId: "sess-1",
  requestId: "req-1",
  sequence: 1,
};

describe("DecisionTimeline", () => {
  it("shows empty-state guidance when there are no events", () => {
    render(<DecisionTimeline events={[]} />);
    expect(screen.getByTestId("decision-timeline")).toBeInTheDocument();
    expect(screen.getByText(/Events appear here after you send a prompt/)).toBeInTheDocument();
  });

  it("renders event names and sequence numbers", () => {
    render(
      <DecisionTimeline
        events={[
          sampleEvent,
          {
            ...sampleEvent,
            event: "ToolSelected",
            sequence: 2,
            tool: "calculate",
          },
        ]}
      />,
    );

    expect(screen.getByText("PromptReceived")).toBeInTheDocument();
    expect(screen.getByText("ToolSelected")).toBeInTheDocument();
    expect(screen.getByText("#1")).toBeInTheDocument();
    expect(screen.getByText(/tool:/)).toBeInTheDocument();
    expect(screen.getByText("calculate")).toBeInTheDocument();
    expect(screen.getByText("2 events")).toBeInTheDocument();
  });
});

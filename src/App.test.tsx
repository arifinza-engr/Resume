import {render} from "@testing-library/react";
import {describe, it, expect, vi} from "vitest";

// Mock heavy externals that don't work in jsdom (canvas/animation, external script)
vi.mock("lottie-react", () => ({default: () => null}));
vi.mock("react-twitter-embed", () => ({TwitterTimelineEmbed: () => null}));

import App from "./App";

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(document.body).not.toBeEmptyDOMElement();
  });
});

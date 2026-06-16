import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import App from "./App";

vi.mock("socket.io-client", () => ({
  default: {
    connect: () => ({
      emit: vi.fn(),
      on: vi.fn(),
    }),
  },
}));

test("renders Gossip Hub home page", () => {
  render(<App />);
  expect(screen.getByText("Gossip Hub")).toBeInTheDocument();
});

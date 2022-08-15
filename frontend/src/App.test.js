import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import App from "./App";

test("Renders app", async () => {
  await render(<App />);
  const header = screen.getByTestId("header");

  await waitFor(() => {
    expect(header).toHaveTextContent("Add new investor");
  });
});

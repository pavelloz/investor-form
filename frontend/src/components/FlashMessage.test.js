import { render, screen } from "@testing-library/react";
import React from "react";
import FlashMessage from "./FlashMessage";

describe("Flash message", () => {
  test("Shows up with success type (not verifying type)", async () => {
    render(
      <FlashMessage
        flash={{
          type: "success",
          title: "Success title",
          message: "Success msg",
        }}
      />
    );
    const flash = screen.getByRole("alert");
    expect(flash).toHaveTextContent("Success title");
    expect(flash).toHaveTextContent("Success msg");
  });

  test("Shows up with error type (not verifying type)", async () => {
    render(
      <FlashMessage
        flash={{
          type: "error",
          title: "Error title",
          message: "Error msg",
        }}
      />
    );
    const flash = screen.getByRole("alert");
    expect(flash).toHaveTextContent("Error title");
    expect(flash).toHaveTextContent("Error msg");
  });
});

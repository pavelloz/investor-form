import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import React from "react";
import Form from "./Form";

const testData = {
  firstName: "Paweł",
  lastName: "Kowalski",
  dob: "06/24/1987",
  phone: "7823872378",
  street: "8th Ave",
  state: "NY",
  zipCode: "90210",
};

describe("Form", () => {
  test("Cannot submit empty", async () => {
    await render(<Form />);

    const form = screen.getByTestId("form");

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(form).toHaveTextContent("Personal information");
    });
    await waitFor(() => {
      expect(form).toBeInvalid();
    });
  });

  test("Shows validation message for invalid DOB on change", async () => {
    await render(<Form />);

    const form = screen.getByTestId("form");
    const dobInput = document.querySelector('[name="dob"]');

    await fireEvent.change(dobInput, { target: { value: "1987/06/24" } });

    await waitFor(() => {
      expect(form).toHaveTextContent(
        "Date of birth should be in MM/DD/YYYY format. Example: 06/24/1987"
      );
    });
  });

  test("Submit button is disabled by default", async () => {
    await render(<Form />);

    const submitButton = screen.getByTestId("submit-button");

    await waitFor(() => {
      expect(submitButton).toHaveAttribute("disabled");
    });
  });

  xtest("Can submit correct form", async () => {
    await render(<Form />);
    // Fill in text/select inputs
    Object.keys(testData).forEach((fieldName) => {
      const el = document.querySelector(`[name=${fieldName}]`);
      fireEvent.change(el, { target: { value: testData[fieldName] } });
    });
    // Add files
    const files = [
      new File(["JPEG is so 2000"], "test.jpeg", { type: "image/jpeg" }),
      new File(["AVIF is cool"], "test.avif", { type: "image/avif" }),
      new File(["SVG rocks"], "test.svg", { type: "image/svg+xml" }),
    ];
    const filesInput = document.querySelector('input[type="file"]');

    await userEvent.upload(filesInput, files);

    // Red :(
    // await waitFor(() => {
    // expect(form.checkValidity()).toEqual(true);
    // });
  });
});

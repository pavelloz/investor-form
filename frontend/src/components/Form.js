import React, { useMemo, useState, Suspense } from "react";

import { useForm } from "@mantine/form";
import { SimpleGrid, TextInput, Button, Text, Select } from "@mantine/core";

import api from "../lib/api";
import { StatesListOptions } from "../lib/states-list";
import Validate from "../lib/validations";

import FlashMessage from "./FlashMessage";

const FileUpload = React.lazy(() =>
  import("./FileUpload" /* webpackChunkName: "FileUpload" */)
);

const styles = {
  midHeading: {
    color: "#444",
    fontSize: 20,
    lineHeight: 1.4,
    marginTop: "2em",
  },
};

function Form() {
  const [files, setFiles] = useState([]);
  const [flash, setFlash] = useState(null);
  const StatesOptions = useMemo(() => StatesListOptions(), []); // dont fetch every render please

  const testData = false || {
    firstName: "Paweł",
    lastName: "Kowalski",
    dob: "06/24/1987",
    phone: "7823872378",
    street: "8th Ave",
    state: "NY",
    zipCode: "90210",
  };

  const form = useForm({
    initialValues: testData || {
      firstName: "",
      lastName: "",
      dob: "",
      phone: "",
      street: "",
      state: "",
      zipCode: "",
      files: [],
    },
    validate: {
      firstName: (val) =>
        val.length < 2 ? "First name must have at least 2 letters" : null,
      lastName: (val) =>
        val.length < 2 ? "Last name have at least 2 letters" : null,
      dob: (val) => Validate.dob(val),
      phone: (val) => Validate.phone(val),
      zipCode: (val) => Validate.zipCode(val),
      street: (val) =>
        val.length < 2 ? "Last name have at least 2 letters" : null,
    },
    validateInputOnChange: ["dob", "phone", "zipCode"],
  });

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target); // target = <form> element
    api.createInvestor({ data: formData, callback: setFlash });
  };

  return (
    <form
      onSubmit={(event) => form.onSubmit(onSubmit(event))}
      data-testid="form"
    >
      <Text sx={styles.midHeading}>Personal information</Text>
      <SimpleGrid cols={1} spacing="sm" mt="1em">
        <TextInput
          name="firstName"
          size="lg"
          label="First Name"
          placeholder="First Name"
          required={true}
          {...form.getInputProps("firstName")}
        />
        <TextInput
          name="lastName"
          size="lg"
          mt="md"
          label="Last Name"
          placeholder="Last Name"
          required={true}
          {...form.getInputProps("lastName")}
        />
        <TextInput
          name="dob"
          mt="md"
          size="lg"
          label={
            <>
              Date of birth <small>(Format: MM/DD/YYYY)</small>
            </>
          }
          placeholder="Date of birth"
          required={true}
          {...form.getInputProps("dob")}
        />
      </SimpleGrid>

      <Text sx={styles.midHeading}>Contact information</Text>
      <SimpleGrid cols={1} spacing="sm">
        <TextInput
          name="phone"
          size="lg"
          mt="md"
          label="Phone number"
          placeholder="Phone number"
          required={true}
          {...form.getInputProps("phone")}
        />
        <TextInput
          name="street"
          size="lg"
          mt="md"
          label="Street"
          placeholder="Street"
          required={true}
          {...form.getInputProps("street")}
        />
        <Select
          name="state"
          size="lg"
          label="State"
          placeholder="Pick one"
          data={StatesOptions}
          searchable
          required={true}
          nothingFound="No state found"
          filter={(v, item) =>
            item.label.toLowerCase().includes(v.toLowerCase().trim())
          }
        />
        <TextInput
          name="zipCode"
          size="lg"
          mt="md"
          label="Zip code"
          placeholder="Zip code"
          required={true}
          {...form.getInputProps("zipCode")}
        />
      </SimpleGrid>

      <Text sx={styles.midHeading}>
        Documents
        <span style={{ color: "red" }}> *</span>
      </Text>

      <SimpleGrid cols={1} spacing="sm">
        <Text mt={10} color="#555">
          Tax and brokerage documents
        </Text>

        <Suspense fallback={<div>Loading...</div>}>
          <FileUpload files={files} setFiles={setFiles} />
        </Suspense>
      </SimpleGrid>

      {flash && <FlashMessage flash={flash} />}

      <Button
        type="submit"
        size="xl"
        mt="2.25em"
        data-testid="submit-button"
        disabled={files.length === 0}
      >
        Submit
      </Button>
    </form>
  );
}

export default Form;

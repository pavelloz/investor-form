import { Alert, SimpleGrid } from "@mantine/core";
import React from "react";

function FlashMessage({ flash: { type, title, message } }) {
  if (!type || !title || !message) return null;
  return (
    <SimpleGrid cols={1} spacing="xs" mt="2.25em">
      {type === "success" && (
        <Alert color="green" variant="filled" title={title}>
          {message}
        </Alert>
      )}

      {type === "error" && (
        <Alert color="red" variant="outline" title={title}>
          {message}
        </Alert>
      )}
    </SimpleGrid>
  );
}

export default FlashMessage;

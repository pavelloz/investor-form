import React from "react";
import Form from "./components/Form";

import { AppShell, Header, Title, Container, Text } from "@mantine/core";

function App() {
  return (
    <AppShell
      padding="md"
      header={
        <Header height="120" p="lg">
          <img
            src="/logo_blue_transparent.png"
            width="130"
            alt="Parallel Markets logo"
          />
        </Header>
      }
    >
      <Container size="xs" px="md" py="md">
        <Title data-testid="header">Add new investor</Title>
        <Text color="#555" mt={10}>
          Please fill in all fields to proceed with accreditation.
        </Text>

        <Form />
      </Container>
    </AppShell>
  );
}

export default App;

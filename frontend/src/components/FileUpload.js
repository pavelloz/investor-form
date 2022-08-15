import React, { useState } from "react";
import { Text, List, ThemeIcon, Group } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconFiles } from "@tabler/icons";

import FlashMessage from "./FlashMessage";

function FileUpload({ files, setFiles }) {
  const [errors, setErrors] = useState([]);
  return (
    <>
      <Dropzone
        onDrop={setFiles}
        onChange={setFiles}
        onReject={(f) => setErrors(f)}
        maxSize={3 * 1024 ** 2}
        maxFiles={3}
        name="files"
        multiple
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: 150, pointerEvents: "none" }}
        >
          <div>
            <Text size="xl" inline align="center">
              Please drag files here, or click to choose
            </Text>
            <Text size="sm" color="dimmed" inline mt={20} align="center">
              Attach max 3 files, each file should not exceed 3 MB
            </Text>
          </div>

          {errors.length > 0 && (
            <>
              <Text
                mt="1.5em"
                sx={{ fontWeight: "bold" }}
                color="rgb(221, 74, 104)"
              >
                Some files were rejected by the system. <br />
                Please choose different files.
              </Text>

              <List
                spacing="xs"
                size="md"
                center
                icon={
                  <ThemeIcon color="rgb(221, 74, 104)" size={24} radius="xl">
                    <IconFiles size={16} />
                  </ThemeIcon>
                }
              >
                {errors.map((err, idx) => {
                  return (
                    <List.Item
                      sx={{ lineHeight: 1.4, color: "rgb(221, 74, 104)" }}
                      key={idx}
                    >
                      {err.file.path} <br /> {err.errors.map((e) => e.message)}
                    </List.Item>
                  );
                })}
              </List>
            </>
          )}
        </Group>
      </Dropzone>

      {files.length === 0 && (
        <FlashMessage
          flash={{
            type: "error",
            title: "Documents are required",
            message: "Please select at least one file",
          }}
        />
      )}

      {files.length > 0 && errors.length === 0 && (
        <>
          <Text mt="1.5em" color="#888">
            Selected files
          </Text>

          <List
            mt="1em"
            spacing="xs"
            size="md"
            center
            icon={
              <ThemeIcon color="#152b58" size={24} radius="xl">
                <IconFiles size={16} />
              </ThemeIcon>
            }
          >
            {files.map((file, idx) => {
              return <List.Item key={idx}>{file.path}</List.Item>;
            })}
          </List>
        </>
      )}
    </>
  );
}

export default FileUpload;

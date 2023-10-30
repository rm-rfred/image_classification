import React, { useState } from "react";

import { Button, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DropzoneArea } from "react-mui-dropzone";
import { FormProvider, useForm } from "react-hook-form";

import { apiFetch } from "../utils/Fetch";

const useStyles = makeStyles(() => ({
  dropzoneContainer: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: "200px",
    padding: "40px",
    backgroundColor: "#f8f8f8",
    outline: "none",
    transition: "border .24s ease-in-out",
    cursor: "pointer",
  },
}));

type FormData = {
  file: FileList | null;
};

interface Props {
  setPredictedClass: React.Dispatch<React.SetStateAction<string>>;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FileUpload: React.FC<Props> = ({
  setPredictedClass,
  setIsFetching,
}) => {
  const classes = useStyles();
  const methods = useForm<FormData>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;

  const onSubmit = () => {
    setIsFetching(true);
    setPredictedClass("");
    if (selectedFile) {
      const formDataToSend = new FormData();
      formDataToSend.append("file", selectedFile);

      apiFetch("/api/image_classification/classify", "POST", {}, formDataToSend)
        .then((response) => {
          setPredictedClass(response);
          setIsFetching(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsFetching(false);
        });
    } else {
      console.error("No file selected.");
      setIsFetching(false);
    }
  };

  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1}>
            <DropzoneArea
              acceptedFiles={["image/*"]}
              dropzoneText={
                "Drag and drop an image to perform image classification"
              }
              filesLimit={1}
              showAlerts={isDirty}
              previewGridClasses={{
                container: classes.dropzoneContainer,
              }}
              onChange={handleFileChange}
            />
            <Button type="submit" variant="outlined">
              COMPUTE IMAGE CLASSIFICATION
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </>
  );
};

export default FileUpload;

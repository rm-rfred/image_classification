import React, { useState } from "react";

import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DropzoneArea } from "react-mui-dropzone";
import { FormProvider, useForm } from "react-hook-form";

import { apiFetch } from "../utils/Fetch";

const useStyles = makeStyles(() => ({
  dropzoneContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "200px", // Set a minimum height to ensure a centered image preview
    border: "2px dashed #cccccc",
    borderRadius: "4px",
    padding: "20px",
    backgroundColor: "#f8f8f8",
    color: "#333",
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
}

export const FileUpload: React.FC<Props> = ({ setPredictedClass }) => {
  const classes = useStyles();
  const methods = useForm<FormData>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;

  const onSubmit = () => {
    if (selectedFile) {
      const formDataToSend = new FormData();
      formDataToSend.append("file", selectedFile);

      apiFetch("/api/image_classification/classify", "POST", {}, formDataToSend)
        .then((response) => setPredictedClass(response))
        .catch((error) => console.error("Error:", error));
    } else {
      console.error("No file selected.");
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
          <Button type="submit">Upload File</Button>
        </form>
      </FormProvider>
    </>
  );
};

export default FileUpload;

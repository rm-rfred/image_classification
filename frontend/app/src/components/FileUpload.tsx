import React, { useState } from "react";

import { Button, Grid, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DropzoneArea } from "react-mui-dropzone";
import { FormProvider, useForm } from "react-hook-form";

import { apiFetch } from "../utils/Fetch";

const useStyles = makeStyles(() => ({
  previewContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "60vh",
    width: "100vh",
  },
  preview: {
    right: "25%",
    maxWidth: "100vh",
    maxHeight: "60vh",
  },
  previewImg: {
    width: "50vh",
    height: "30vh",
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
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{ maxWidth: "80vh", maxHeight: "80vh" }}
            >
              <DropzoneArea
                acceptedFiles={["image/*"]}
                dropzoneText={"Drop image"}
                filesLimit={3}
                showAlerts={isDirty}
                previewGridClasses={{
                  container: classes.previewContainer,
                  item: classes.preview,
                  image: classes.previewImg,
                }}
                getPreviewIcon={(file) => {
                  return React.createElement("img", {
                    className: classes.previewImg,
                    role: "presentation",
                    src: file.data,
                  });
                }}
                onChange={handleFileChange}
              />
            </Grid>
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

"use client";

import { generateUploadButton } from "@uploadthing/react";
import { FileRouter } from "@/app/api/upload/route";

const UploadThingButton = generateUploadButton<FileRouter>({ url: "/api/upload" });

export const UploadButton = () => {
  return (
    <UploadThingButton
      endpoint="fileUploader"
      content={{
        button: "Upload File",
      }}
      onClientUploadComplete={(res) => {
        console.log("Files: ", res);
        alert("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
};

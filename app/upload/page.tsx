"use client";

import { UploadDropzone } from "./uploadthing";

export default function Upload() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <UploadDropzone
        endpoint="fileUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}

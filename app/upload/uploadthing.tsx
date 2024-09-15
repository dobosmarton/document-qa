import { generateUploadDropzone } from "@uploadthing/react";
import { FileRouter } from "../api/upload/route";

export const UploadDropzone = generateUploadDropzone<FileRouter>({ url: "/api/upload" });

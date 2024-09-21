import { createRouteHandler, createUploadthing, type FileRouter as UploadThingFileRouter } from "uploadthing/next";
import { getDocuments, getIndexFromStore } from "@/app/ai-engine";

const f = createUploadthing();

export const fileRouter: UploadThingFileRouter = {
  fileUploader: f({ pdf: { maxFileSize: "4MB" } }).onUploadComplete(async ({ file }) => {
    try {
      const documents = await getDocuments(file.url);

      const index = await getIndexFromStore();

      for (const document of documents) {
        await index.insert(document);
      }

      return {
        success: true,
        url: file.url,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Failed to process file",
      };
    }
  }),
};

export const { GET, POST } = createRouteHandler({
  router: fileRouter,
});

export type FileRouter = typeof fileRouter;

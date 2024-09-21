import type { Document, Metadata } from "llamaindex";
import { PDFReader } from "llamaindex/readers/PDFReader";

/**
 * Retrieves the documents from the specified file URL.
 *
 * @param fileUrl - The URL of the file to fetch.
 * @returns A promise that resolves to an array of documents with metadata.
 * @throws An error if the file fetch fails.
 */
export const getDocuments = async (fileUrl: string): Promise<Document<Metadata>[]> => {
  const reader = new PDFReader();
  const uploadedData = await fetch(fileUrl);

  if (!uploadedData.ok) {
    throw new Error("Failed to fetch file");
  }

  const content = await uploadedData.arrayBuffer();

  const documents = await reader.loadDataAsContent(new Uint8Array(content));

  return documents;
};

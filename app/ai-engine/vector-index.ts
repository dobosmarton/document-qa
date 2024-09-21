import { serviceContextFromDefaults, VectorStoreIndex } from "llamaindex";
import { QdrantVectorStore } from "llamaindex/vector-store/QdrantVectorStore";
import { CHUNK_OVERLAP, CHUNK_SIZE } from "./config";

/**
 * Retrieves the index from the vector store.
 * @returns A promise that resolves to a VectorStoreIndex object.
 */
export const getIndexFromStore = async (): Promise<VectorStoreIndex> => {
  const vectorStore = new QdrantVectorStore({
    apiKey: process.env.QDRANT_API_KEY,
    url: process.env.QDRANT_URL,
    collectionName: "document-collection",
  });

  const serviceContext = serviceContextFromDefaults({
    chunkSize: CHUNK_SIZE,
    chunkOverlap: CHUNK_OVERLAP,
  });

  const vectorStoreIndex = await VectorStoreIndex.fromVectorStore(vectorStore, serviceContext);

  return vectorStoreIndex;
};

import { listFiles } from "@/lib/file-upload/api-client";

export const FileList = async () => {
  const { files } = await listFiles();

  return (
    <div className="flex h-[50vh] flex-col gap-4">
      <p>Uploaded Files</p>
      <div className="flex flex-col gap-2">
        {files.map((file) => (
          <div key={file.key}>{file.name}</div>
        ))}
      </div>
    </div>
  );
};

import { FileList } from "./file-list";
import { BoxLayout } from "./ui/box-layout";
import { UploadButton } from "./ui/upload-button";

export const Files = () => {
  return (
    <BoxLayout>
      <FileList />
      <UploadButton />
    </BoxLayout>
  );
};

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { fileRouter } from "../api/upload/route";

export default function UploadLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
      {children}
    </>
  );
}

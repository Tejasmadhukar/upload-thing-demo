"use client";

import { UploadButton } from "~/utils/uploadthing";

export default function FileUploader() {
  return (
    <main className="flex flex-col items-center justify-between ">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}

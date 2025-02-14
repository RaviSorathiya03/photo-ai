"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import axios from "axios";
import { BACKEND_URL, CLOUDFLARE_URL } from "@/app/config";
import JSZip, { file } from "jszip";

export function FileUploadDemo({onUploadDone}:{
  onUploadDone: (url: string) => void,
}) {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = async(files: File[]) => {
    setFiles(files);
    const zip = new JSZip();
    const res = await axios.get(`${BACKEND_URL}/pre-signed-url`);
    const url = res.data.url;
    const key = res.data.key;
    if(files){
      for(const file of files){
        const content = await file.arrayBuffer();
        zip.file(file.name, content)
      }
      const content = await zip.generateAsync({type: "blob"});
      const formData = new FormData();
      formData.append("file", content);
      formData.append("key", url);
      const res = await axios.put(url, formData);
      onUploadDone(`${CLOUDFLARE_URL}/${key}`)
      console.log(res.data);
    }

  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
}

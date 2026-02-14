import { useRef, useState } from "react";

const FileUpload = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  
  const handleChange = () => {
    const file = fileRef.current?.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        onChange={handleChange}
      />
      {preview && <img src={preview} alt="preview" width={200} />}
    </>
  );
};
export default FileUpload;

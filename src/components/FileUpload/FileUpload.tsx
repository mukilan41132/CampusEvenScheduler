import { useRef, useState } from "react";
import placeHolderProfile from "../../assets/user-alt.svg";
const API_URL = import.meta.env.VITE_API_HOST;
import "../../styles/FileUpload/FileUpload.css";
interface FileUploadProps {
  name: string;
  value?: string;
  stateSetter: (name: string, value: any) => void;
}

const FileUpload = ({ name, value, stateSetter }: FileUploadProps) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleProfileChange = () => {
    fileRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const url = URL.createObjectURL(file);

      setPreview(url);

 
      stateSetter(name, file);
    }
  };
  const imageSrc =
    preview || (value ? `${API_URL}${value}` : placeHolderProfile);

  return (
    <div>
      <div onClick={handleProfileChange}>
        <img className="img_size" src={imageSrc} alt="preview" />
      </div>

      <input
        type="file"
        style={{ display: "none" }}
        accept="image/*"
        ref={fileRef}
        onChange={handleChange}
      />
    </div>
  );
};

export default FileUpload;

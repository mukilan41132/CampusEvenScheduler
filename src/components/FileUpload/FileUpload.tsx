import { useRef } from "react";

const FileUpload = () => {
  const fileref = useRef(null);

  return <input className="file-upload" type="file" ref={fileref} />;
};
export default FileUpload;

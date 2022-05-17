import s from "./FileUploader.module.scss";
import { getBase64 } from "../../utils/getBase64";

const FileUploader = () => {
  const handleChange = (e) => {
    const filesList = e.target.files;

    for (const file of filesList) {
      console.log(file);
      getBase64(file).then((fileAsBase64) => {
        console.log("fileAsbase64", fileAsBase64);
      });
    }
  };
  return (
    <div className={s.root}>
      <div className={s.uploader}>
        <h1 className={s.uploader__title}>Upload file</h1>
        <label className={s.uploader__dropZone}>
          <span className={s.uploader__dropZone_ico}>🚀</span>
          <input
            type="file"
            className={s.uploader__inputFile}
            onChange={handleChange}
            multiple
          />
        </label>
        <div className={s.uploader__previewFilesContainer}>
          <ul className={s.uploader__previewFilesContainer_previewList}>
            <li>Text</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;

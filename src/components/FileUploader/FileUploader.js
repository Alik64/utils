import { useState } from "react";
import { getBase64 } from "../../utils/getBase64";
import PropTypes from "prop-types";
import cn from "classnames";
import s from "./FileUploader.module.scss";

const FileUploader = ({ multiple }) => {
  const [files, setFiles] = useState([]);
  console.log("files", files);
  const handleChange = (e) => {
    const filesList = e.target.files;

    for (const file of filesList) {
      console.log(file);
      getBase64(file).then((fileAsBase64) => {
        setFiles((prevState) => {
          return [...prevState, fileAsBase64];
        });
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
            multiple={multiple}
          />
        </label>
        <div className={s.previewFilesContainer}>
          <ul className={s.previewList}>
            {files.map((item, index) => (
              <li key={index} className={cn(s.previewListItem)}>
                <img className={s.previewIco} src={item} alt={item.name} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

FileUploader.defaultProps = {
  multiple: false,
};
FileUploader.propTypes = {
  multiple: PropTypes.bool,
};

export default FileUploader;

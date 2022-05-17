import { useState } from "react";
import { getBase64 } from "../../utils/getBase64";
import PropTypes from "prop-types";
import cn from "classnames";
import spinner from "../../assets/images/spinner.gif";
import s from "./FileUploader.module.scss";

const FileUploader = ({ multiple }) => {
  const [files, setFiles] = useState({});
  const updateFileList = (filePayload) => {
    setFiles((prevState) => {
      return {
        ...prevState,
        [filePayload.name]: filePayload,
      };
    });
  };
  console.log("files", files);

  const handleChange = (e) => {
    const filesList = e.target.files;

    for (const file of filesList) {
      updateFileList({
        file,
        name: file.name,
        type: file.type,
        imgUrl: null,
        status: "OK",
        isLoading: true,
      });

      getBase64(file)
        .then((fileAsBase64) => {
          setTimeout(() => {
            updateFileList({
              file,
              name: file.name,
              type: file.type,
              imgUrl: fileAsBase64,
              status: "OK",
              isLoading: false,
            });
          }, 3000);
        })
        .catch((error) => {
          updateFileList({
            file,
            name: file.name,
            type: file.type,
            imgUrl: null,
            status: "ERROR",
            isLoading: false,
          });
        });
    }
  };
  return (
    <div className={s.root}>
      <div className={s.uploader}>
        <h1 className={s.uploader__title}>Upload file</h1>
        <label className={s.uploader__dropZone}>
          <span className={s.uploader__dropZone_ico}>💾</span>
          <input
            type="file"
            className={s.uploader__inputFile}
            onChange={handleChange}
            multiple={multiple}
          />
        </label>
        <div className={s.previewFilesContainer}>
          <ul className={s.previewList}>
            {Object.entries(files).map(([key, value], index) => (
              <li key={key} className={cn(s.previewList__item)}>
                {value.imgUrl !== null && (
                  <img
                    className={s.previewList__ico}
                    src={value.imgUrl}
                    alt={key}
                  />
                )}
                {value.isLoading && (
                  <div>
                    <img src={spinner} alt="spinner" />
                  </div>
                )}
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

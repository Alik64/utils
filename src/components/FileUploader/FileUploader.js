import { useState } from "react";
import { getBase64 } from "../../utils/getBase64";
import { formatSize } from "../../utils/formatSize";
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
          console.log(error);
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

  const handleDeleteButtonClick = (name) => {
    setFiles((prevState) => {
      const copyState = { ...prevState };
      delete copyState[name];
      return copyState;
    });
  };
  return (
    <div className={s.root}>
      <div className={s.uploader}>
        <h1 className={s.uploader__title}>Upload file</h1>
        <label className={s.uploader__dropZone}>
          <span className={s.uploader__dropZone_ico}>💾</span>
          <input
            accept="image/*"
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
                    className={s.previewList__item_ico}
                    src={value.imgUrl}
                    alt={key}
                  />
                )}
                {value.isLoading && (
                  <div className={s.spinner}>
                    <img src={spinner} alt="spinner" />
                  </div>
                )}
                {value.status === "ERROR" && (
                  <div className={s.previewList__item_ico}>
                    <span className={s.uploader__dropZone_ico}>⛔️</span>
                  </div>
                )}
                <div className={s.previewList__item_description}>
                  <p>{value.name}</p>
                  <p>{formatSize(value.file.size)}</p>
                </div>
                <button
                  className={s.previewList__deleteButton}
                  onClick={() => handleDeleteButtonClick(value.name)}
                >
                  ❌
                </button>
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

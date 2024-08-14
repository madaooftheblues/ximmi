const FileGrid = ({ files, setFile }) => {
  return (
    <div className="file-grid">
      {files &&
        files.map((file) => {
          return (
            <div
              key={file.id}
              onClick={() => setFile(file)}
              className="file-icon"
            >
              <img src="/excel.png" alt="excel icon" className="icon" />
              <p>{file.name}</p>
            </div>
          );
        })}
    </div>
  );
};

export default FileGrid;

import Paper from "@mui/material/Paper";

const FileGrid = ({ files, currentFile, setFile }) => {
  return (
    <Paper className="file-grid">
      {files &&
        files.map((file) => {
          return (
            <Paper
              key={file.id}
              onClick={() => setFile(file)}
              className={`file-container ${
                currentFile?.id === file.id ? "selected" : ""
              }`}
            >
              <img src="/excel.png" alt="excel icon" className="icon" />
              <p>{file.name}</p>
            </Paper>
          );
        })}
    </Paper>
  );
};

export default FileGrid;

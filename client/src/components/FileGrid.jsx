import Paper from "@mui/material/Paper";

const FileGrid = ({ files, setFile }) => {
  return (
    <Paper className="file-grid">
      {files &&
        files.map((file) => {
          return (
            <Paper
              key={file.id}
              onClick={() => setFile(file)}
              className="file-container"
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

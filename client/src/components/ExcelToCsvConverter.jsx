import axios from "axios";
import { API_BASE } from "../constants";
import { useState } from "react";
import { Button, CircularProgress, Paper } from "@mui/material";

const ExcelToCsvConverter = ({ file }) => {
  const [loading, setLoading] = useState(false);

  const downloadCSV = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE}/convert-excel-to-csv/${file.id}/`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${file.name.split(".")[0]}.csv`);
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading CSV file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper>
      <Button onClick={() => downloadCSV()} disabled={loading}>
        {loading && <CircularProgress />}
        Download CSV
      </Button>
    </Paper>
  );
};

export default ExcelToCsvConverter;

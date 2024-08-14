import { useEffect, useState } from "react";
import CheckList from "./CheckList";
import XlsxImporter from "./XlsxImporter";
import XTable from "./XTable";
import axios from "axios";
import FileGrid from "./FileGrid";

function colsToRows(matrix) {
  const rows = [];
  for (let i = 0; i < matrix[0].length; i++) {
    const row = [];
    for (let j = 0; j < matrix.length; j++) {
      row.push(matrix[j][i]);
    }
    rows.push(row);
  }
  return rows;
}

const Playground = () => {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState();
  const [columns, setColumns] = useState([]);
  const [tabRows, setTabRows] = useState([]);
  const [tabColumns, setTabColumns] = useState([]);

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/files");
      console.log(response.data);
      setFiles([...response.data]);
      console.log(files);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const fetchColumns = async (id) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/columns/" + id);
      console.log(response.data);
      setColumns([...response.data.columns]);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    {
      file?.id && fetchColumns(file.id);
    }
  }, [file]);

  const handleColumnsSubmit = async (list) => {
    const columns = list
      .filter((item) => item.checked)
      .map((item) => item.label);
    const res = await axios.post("http://127.0.0.1:8000/data/", {
      id: file.id,
      columns,
    });
    console.log(res);
    const columnHeaders = Object.keys(res.data.records[0]);
    console.log(res.data.records);
    setTabColumns([...columnHeaders]);
    setTabRows(res.data.records);
  };

  return (
    <>
      <FileGrid files={files} setFile={setFile} />
      <XlsxImporter updateColumns={setFiles} />
      <CheckList array={columns} handleColumnsSubmit={handleColumnsSubmit} />
      <XTable columns={tabColumns} rows={tabRows} />
    </>
  );
};

export default Playground;

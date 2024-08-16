import { useEffect, useState } from "react";
import CheckList from "./CheckList";
import XlsxImporter from "./XlsxImporter";
import XTable from "./XTable";
import axios from "axios";
import FileGrid from "./FileGrid";

const Playground = () => {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState();
  const [columns, setColumns] = useState([]);
  const [tabRows, setTabRows] = useState([]);
  const [tabColumns, setTabColumns] = useState([]);
  const [columnLoading, setColumnLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

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
      setColumnLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/columns/" + id);
      console.log(response.data);
      setColumns([...response.data.columns]);
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setColumnLoading(false);
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
    try {
      setDataLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/data/", {
        id: file.id,
        columns,
      });
      console.log(res);
      const columnHeaders = Object.keys(res.data.records[0]);
      console.log(res.data.records);
      setTabColumns([...columnHeaders]);
      setTabRows(res.data.records);
    } catch (e) {
      console.log(e);
    } finally {
      setDataLoading(false);
    }
  };

  return (
    <>
      <FileGrid files={files} setFile={setFile} />
      <XlsxImporter updateColumns={setFiles} updateFiles={fetchFiles} />
      <CheckList
        array={columns}
        handleColumnsSubmit={handleColumnsSubmit}
        isLoading={columnLoading}
      />
      <XTable columns={tabColumns} rows={tabRows} isLoading={dataLoading} />
    </>
  );
};

export default Playground;

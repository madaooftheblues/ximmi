import { useEffect, useState } from "react";
import CheckList from "./CheckList";
import XlsxImporter from "./XlsxImporter";
import XTable from "./XTable";
import axios from "axios";
import FileGrid from "./FileGrid";
import ExcelToCsvConverter from "./ExcelToCsvConverter";

const Playground = () => {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState();
  const [columns, setColumns] = useState([]);
  const [selected, setSelected] = useState([]);

  const [tabRows, setTabRows] = useState([]);
  const [tabColumns, setTabColumns] = useState([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [columnLoading, setColumnLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const fetchFiles = async () => {
    try {
      const response = await axios.get("https://ximmi.onrender.com/files");
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
      const response = await axios.get(
        "https://ximmi.onrender.com/columns/" + id
      );
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

  useEffect(() => {
    handleColumnsSubmit(selected);
  }, [page, rowsPerPage]);

  const handleColumnsSubmit = async (list) => {
    try {
      setDataLoading(true);
      const res = await axios.post("https://ximmi.onrender.com/data/", {
        id: file.id,
        columns: list,
        page: page + 1,
        rowsPerPage,
      });
      console.log(res);
      const columnHeaders = Object.keys(res.data.records[0]);
      console.log(res.data.records);
      setTabColumns([...columnHeaders]);
      setTabRows(res.data.records);
      setTotalCount(res.data.totalRecords);
    } catch (e) {
      console.log(e);
    } finally {
      setDataLoading(false);
    }
  };

  const onPageChange = (e, newPage) => {
    setPage(newPage);
  };

  const onRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <FileGrid files={files} currentFile={file} setFile={setFile} />
      {file?.id && <ExcelToCsvConverter fileId={file.id} />}
      <XlsxImporter updateColumns={setFiles} updateFiles={fetchFiles} />
      <CheckList
        array={columns}
        handleColumnsSubmit={handleColumnsSubmit}
        isLoading={columnLoading}
        updateSelected={setSelected}
      />
      <XTable
        columns={tabColumns}
        rows={tabRows}
        isLoading={dataLoading}
        count={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPage}
      />
    </>
  );
};

export default Playground;

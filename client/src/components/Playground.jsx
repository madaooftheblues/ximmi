import { useState } from "react";
import CheckList from "./CheckList";
import XlsxImporter from "./XlsxImporter";
import XTable from "./XTable";
import axios from "axios";

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
  const [heads, setHeads] = useState([]);
  const [tabRows, setTabRows] = useState([]);
  const [tabHeads, setTabHeads] = useState([]);

  const handleHeadsSubmit = async (list) => {
    const selected = list
      .filter((item) => item.checked)
      .map((item) => item.label);
    const res = await axios.post("http://localhost:3001/cols", {
      selected,
    });
    console.log(res);
    setTabHeads([...res.data.heads]);
    setTabRows([...colsToRows(res.data.cols)]);
  };

  return (
    <>
      <XlsxImporter updateHeads={setHeads} />
      <CheckList array={heads} handleHeadsSubmit={handleHeadsSubmit} />
      <XTable heads={tabHeads} rows={tabRows} />
    </>
  );
};

export default Playground;

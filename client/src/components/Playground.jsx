import { useState } from "react";
import CheckList from "./CheckList";
import XlsxImporter from "./XlsxImporter";

const Playground = () => {
  const [heads, setHeads] = useState([]);

  return (
    <>
      <XlsxImporter updateHeads={setHeads} />
      <CheckList array={heads} />
    </>
  );
};

export default Playground;

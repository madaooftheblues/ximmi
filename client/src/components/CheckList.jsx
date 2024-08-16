import { useEffect, useState } from "react";
import CheckBox from "./CheckBox";
import { Paper, Button, CircularProgress } from "@mui/material";

const CheckList = ({
  array,
  handleColumnsSubmit,
  isLoading,
  updateSelected,
}) => {
  const genList = (arr) =>
    arr.map((item, index) => {
      return { label: item, id: `${index}`, key: index, checked: false };
    });

  const [list, setList] = useState(genList(array));

  useEffect(() => setList(genList(array)), [array]);

  const handleChange = (e) => {
    const id = e.target.id;
    const target = list.find((item) => {
      return item.id === id;
    });
    target.checked = !target.checked;

    setList([...list]);
  };

  return isLoading ? (
    <Paper className="center">
      <CircularProgress />
    </Paper>
  ) : (
    <Paper className="checklist">
      {list.map((item) => (
        <CheckBox
          label={item.label}
          key={item.id}
          id={item.id}
          checked={item.checked}
          onChange={handleChange}
        />
      ))}
      {array.length ? (
        <Button
          variant="contained"
          onClick={() => {
            const l = list
              .filter((item) => item.checked)
              .map((item) => item.label);
            updateSelected(l);
            handleColumnsSubmit(l);
          }}
        >
          Fetch!
        </Button>
      ) : null}
    </Paper>
  );
};

export default CheckList;

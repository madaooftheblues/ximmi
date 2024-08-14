import { useEffect, useState } from "react";
import CheckBox from "./CheckBox";

const CheckList = ({ array, handleColumnsSubmit }) => {
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

  return (
    <div className="checklist">
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
        <button onClick={() => handleColumnsSubmit(list)}>Fetch!</button>
      ) : null}
    </div>
  );
};

export default CheckList;

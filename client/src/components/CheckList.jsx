import { useEffect, useState } from "react";
import CheckBox from "./CheckBox";

const CheckList = ({ array }) => {
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
    <div>
      {list.map((item) => (
        <CheckBox
          label={item.label}
          key={item.id}
          id={item.id}
          checked={item.checked}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};

export default CheckList;

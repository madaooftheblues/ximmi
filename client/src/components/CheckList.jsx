import CheckBox from "./CheckBox";

const CheckList = ({ array }) => {
  return (
    <div>
      {array.map((item, idx) => (
        <CheckBox label={item} key={idx} id={idx} />
      ))}
    </div>
  );
};

export default CheckList;

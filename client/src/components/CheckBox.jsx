const CheckBox = ({ label, id }) => {
  return (
    <div>
      <input type="checkbox" name={label} id={id} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default CheckBox;

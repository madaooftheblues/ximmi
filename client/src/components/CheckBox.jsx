const CheckBox = ({ label, id, checked, onChange }) => {
  return (
    <div>
      <input
        type="checkbox"
        name={label}
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default CheckBox;

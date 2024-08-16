import { Checkbox, FormControlLabel } from "@mui/material";

const CheckBox = ({ label, id, checked, onChange }) => {
  return (
    <FormControlLabel
      label={label}
      control={
        <Checkbox
          type="checkbox"
          name={label}
          id={id}
          checked={checked}
          onChange={onChange}
        />
      }
    />
  );
};

export default CheckBox;

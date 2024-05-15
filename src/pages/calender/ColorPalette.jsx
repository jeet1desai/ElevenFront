import { FormControlLabel, Radio } from '@mui/material';

const ColorPalette = ({ color, label, value }) => (
  <FormControlLabel
    value={value}
    control={<Radio sx={{ color, '&.Mui-checked': { color } }} />}
    label={label || ''}
    sx={{ pr: label ? 1 : 0 }}
  />
);

export default ColorPalette;

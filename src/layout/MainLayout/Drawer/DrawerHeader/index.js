import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import { Stack, Select, MenuItem, IconButton } from '@mui/material';

import { PlusOutlined } from '@ant-design/icons';

import DrawerHeaderStyled from './DrawerHeaderStyled';
import config from 'config';

const status = [
  {
    value: 'today',
    label: 'Today'
  },
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'year',
    label: 'This Year'
  }
];

const DrawerHeader = ({ open }) => {
  const theme = useTheme();

  const iconBackColorOpen = 'grey.100';

  return (
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%' }}>
        <Select value="today" sx={{ '& .MuiInputBase-input': { py: 1, fontSize: '0.875rem' }, width: '100%' }}>
          {status.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <IconButton
          disableRipple
          color="secondary"
          sx={{
            color: 'text.primary',
            // bgcolor: iconBackColorOpen,
            border: '1px solid',
            borderRadius: config.borderRadius,
            borderColor: theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey.A800,
            '&:hover': { bgcolor: iconBackColorOpen }
          }}
        >
          <PlusOutlined />
        </IconButton>
      </Stack>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool
};

export default DrawerHeader;

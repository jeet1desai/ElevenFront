import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Stack, Select, MenuItem, IconButton } from '@mui/material';

import { PlusOutlined } from '@ant-design/icons';

import DrawerHeaderStyled from './DrawerHeaderStyled';
import config from 'config';

import { useSelector } from 'store/index';
import { useDispatch } from 'store/index';

import { setProjectIdSuccess } from 'store/slices/project';

const DrawerHeader = ({ open }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projects, projectId } = useSelector((state) => state.project);

  const iconBackColorOpen = 'grey.100';

  return (
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%' }}>
        <Select
          displayEmpty
          value={projectId}
          onChange={(e) => {
            const id = e.target.value;
            if (id === 'all') {
              navigate(`/projects`);
            } else {
              dispatch(setProjectIdSuccess({ id: id }));
              navigate(`/projects/${id}/home`);
            }
          }}
          sx={{ '& .MuiInputBase-input': { py: 1, fontSize: '0.875rem' }, width: '100%' }}
        >
          <MenuItem disabled value="">
            Select Project
          </MenuItem>
          {projects.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
          <MenuItem value="all">View All Projects</MenuItem>
        </Select>
        <IconButton
          disableRipple
          color="secondary"
          sx={{
            color: 'text.primary',
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

import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Select, MenuItem, InputAdornment } from '@mui/material';

import { IconChevronDown } from '@tabler/icons-react';

import DrawerHeaderStyled from './DrawerHeaderStyled';

import { useSelector, useDispatch } from 'store/index';

import { setProjectIdSuccess } from 'store/slices/project';

const DrawerHeader = ({ open }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projects, projectId } = useSelector((state) => state.project);

  return (
    <DrawerHeaderStyled theme={theme} open={open}>
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
        IconComponent={() => (
          <InputAdornment>
            <IconChevronDown size={18} stroke={2} />
          </InputAdornment>
        )}
        sx={{
          '& .MuiInputBase-input': { py: '10px', fontSize: '0.875rem' },
          width: '100%',
          '& svg': { position: 'absolute', right: '8px' }
        }}
      >
        <MenuItem disabled value="">
          Select Project
        </MenuItem>
        {projects.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
        <MenuItem
          value="all"
          sx={{
            padding: '10px 16px',
            bgcolor: '#1677ff',
            color: '#fff',
            '&:hover': {
              bgcolor: '#1677ff',
              color: '#fff'
            }
          }}
        >
          View All Projects
        </MenuItem>
      </Select>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool
};

export default DrawerHeader;

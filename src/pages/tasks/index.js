import React, { useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Select,
  Tab,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography
} from '@mui/material';

import {
  IconSearch
  // IconEye,
  // IconTrash
} from '@tabler/icons-react';

import MainCard from 'components/MainCard';
import TaskForm from './TaskForm';

import { useSelector, useDispatch } from 'store/index';
import { getTeamMemberService } from 'services/utils';

const TableHeaderBox = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '10px',
  justifyContent: 'space-between',
  padding: '2px 0'
});

const Tasks = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);
  const [isTaskFormOpen, setTaskForm] = useState(false);

  const { projectId } = useSelector((state) => state.project);
  const { teamMember } = useSelector((state) => state.utils);
  const { tasks } = useSelector((state) => state.task);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (projectId) {
      dispatch(getTeamMemberService(projectId));
    }
  }, [dispatch, projectId]);

  console.log(tasks);

  return (
    <>
      <MainCard>
        <Tabs value={value} variant="scrollable" onChange={handleChange} sx={{ px: 1, width: '100%', borderBottom: '1px solid #e6ebf1' }}>
          <Tab sx={{ textTransform: 'none' }} label="Overview" />
          <Tab sx={{ textTransform: 'none' }} label="Team's All Tasks" />
          <Tab sx={{ textTransform: 'none' }} label="My Tasks" />
        </Tabs>
        {(value === 1 || value === 2) && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2, mx: 1 }}>
              <Typography variant="h4">
                All <span style={{ color: '#d9d9d9' }}>(1)</span>
              </Typography>
              <TableHeaderBox>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconSearch stroke={2} size={16} />
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search by title"
                  size="small"
                  sx={{ '& input': { paddingLeft: '2px' } }}
                  onChange={() => {}}
                />
                <Select
                  value=""
                  displayEmpty
                  onChange={() => {}}
                  sx={{ width: '150px', '& .MuiInputBase-input': { py: 1, fontSize: '0.875rem' } }}
                >
                  <MenuItem disabled value="">
                    Select Status
                  </MenuItem>
                  <MenuItem>Open</MenuItem>
                  <MenuItem>In Review</MenuItem>
                  <MenuItem>Pending</MenuItem>
                  <MenuItem>Closed</MenuItem>
                </Select>
                {value === 1 && (
                  <Button onClick={() => setTaskForm(true)} variant="contained" color="success">
                    Add Task
                  </Button>
                )}
              </TableHeaderBox>
            </Box>
            <MainCard content={false}>
              <TableContainer
                sx={{
                  width: '100%',
                  overflowX: 'auto',
                  position: 'relative',
                  display: 'block',
                  maxWidth: '100%',
                  '& td, & th': { whiteSpace: 'nowrap' },
                  '& th': { textTransform: 'uppercase' }
                }}
              >
                <Table
                  sx={{
                    '& .MuiTableCell-root:first-of-type': { pl: 2 },
                    '& .MuiTableCell-root:last-of-type': { pr: 3 }
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">ID</TableCell>
                      <TableCell align="left">Title</TableCell>
                      <TableCell align="left">Status</TableCell>
                      <TableCell align="left">Due Date</TableCell>
                      <TableCell align="left">Assign to</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            </MainCard>
          </>
        )}
      </MainCard>

      {isTaskFormOpen && <TaskForm open={isTaskFormOpen} onClose={setTaskForm} teamMember={teamMember} />}
    </>
  );
};

export default Tasks;

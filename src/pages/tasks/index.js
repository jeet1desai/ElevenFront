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
  TableBody,
  Tabs,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  Chip,
  IconButton
} from '@mui/material';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { IconSearch, IconEye, IconTrash, IconEdit, IconMessage, IconSunglasses, IconRefresh } from '@tabler/icons-react';

import MainCard from 'components/MainCard';
import Dot from 'components/@extended/Dot';
import TaskForm from './TaskForm';
import DeleteTask from './DeleteTask';

import { useSelector, useDispatch } from 'store/index';
import { getTeamMemberService } from 'services/utils';
import { assignedTaskService, getProjectTaskService } from 'services/task';

import { TASK_STATUS } from 'utils/enum';
import { isDatePastDueDateColor } from 'utils/utilsFn';

const TableHeaderBox = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '10px',
  justifyContent: 'space-between',
  padding: '2px 0'
});

const TaskStatus = ({ status }) => {
  let color;
  let title = TASK_STATUS[status];

  switch (status) {
    case 2:
      color = 'warning';
      break;
    case 3:
      color = 'success';
      break;
    case 1:
      color = 'error';
      break;
    default:
      color = 'primary';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

const Tasks = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);
  const [isTaskFormOpen, setTaskForm] = useState(false);
  const [isEditTaskOpen, setEditTask] = useState(false);
  const [isDeleteTaskOpen, setDeleteTask] = useState(false);

  const [taskDetail, setTaskDetail] = useState(null);

  const { projectId } = useSelector((state) => state.project);
  const { loading, tasks } = useSelector((state) => state.task);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (projectId) {
      dispatch(getTeamMemberService(projectId));
    }
  }, [dispatch, projectId]);

  useEffect(() => {
    if (projectId) {
      handleFetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, projectId, value]);

  const handleFetchData = () => {
    if (value === 1) {
      dispatch(getProjectTaskService(projectId));
    } else if (value === 2) {
      dispatch(assignedTaskService(projectId));
    }
  };

  return (
    <>
      <MainCard>
        <Tabs value={value} variant="scrollable" onChange={handleChange} sx={{ px: 1, width: '100%', borderBottom: '1px solid #e6ebf1' }}>
          <Tab sx={{ textTransform: 'none' }} label="Overview" />
          <Tab sx={{ textTransform: 'none' }} label="Tasks" />
          <Tab sx={{ textTransform: 'none' }} label="Assigned to Me" />
        </Tabs>
        {(value === 1 || value === 2) && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2, mx: 1 }}>
              <Typography variant="h4">
                All <span style={{ color: '#d9d9d9' }}>({tasks.length})</span>
              </Typography>
              <TableHeaderBox>
                <IconButton>
                  {loading ? (
                    <CircularProgress color="secondary" sx={{ height: 'unset !important' }} />
                  ) : (
                    <IconRefresh onClick={() => handleFetchData()} />
                  )}
                </IconButton>
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
                  sx={{ '& input': { padding: '8px 8px 8px 2px' } }}
                  onChange={() => {}}
                />
                <Select
                  value=""
                  displayEmpty
                  onChange={() => {}}
                  sx={{ width: '150px', '& .MuiInputBase-input': { py: 1.1, fontSize: '0.875rem' } }}
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
                  <Button
                    onClick={() => {
                      setEditTask(false);
                      setTaskForm(true);
                    }}
                    variant="contained"
                    color="success"
                  >
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
                      <TableCell align="right"></TableCell>
                      <TableCell align="left">Status</TableCell>
                      <TableCell align="left">Due Date</TableCell>
                      <TableCell align="left">Assign to</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tasks.map((task) => {
                      return (
                        <TableRow key={task.id}>
                          <TableCell align="left"># {task.id}</TableCell>
                          <TableCell align="left">{task.title}</TableCell>
                          <TableCell align="right">
                            {task.comments.length > 0 && (
                              <Chip
                                sx={{ border: '0' }}
                                icon={<IconMessage color="#919191" size={20} />}
                                label={task.comments.length}
                                variant="outlined"
                              />
                            )}
                            {task.assign.length > 0 && (
                              <Chip
                                sx={{ border: '0' }}
                                icon={<IconSunglasses color="#919191" size={20} />}
                                label={task.assign.length}
                                variant="outlined"
                              />
                            )}
                          </TableCell>
                          <TableCell align="left">
                            <TaskStatus status={task.status} />
                          </TableCell>
                          <TableCell align="left" style={{ color: isDatePastDueDateColor(task.end_date) }}>
                            {task.end_date ? dayjs(task.end_date).format('MMM DD, YYYY') : ''}
                          </TableCell>
                          <TableCell align="left">{task.assign.map((user) => user.first_name + ' ' + user.last_name).toString()}</TableCell>
                          <TableCell align="center">
                            <Link to={`/projects/${projectId}/tasks/view/${task.id}`}>
                              <IconButton>
                                <IconEye />
                              </IconButton>
                            </Link>
                            <IconButton
                              color="primary"
                              onClick={() => {
                                setTaskDetail(task);
                                setEditTask(true);
                                setTaskForm(true);
                              }}
                            >
                              <IconEdit />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => {
                                setTaskDetail(task);
                                setDeleteTask(true);
                              }}
                            >
                              <IconTrash />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </MainCard>
          </>
        )}
      </MainCard>

      {isTaskFormOpen && <TaskForm open={isTaskFormOpen} onClose={setTaskForm} isEditTaskOpen={isEditTaskOpen} task={taskDetail} />}

      {isDeleteTaskOpen && <DeleteTask open={isDeleteTaskOpen} onClose={setDeleteTask} task={taskDetail} formClose={setTaskForm} />}
    </>
  );
};

export default Tasks;

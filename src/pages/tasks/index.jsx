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
  LinearProgress,
  Grid,
  IconButton
} from '@mui/material';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';

import { IconSearch, IconEye, IconTrash, IconEdit, IconMessage, IconSunglasses, IconRefresh } from '@tabler/icons-react';

import MainCard from 'components/MainCard';
import Dot from 'components/@extended/Dot';
import TaskForm from './TaskForm';
import DeleteTask from './DeleteTask';

import { useSelector, useDispatch } from 'store/index';
import { assignedTaskService, getProjectTaskService, getProjectTaskStatsService } from 'services/task';
import { getTeamMemberService } from 'services/utils';

import { TASK_STATUS } from 'utils/enum';
import { handleUserName } from 'utils/utilsFn';
import { formatNumber } from 'utils/format/number';
import { isDatePastDueDateColor } from 'utils/format/date';

const TasksOptions = {
  chart: {
    id: 'task-chart',
    height: 300,
    type: 'pie'
  },
  labels: ['Open', 'In Review', 'Pending', 'Closed'],
  legend: {
    show: true,
    position: 'bottom',
    fontFamily: 'inherit',
    labels: {
      colors: 'inherit'
    }
  },
  dataLabels: {
    enabled: true,
    dropShadow: {
      enabled: false
    }
  }
};

const UsersOptions = {
  chart: {
    id: 'user-chart',
    height: 300,
    type: 'bar',
    toolbar: {
      show: false
    }
  },
  legend: {
    show: false,
    labels: {
      colors: 'inherit'
    }
  },
  xaxis: {
    categories: [['John Doe']]
  }
};

const TableHeaderBox = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '10px',
  justifyContent: 'space-between',
  padding: '2px 0'
});

const TaskHeaderBox = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '16px 0',
  flexWrap: 'wrap'
});

const TaskFilterBox = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  margin: '16px 0',
  gap: '8px',
  flexWrap: 'wrap'
});

export const TaskStatus = ({ status }) => {
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

  const [value, setValue] = useState(1);
  const [isTaskFormOpen, setTaskForm] = useState(false);
  const [isEditTaskOpen, setEditTask] = useState(false);
  const [isDeleteTaskOpen, setDeleteTask] = useState(false);

  const [taskDetail, setTaskDetail] = useState(null);

  const [filter, setFilter] = useState({
    search: '',
    status: '',
    assign: ''
  });

  const [taskOptions] = useState(TasksOptions);
  const [taskSeries, setTasksSeries] = useState([0, 0, 0, 0]);

  const [userOptions, setUserOption] = useState(UsersOptions);
  const [userSeries, setUserSeries] = useState([]);

  const { projectId } = useSelector((state) => state.project);
  const { teamMember } = useSelector((state) => state.utils);
  const { loading, tasks, stats } = useSelector((state) => state.task);

  const handleChange = (_, newValue) => {
    setFilter({
      search: '',
      status: '',
      assign: ''
    });
    setValue(newValue);
  };

  useEffect(() => {
    if (stats) {
      setTasksSeries([stats.stat.open, stats.stat.in_review, stats.stat.pending, stats.stat.closed]);

      setUserOption((prevOption) => ({
        ...prevOption,
        xaxis: {
          categories: stats.user.map((user) => [user.first_name && user.last_name ? user.first_name + ' ' + user.last_name : user.email])
        }
      }));

      setUserSeries([{ name: 'Tasks', data: stats.user.map((user) => user.task_count) }]);
    }
  }, [stats]);

  useEffect(() => {
    if (projectId) {
      dispatch(getTeamMemberService(projectId));
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, projectId]);

  const fetchData = () => {
    if (value === 0) {
      dispatch(getProjectTaskStatsService(projectId));
    } else if (value === 1) {
      dispatch(getProjectTaskService(projectId, filter.search, filter.status, filter.assign));
    } else if (value === 2) {
      dispatch(assignedTaskService(projectId, filter.search, filter.status));
    }
  };

  useEffect(() => {
    const debouncedFetchData = _.debounce(fetchData, 500);
    debouncedFetchData();

    return () => {
      debouncedFetchData.cancel();
    };
  }, [dispatch, projectId, filter]);

  const handleFilterChange = (key, value) => {
    if (key === 'search') {
      value = value.trim();
    }
    if (
      (key === 'search' && value !== filter.search) ||
      (key === 'status' && value !== filter.status) ||
      (key === 'assign' && value !== filter.assign)
    ) {
      setFilter((prevFilter) => ({ ...prevFilter, [key]: value }));
    }
  };

  const taskChartData = { series: taskSeries, options: taskOptions };
  const userChartData = { series: userSeries, options: userOptions };

  const normalise = (value) => ((value - 0) * 100) / (10000 - 0);

  return (
    <>
      <MainCard>
        <Tabs value={value} variant="scrollable" onChange={handleChange} sx={{ px: 1, width: '100%', borderBottom: '1px solid #e6ebf1' }}>
          <Tab sx={{ textTransform: 'none' }} label="Overview" />
          <Tab sx={{ textTransform: 'none' }} label="Tasks" />
          <Tab sx={{ textTransform: 'none' }} label="Assigned to Me" />
        </Tabs>
        {value === 0 && (
          <Box sx={{ py: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <MainCard>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} lg={6} sm={6}>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" align="left">
                            Open
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h3" align="left">
                            {formatNumber(stats.stat.open)}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <LinearProgress variant="determinate" value={normalise(stats.stat.open)} color="primary" />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} lg={6} sm={6}>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" align="left">
                            In Review
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h3" align="left">
                            {formatNumber(stats.stat.in_review)}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <LinearProgress variant="determinate" value={normalise(stats.stat.in_review)} color="success" />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} lg={6} sm={6}>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" align="left">
                            Pending
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h3" align="left">
                            {formatNumber(stats.stat.pending)}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <LinearProgress variant="determinate" value={normalise(stats.stat.pending)} color="secondary" />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} lg={6} sm={6}>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" align="left">
                            Closed
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h3" align="left">
                            {formatNumber(stats.stat.closed)}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <LinearProgress variant="determinate" value={normalise(stats.stat.closed)} color="error" />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MainCard>
                  <Typography variant="subtitle1">Tasks</Typography>
                  <ReactApexChart
                    options={taskChartData.options}
                    series={taskChartData.series}
                    type={taskChartData.options?.chart?.type}
                    height={taskChartData.options?.chart?.height}
                  />
                </MainCard>
              </Grid>
              <Grid item xs={12}>
                <MainCard>
                  <Typography variant="subtitle1">Users</Typography>
                  <ReactApexChart
                    options={userChartData.options}
                    series={userChartData.series}
                    type={userChartData.options?.chart?.type}
                    height={userChartData.options?.chart?.height}
                  />
                </MainCard>
              </Grid>
            </Grid>
          </Box>
        )}
        {(value === 1 || value === 2) && (
          <>
            <TaskHeaderBox>
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
            </TaskHeaderBox>
            <TaskFilterBox>
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
                value={filter.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
              <Select
                value={filter.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                displayEmpty
                sx={{ width: '150px', '& .MuiInputBase-input': { py: 1.1, fontSize: '0.875rem' } }}
              >
                <MenuItem value="">Select Status</MenuItem>
                {Object.entries(TASK_STATUS)
                  .map(([key, value]) => ({ id: parseInt(key), label: value }))
                  .map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.label}
                    </MenuItem>
                  ))}
              </Select>
              {value === 1 && (
                <Select
                  value={filter.assign}
                  onChange={(e) => handleFilterChange('assign', e.target.value)}
                  displayEmpty
                  sx={{ width: '200px', '& .MuiInputBase-input': { py: 1.1, fontSize: '0.875rem' } }}
                >
                  <MenuItem disabled value="">
                    Select Assigned User
                  </MenuItem>
                  {teamMember.map((userItem) => {
                    return (
                      <MenuItem key={userItem.user.id} value={userItem.user.id}>
                        {handleUserName(userItem.user)}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </TaskFilterBox>
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

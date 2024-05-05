import React, { useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  IconButton,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  OutlinedInput,
  Stack,
  Typography
} from '../../../node_modules/@mui/material/index';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { IconTrash, IconEdit, IconSend, IconMoodSmile } from '@tabler/icons-react';

import MainCard from 'components/MainCard';
import Loader from 'components/Loader';
import TaskForm from './TaskForm';
import DeleteTask from './DeleteTask';

import { useDispatch, useSelector } from 'store/index';
import { getTaskService } from 'services/task';

import { TASK_STATUS } from 'utils/enum';
import { isDatePastDueDateColor } from 'utils/utilsFn';

const HeaderIconBox = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '6px',
  justifyContent: 'space-between',
  padding: '2px 0'
});

const TaskStatus = ({ status }) => {
  let color;
  let bgColor;
  let borderColor;
  let title = TASK_STATUS[status];

  switch (status) {
    case 2:
      color = '#ffb814';
      bgColor = '#fff6d0';
      borderColor = '#ffcf4e';
      break;
    case 3:
      color = '#58d62a';
      bgColor = '#eafcd4';
      borderColor = '#8ae65b';
      break;
    case 1:
      color = 'error';
      break;
    default:
      color = '#549bff';
      bgColor = '#dcf0ff';
      borderColor = '#7eb9ff';
  }

  if (status === 1) {
    return (
      <Stack direction="row" spacing={1} alignItems="center">
        <Chip label={title} size="small" color={color} />
      </Stack>
    );
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Chip label={title} size="small" sx={{ color: color, background: bgColor, borderColor: borderColor }} />
    </Stack>
  );
};

const ViewTask = () => {
  const dispatch = useDispatch();
  const { taskId } = useParams();

  const { loading, task } = useSelector((state) => state.task);

  const [isTaskFormOpen, setTaskForm] = useState(false);
  const [isEditTaskOpen, setEditTask] = useState(false);
  const [isDeleteTaskOpen, setDeleteTask] = useState(false);

  useEffect(() => {
    if (taskId) {
      dispatch(getTaskService(taskId));
    }
  }, [dispatch, taskId]);

  if (loading) {
    return <Loader />;
  }

  if (!task) {
    return null;
  }

  return (
    <>
      <MainCard content={false}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Typography variant="h4">{task.title}</Typography>
          <HeaderIconBox>
            <IconButton
              color="primary"
              onClick={() => {
                setEditTask(true);
                setTaskForm(true);
              }}
            >
              <IconEdit />
            </IconButton>
            <IconButton color="error" onClick={() => setDeleteTask(true)}>
              <IconTrash />
            </IconButton>
          </HeaderIconBox>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={7}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} lg={6}>
                  <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                    Title
                  </Typography>
                  <Typography variant="body1">{task.title}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} lg={6}>
                  <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                    Status
                  </Typography>
                  <TaskStatus status={task.status} />
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                  <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                    Description
                  </Typography>
                  <Typography variant="body1">{task.description || 'N/a'}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} lg={6}>
                  <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                    Start Date
                  </Typography>
                  <Typography variant="body1">{task.start_date ? dayjs(task.start_date).format('MMM DD, YYYY') : 'N/a'}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} lg={6}>
                  <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                    Due Date
                  </Typography>
                  <Typography variant="body1" sx={{ color: task.end_date ? isDatePastDueDateColor(task.end_date) : 'inherit' }}>
                    {task.end_date ? dayjs(task.end_date).format('MMM DD, YYYY') : 'N/a'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                  <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                    Address
                  </Typography>
                  <Typography variant="body1">{task.address || 'N/a'}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                  <Typography variant="body1">
                    Created by &quot;{task.created_by.first_name} {task.created_by.last_name}&quot; on{' '}
                    {dayjs(task.created_date).format('MMM DD, YYYY')}
                  </Typography>
                  <Typography variant="body1">{task.created_by.email}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} lg={5}>
              <MainCard content={false}>
                <PerfectScrollbar
                  style={{
                    overflowX: 'hidden',
                    height: '475px',
                    minHeight: 200
                  }}
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar url="" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Grid container alignItems="center" spacing={1} component="span">
                          <Grid item xs zeroMinWidth component="span">
                            <Typography
                              variant="h5"
                              color="inherit"
                              component="span"
                              sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                display: 'block'
                              }}
                            >
                              Name
                            </Typography>
                          </Grid>
                          <Grid item component="span">
                            <Typography component="span" variant="subtitle2">
                              2h ago
                            </Typography>
                          </Grid>
                        </Grid>
                      }
                      secondary={
                        <Typography
                          variant="caption"
                          component="span"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: 'block'
                          }}
                        >
                          Last message
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </PerfectScrollbar>
                <OutlinedInput
                  value={''}
                  fullWidth
                  placeholder="Add a comment"
                  onChange={() => {}}
                  onKeyDown={(e) => e.key === 'Enter' && {}}
                  startAdornment={
                    <IconButton>
                      <IconMoodSmile />
                    </IconButton>
                  }
                  endAdornment={
                    <IconButton color="success" onClick={() => {}}>
                      <IconSend />
                    </IconButton>
                  }
                  sx={{
                    padding: '4px 12px',
                    '& input': { paddingLeft: '5px', outline: 'none !important' },
                    '& fieldset': { borderWidth: '0', borderTopWidth: '1px', borderRadius: '0 !important' }
                  }}
                />
              </MainCard>
            </Grid>
          </Grid>
        </Box>
      </MainCard>

      {isTaskFormOpen && <TaskForm open={isTaskFormOpen} onClose={setTaskForm} isEditTaskOpen={isEditTaskOpen} task={task} />}

      {isDeleteTaskOpen && <DeleteTask open={isDeleteTaskOpen} onClose={setDeleteTask} task={task} formClose={setTaskForm} />}
    </>
  );
};

export default ViewTask;

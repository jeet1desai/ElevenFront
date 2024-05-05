import React, { useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';
import { Box, Chip, Divider, Grid, IconButton, OutlinedInput, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { IconTrash, IconEdit, IconSend } from '@tabler/icons-react';

import MainCard from 'components/MainCard';
import Loader from 'components/Loader';
import TaskForm from './TaskForm';
import DeleteTask from './DeleteTask';
import CommentItem from './CommentItem';
import EmojiPicker from 'components/third-party/EmojiPicker';

import { useDispatch, useSelector } from 'store/index';
import { addTaskCommentService, getTaskService } from 'services/task';

import { TASK_STATUS } from 'utils/enum';
import { handleUserName, isDatePastDueDateColor } from 'utils/utilsFn';

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

  const [commentTitle, setCommentTitle] = useState('');

  const handleAddComment = () => {
    if (commentTitle !== '') {
      dispatch(addTaskCommentService(task.id, { comment: commentTitle }));
      setCommentTitle('');
    }
  };

  useEffect(() => {
    if (taskId) {
      dispatch(getTaskService(taskId));
    }
  }, [dispatch, taskId]);

  if (loading && !task) {
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
                    Assign To
                  </Typography>
                  {task.assign.length > 0 ? (
                    <Box sx={{ display: 'flex', gap: '10px', mt: 0.5 }}>
                      {task.assign.map((user) => (
                        <Chip key={user.id} label={handleUserName(user)} />
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body1">N/a</Typography>
                  )}
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
              <Typography variant="h5">Comments</Typography>
              <MainCard content={false} sx={{ mt: 1 }}>
                <PerfectScrollbar
                  style={{
                    overflowX: 'hidden',
                    height: '450px',
                    minHeight: 200
                  }}
                >
                  {task.comments.map((comment) => {
                    return <CommentItem key={comment.id} comment={comment} />;
                  })}
                </PerfectScrollbar>
                <OutlinedInput
                  value={commentTitle}
                  fullWidth
                  placeholder="Add a comment"
                  onChange={(e) => setCommentTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                  startAdornment={
                    <IconButton>
                      <EmojiPicker value={commentTitle} setValue={setCommentTitle} />
                    </IconButton>
                  }
                  endAdornment={
                    <IconButton color="success" onClick={() => handleAddComment()}>
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

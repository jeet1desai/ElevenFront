import React, { useEffect, useState } from 'react';

import {
  Autocomplete,
  Drawer,
  DialogContent,
  Tooltip,
  Grid,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  useMediaQuery,
  TextField
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';

import DeleteTask from './DeleteTask';
import { StyledInputLabel, StyledTitleInput } from 'components/styled-css/FormStyled';
import { StyledCommentActionBar, StyledThreadItemListContainer } from 'components/styled-css/CommentStyled';
import BlackEditor from 'components/BlackEditor/index';
import Comment from 'components/Comment';
import EmojiPicker from 'components/third-party/EmojiPicker';

import { IconX, IconTrash, IconSend } from '@tabler/icons-react';

import { MenuProps, handleUserName } from 'utils/utilsFn';
import { TASK_STATUS } from 'utils/enum';

import { useSelector, useDispatch } from 'store/index';
import { addTaskCommentService, addTaskService, editTaskService } from 'services/task';
import { getTeamMemberService } from 'services/utils';

const TaskForm = ({ open, onClose, isEditTaskOpen }) => {
  const dispatch = useDispatch();
  const matchSm = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const { projectId } = useSelector((state) => state.project);
  const { teamMember } = useSelector((state) => state.utils);
  const { task } = useSelector((state) => state.task);

  const [commentTitle, setCommentTitle] = useState('');
  const [isDeleteTaskOpen, setDeleteTask] = useState(false);
  const [formValue, setFormValue] = useState({
    title: '',
    status: 1,
    address: '',
    start_date: '',
    end_date: '',
    description: [{ type: 'paragraph', content: [] }],
    assign: []
  });

  useEffect(() => {
    if (projectId) {
      dispatch(getTeamMemberService(projectId));
    }
  }, [dispatch, projectId]);

  useEffect(() => {
    if (isEditTaskOpen && task) {
      setFormValue({
        title: task.title,
        description: JSON.parse(task.description),
        status: task.status,
        address: task.address,
        start_date: task.start_date ? dayjs(task.start_date).format('YYYY-MM-DD') : '',
        end_date: task.end_date ? dayjs(task.end_date).format('YYYY-MM-DD') : '',
        assign: task.assign.map((user) => {
          return { label: handleUserName(user), id: user.id };
        })
      });
    }
  }, [isEditTaskOpen]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formValue,
    validationSchema: Yup.object().shape({
      title: Yup.string().max(255).required('Task name is required')
    }),
    onSubmit: async (values) => {
      try {
        const body = {
          title: values.title,
          status: values.status,
          address: values.address,
          start_date: values.start_date,
          end_date: values.end_date,
          description: JSON.stringify(values.description),
          assign: values.assign.map((user) => user.id),
          project: Number(projectId)
        };

        if (isEditTaskOpen) {
          await dispatch(editTaskService(task.id, body));
        } else {
          await dispatch(addTaskService(body));
        }

        onClose(false);
      } catch (err) {
        console.log(err);
      }
    }
  });

  const { values, errors, touched, handleSubmit, getFieldProps, handleChange } = formik;

  const handleCloseDialog = () => {
    handleSubmit();
    onClose(false);
  };

  const handleAddComment = () => {
    if (commentTitle !== '') {
      dispatch(addTaskCommentService(task.id, { comment: commentTitle }));
      setCommentTitle('');
    }
  };

  return (
    <>
      <Drawer
        open={open}
        scroll="paper"
        fullWidth
        anchor="right"
        onClose={() => handleCloseDialog()}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: matchSm ? '100%' : 600,
            zIndex: 999999
          }
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{ p: '8px 10px', borderBottom: '1px solid #e6ebf1' }}
        >
          <IconButton color="secondary" onClick={() => handleCloseDialog()}>
            <IconX />
          </IconButton>
          {isEditTaskOpen && (
            <Tooltip title="Delete Task">
              <IconButton color="error" onClick={() => setDeleteTask(true)}>
                <IconTrash />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
        <FormikProvider value={formik}>
          <Form>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <StyledTitleInput
                      fullWidth
                      id="title"
                      placeholder="Enter task title"
                      {...getFieldProps('title')}
                      error={Boolean(touched.title && errors.title)}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1} flexDirection="row" alignItems="center" width="100%" flexWrap={matchSm ? 'wrap' : 'nowrap'}>
                    <StyledInputLabel htmlFor="status">Status</StyledInputLabel>
                    <Select id="status" displayEmpty fullWidth input={<OutlinedInput />} MenuProps={MenuProps} {...getFieldProps('status')}>
                      {Object.entries(TASK_STATUS)
                        .map(([key, value]) => ({ id: parseInt(key), label: value }))
                        .map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.label}
                          </MenuItem>
                        ))}
                    </Select>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1} flexDirection="row" alignItems="center" width="100%" flexWrap={matchSm ? 'wrap' : 'nowrap'}>
                    <StyledInputLabel htmlFor="address">Address</StyledInputLabel>
                    <OutlinedInput id="address" placeholder="Enter address" fullWidth {...getFieldProps('address')} />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1} flexDirection="row" alignItems="center" width="100%" flexWrap={matchSm ? 'wrap' : 'nowrap'}>
                    <StyledInputLabel htmlFor="start_date">Start Date</StyledInputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        {...getFieldProps('start_date')}
                        value={dayjs(values.start_date)}
                        inputFormat="DD/MM/YYYY"
                        id="start_date"
                        onChange={(newValue) => {
                          handleChange({ target: { name: 'start_date', value: dayjs(newValue).format('YYYY-MM-DD') } });
                        }}
                        renderInput={(params) => <TextField fullWidth {...params} />}
                      />
                    </LocalizationProvider>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1} flexDirection="row" alignItems="center" width="100%" flexWrap={matchSm ? 'wrap' : 'nowrap'}>
                    <StyledInputLabel htmlFor="end_date">Due Date</StyledInputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        {...getFieldProps('end_date')}
                        value={dayjs(values.end_date)}
                        inputFormat="DD/MM/YYYY"
                        id="end_date"
                        onChange={(newValue) => {
                          handleChange({ target: { name: 'end_date', value: dayjs(newValue).format('YYYY-MM-DD') } });
                        }}
                        renderInput={(params) => <TextField fullWidth {...params} />}
                      />
                    </LocalizationProvider>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1} flexDirection="row" alignItems="center" width="100%" flexWrap={matchSm ? 'wrap' : 'nowrap'}>
                    <StyledInputLabel htmlFor="assign">Assigned To</StyledInputLabel>
                    <Autocomplete
                      {...getFieldProps('assign')}
                      multiple
                      id="assign"
                      limitTags={2}
                      options={teamMember.map((option) => {
                        const { user } = option;
                        if (user) {
                          return { label: handleUserName(user), id: user.id };
                        }
                      })}
                      filterSelectedOptions
                      onChange={(event, newValue) => {
                        const newValues = newValue.map((member) => ({ label: member.label, id: member.id }));
                        handleChange({ target: { name: 'assign', value: newValues } });
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{
                            p: 0,
                            '& .MuiInputBase-root': { p: values.assign.length === 0 ? '10px 12px !important' : '2px 12px !important' }
                          }}
                          placeholder="Who needs to do this?"
                        />
                      )}
                      error={Boolean(touched.assign && errors.assign)}
                      MenuProps={MenuProps}
                      fullWidth
                    />
                  </Stack>
                </Grid>
              </Grid>
            </DialogContent>
            <Stack spacing={1}>
              <BlackEditor
                userList={teamMember}
                value={isEditTaskOpen ? JSON.parse(task.description) || values.description : values.description}
                handleChange={(value) => handleChange({ target: { name: 'description', value: value } })}
              />
            </Stack>
            {isEditTaskOpen && (
              <>
                {task.comments.length > 0 && (
                  <StyledThreadItemListContainer>
                    <StyledInputLabel>Comments</StyledInputLabel>
                    {task.comments.map((comment) => {
                      return <Comment key={comment.id} comment={comment} />;
                    })}
                  </StyledThreadItemListContainer>
                )}
                <StyledCommentActionBar>
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
                    sx={{ padding: '4px 12px' }}
                  />
                </StyledCommentActionBar>
              </>
            )}
          </Form>
        </FormikProvider>
      </Drawer>

      {isDeleteTaskOpen && <DeleteTask open={isDeleteTaskOpen} onClose={setDeleteTask} formClose={onClose} task={task} />}
    </>
  );
};

export default TaskForm;

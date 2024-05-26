import React, { useEffect, useState } from 'react';

import {
  OutlinedInput,
  DialogContent,
  Grid,
  IconButton,
  InputAdornment,
  RadioGroup,
  Stack,
  Drawer,
  Autocomplete,
  TextField,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import dayjs from 'dayjs';

import ColorPalette from './ColorPalette';
import BlackEditor from 'components/BlackEditor/index';
import Comment from 'components/Comment';
import { StyledTitleInput, StyledInputLabel } from 'components/styled-css/FormStyled';
import { StyledCommentActionBar, StyledThreadItemListContainer } from 'components/styled-css/CommentStyled';
import EmojiPicker from 'components/third-party/EmojiPicker';

import { IconX, IconTrash, IconCalendar, IconSend } from '@tabler/icons-react';

import { BackgroundColor, TextColor } from 'utils/enum';
import { MenuProps, handleUserName } from 'utils/utilsFn';

import { useDispatch, useSelector } from 'store/index';
import { getTeamMemberService } from 'services/utils';

const getInitialValues = (event, range) => {
  const newEvent = {
    title: '',
    assign: [],
    description: [{ type: 'paragraph', content: [] }],
    color: '#ffffff',
    background_color: '#1677ff',
    start_date: range ? range.start : '',
    end_date: range ? range.end : ''
  };
  if (event || range) {
    return _.merge({}, newEvent, event);
  }
  return newEvent;
};

const EventFrom = ({ isOpen, event, range, handleDelete, handleCreate, handleUpdate, onCancel }) => {
  const dispatch = useDispatch();
  const matchSm = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isCreating = !event;

  const { projectId } = useSelector((state) => state.project);
  const { teamMember } = useSelector((state) => state.utils);
  const calendarObj = useSelector((state) => state.calendar);

  const [commentTitle, setCommentTitle] = useState('');

  useEffect(() => {
    if (projectId) {
      dispatch(getTeamMemberService(projectId));
    }
  }, [dispatch, projectId]);

  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Title is required')
  });

  const formik = useFormik({
    initialValues: getInitialValues(event, range),
    validationSchema: EventSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const body = {
          ...values,
          start_date: dayjs(values.start_date).format('YYYY-MM-DD HH:mm'),
          end_date: dayjs(values.end_date).format('YYYY-MM-DD HH:mm'),
          description: JSON.stringify(values.description),
          assign: values.assign.map((user) => user.id),
          project: Number(projectId)
        };

        if (event) {
          handleUpdate(event.id, body);
        } else {
          handleCreate(body);
        }

        resetForm();
        onCancel();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { values, handleSubmit, getFieldProps, setFieldValue, handleChange } = formik;

  const handleAddComment = () => {
    if (commentTitle !== '') {
      setCommentTitle('');
    }
  };

  const handleCloseDialog = () => {
    handleSubmit();
    onCancel();
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={handleCloseDialog}
      variant="temporary"
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: matchSm ? '100%' : 600, zIndex: 999999 } }}
    >
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            sx={{ p: '8px 10px', borderBottom: '1px solid #e6ebf1' }}
          >
            <IconButton color="secondary" onClick={handleCloseDialog}>
              <IconX />
            </IconButton>
            {!isCreating && (
              <Tooltip title="Delete Event">
                <IconButton color="error" onClick={() => handleDelete(event?.id)}>
                  <IconTrash />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <StyledTitleInput fullWidth id="title" placeholder="Enter event title" {...getFieldProps('title')} />
                </Stack>
              </Grid>
              <Grid item xs={12} md={12}>
                <Stack spacing={1} flexDirection="row" alignItems="center" width="100%" flexWrap={matchSm ? 'wrap' : 'nowrap'}>
                  <StyledInputLabel htmlFor="start_date">Start Date</StyledInputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDateTimePicker
                      {...getFieldProps('start_date')}
                      value={dayjs(values.start_date)}
                      inputFormat="DD/MM/YYYY hh:mm A"
                      id="start_date"
                      onChange={(newValue) => {
                        handleChange({ target: { name: 'start_date', value: dayjs(newValue).format('YYYY-MM-DD') } });
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          sx={{ m: '0 !important' }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconCalendar />
                              </InputAdornment>
                            )
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Stack>
              </Grid>
              <Grid item xs={12} md={12}>
                <Stack spacing={1} flexDirection="row" alignItems="center" width="100%" flexWrap={matchSm ? 'wrap' : 'nowrap'}>
                  <StyledInputLabel htmlFor="end_date">Due Date</StyledInputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDateTimePicker
                      {...getFieldProps('end_date')}
                      value={dayjs(values.end_date)}
                      inputFormat="DD/MM/YYYY hh:mm A"
                      id="end_date"
                      onChange={(newValue) => {
                        handleChange({ target: { name: 'end_date', value: dayjs(newValue).format('YYYY-MM-DD hh:mm A') } });
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          sx={{ m: '0 !important' }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconCalendar />
                              </InputAdornment>
                            )
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1} flexDirection="row" alignItems="center" width="100%">
                  <StyledInputLabel>Background Color</StyledInputLabel>
                  <RadioGroup
                    row
                    {...getFieldProps('background_color')}
                    onChange={(e) => setFieldValue('background_color', e.target.value)}
                    name="color-radio-buttons-group"
                    sx={{ '& .MuiFormControlLabel-root': { mr: 0 } }}
                  >
                    {BackgroundColor.map((item, index) => (
                      <ColorPalette key={index} value={item.value} color={item.color} label={item.label} />
                    ))}
                  </RadioGroup>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1} flexDirection="row" alignItems="center" width="100%">
                  <StyledInputLabel>Text Color</StyledInputLabel>
                  <RadioGroup
                    row
                    {...getFieldProps('color')}
                    onChange={(e) => setFieldValue('color', e.target.value)}
                    name="text-color-radio-buttons-group"
                    sx={{ '& .MuiFormControlLabel-root': { mr: 0 } }}
                  >
                    {TextColor.map((item, index) => (
                      <ColorPalette key={index} value={item.value} color={item.color} label={item.label} />
                    ))}
                  </RadioGroup>
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
                          '& .MuiInputBase-root': { p: values.assign.length === 0 ? '10px 12px !important' : '4px 10px !important' }
                        }}
                        placeholder="Who needs to do this?"
                      />
                    )}
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
              value={values.description}
              handleChange={(value) => handleChange({ target: { name: 'description', value: value } })}
            />
          </Stack>
          {!isCreating && (
            <>
              {calendarObj.event.comments.length > 0 && (
                <StyledThreadItemListContainer>
                  <StyledInputLabel>Comments</StyledInputLabel>
                  {calendarObj.event.comments.map((comment) => {
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
  );
};

export default EventFrom;

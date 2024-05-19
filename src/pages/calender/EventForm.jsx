import React from 'react';

import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  InputAdornment,
  RadioGroup,
  Stack,
  TextField,
  Tooltip
} from '@mui/material';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

import ColorPalette from './ColorPalette';
import BlackEditor from 'components/BlackEditor/index';
import Comment from 'components/Comment/index';
import { StyledTitleInput, StyledInputLabel } from 'components/styled-css/FormStyled';
import { StyledCommentActionBar, StyledThreadItemListContainer } from 'components/styled-css/CommentStyled';

import { IconX, IconTrash, IconCalendar } from '@tabler/icons-react';

const getInitialValues = (event, range) => {
  const newEvent = {
    title: '',
    description: '',
    color: '#2196f3',
    textColor: '',
    start: range ? new Date(range.start) : new Date(),
    end: range ? new Date(range.end) : new Date()
  };

  if (event || range) {
    return _.merge({}, newEvent, event);
  }

  return newEvent;
};

const EventFrom = ({ event, range, handleDelete, handleCreate, handleUpdate, onCancel }) => {
  const isCreating = !event;

  const backgroundColor = [
    {
      color: 'primary.main'
    },
    {
      color: 'error.main'
    },
    {
      color: 'success.dark'
    },
    {
      color: 'secondary.main'
    },
    {
      color: 'warning.dark'
    },
    {
      color: 'primary.light'
    },
    {
      color: 'error.light'
    },
    {
      color: 'success.light'
    },
    {
      color: 'secondary.light'
    },
    {
      color: 'warning.light'
    }
  ];

  const textColor = [
    {
      color: 'error.light'
    },
    {
      color: 'success.light'
    },
    {
      color: 'secondary.light'
    },
    {
      color: 'warning.light'
    },
    {
      color: 'primary.light'
    },
    {
      color: 'primary.main'
    },
    {
      color: 'error.main'
    },
    {
      color: 'success.dark'
    },
    {
      color: 'warning.dark'
    },
    {
      color: 'grey.500'
    }
  ];

  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Title is required'),
    description: Yup.string().max(5000),
    end: Yup.date().when('start', (start, schema) => start && schema.min(start, 'End date must be later than start date')),
    start: Yup.date(),
    color: Yup.string().max(255),
    textColor: Yup.string().max(255)
  });

  const formik = useFormik({
    initialValues: getInitialValues(event, range),
    validationSchema: EventSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const data = {
          title: values.title,
          description: values.description,
          color: values.color,
          textColor: values.textColor,
          allDay: values.allDay,
          start: values.start,
          end: values.end
        };

        if (event) {
          handleUpdate(event.id, data);
        } else {
          handleCreate(data);
        }

        resetForm();
        onCancel();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { values, errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: '8px 10px', borderBottom: '1px solid #e6ebf1' }}>
          <IconButton color="secondary" onClick={() => onCancel(false)}>
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
                <StyledTitleInput
                  fullWidth
                  id="title"
                  placeholder="Enter event title"
                  {...getFieldProps('title')}
                  error={Boolean(touched.title && errors.title)}
                  rows={2}
                  multiline
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={12}>
              <Stack spacing={1} flexDirection="row" alignItems="center" width="100%">
                <StyledInputLabel htmlFor="start">Start Date</StyledInputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDateTimePicker
                    value={values.start}
                    inputFormat="DD/MM/YYYY hh:mm A"
                    onChange={(date) => setFieldValue('start', date)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ m: '0 !important' }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconCalendar />
                            </InputAdornment>
                          )
                        }}
                        error={Boolean(touched.start && errors.start)}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Stack>
            </Grid>
            <Grid item xs={12} md={12}>
              <Stack spacing={1} flexDirection="row" alignItems="center" width="100%">
                <StyledInputLabel htmlFor="end">End Date</StyledInputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDateTimePicker
                    value={values.end}
                    inputFormat="DD/MM/YYYY hh:mm A"
                    onChange={(date) => setFieldValue('end', date)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ m: '0 !important' }}
                        error={Boolean(touched.end && errors.end)}
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
                  {...getFieldProps('color')}
                  onChange={(e) => setFieldValue('color', e.target.value)}
                  name="color-radio-buttons-group"
                  sx={{ '& .MuiFormControlLabel-root': { mr: 0 } }}
                >
                  {backgroundColor.map((item, index) => (
                    <ColorPalette key={index} value={item.color} color={item.color} label={item.label} />
                  ))}
                </RadioGroup>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1} flexDirection="row" alignItems="center" width="100%">
                <StyledInputLabel>Text Color</StyledInputLabel>
                <RadioGroup
                  row
                  {...getFieldProps('textColor')}
                  onChange={(e) => setFieldValue('textColor', e.target.value)}
                  name="text-color-radio-buttons-group"
                  sx={{ '& .MuiFormControlLabel-root': { mr: 0 } }}
                >
                  {textColor.map((item, index) => (
                    <ColorPalette key={index} value={item.color} color={item.color} label={item.label} />
                  ))}
                </RadioGroup>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <Stack spacing={1}>
          <BlackEditor />
        </Stack>
        <DialogActions sx={{ padding: '15px 24px' }}>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {event ? 'Edit' : 'Add'}
          </Button>
        </DialogActions>
        <StyledThreadItemListContainer>
          <StyledInputLabel>Comments</StyledInputLabel>
          {[
            { id: 1, body: 'abc' },
            { id: 1, body: 'abc' }
          ].map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </StyledThreadItemListContainer>
        <StyledCommentActionBar>
          <TextField fullWidth placeholder={'Reply...'} />
          <Button variant="contained" color="secondary">
            Comment
          </Button>
        </StyledCommentActionBar>
      </Form>
    </FormikProvider>
  );
};

export default EventFrom;

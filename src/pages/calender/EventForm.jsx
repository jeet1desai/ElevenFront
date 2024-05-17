import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  OutlinedInput,
  InputAdornment,
  RadioGroup,
  Stack,
  InputLabel,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

import ColorPalette from './ColorPalette';

import { IconX, IconTrash, IconCalendar } from '@tabler/icons-react';

const getInitialValues = (event, range) => {
  const newEvent = {
    title: '',
    description: '',
    color: '#2196f3',
    textColor: '',
    allDay: false,
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
      color: 'orange.dark'
    },
    {
      color: 'grey.500'
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
    },
    {
      color: 'orange.light'
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
      color: 'orange.light'
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
      color: 'secondary.main'
    },
    {
      color: 'warning.dark'
    },
    {
      color: 'orange.dark'
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
        <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{ flexWrap: 'nowrap' }}>
          <Grid item>
            <DialogTitle sx={{ fontSize: '1.3rem', fontWeight: '500' }}>{event ? 'Edit Event' : 'Add Event'}</DialogTitle>
          </Grid>
          <Grid item sx={{ mr: 1.5 }}>
            <IconButton color="secondary" onClick={() => onCancel(false)}>
              <IconX />
            </IconButton>
          </Grid>
        </Grid>
        <Divider />
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="title">Title</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="title"
                  placeholder="Enter title"
                  {...getFieldProps('title')}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="description">Description</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="description"
                  placeholder="Enter description"
                  {...getFieldProps('description')}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                  multiline
                  rows={3}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="start">Start Date</InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDateTimePicker
                    value={values.start}
                    inputFormat="DD/MM/YYYY hh:mm A"
                    onChange={(date) => setFieldValue('start', date)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
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
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="end">End Date</InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDateTimePicker
                    value={values.end}
                    inputFormat="DD/MM/YYYY hh:mm A"
                    onChange={(date) => setFieldValue('end', date)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={Boolean(touched.end && errors.end)}
                        helperText={touched.end && errors.end}
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
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Background Color</Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
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
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Text Color</Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
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
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ padding: '15px 24px' }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              {!isCreating && (
                <Tooltip title="Delete Event">
                  <IconButton color="error" onClick={() => handleDelete(event?.id)}>
                    <IconTrash />
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
            <Grid item>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button color="error" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" disabled={isSubmitting}>
                  {event ? 'Edit' : 'Add'}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </DialogActions>
      </Form>
    </FormikProvider>
  );
};

export default EventFrom;

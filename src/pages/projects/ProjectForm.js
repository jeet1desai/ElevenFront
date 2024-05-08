import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import {
  DialogContent,
  DialogTitle,
  Grid,
  Button,
  Dialog,
  Stack,
  InputLabel,
  OutlinedInput,
  DialogActions,
  FormHelperText,
  Select,
  IconButton,
  TextField,
  MenuItem
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { parseInt } from 'lodash';

import { CloseOutlined } from '@ant-design/icons';

import { STATUS } from 'utils/enum';

import { createProjectListService, editProjectListService } from 'services/project';
import { useDispatch } from 'store/index';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 4px',
      border: '1px solid #e6ebf1',
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
};

const ProjectForm = ({ isProjectModalOpen, setProjectModal, project, isEdit }) => {
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    name: '',
    code: '',
    address: '',
    status: 1,
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    if (isEdit) {
      setFormValue({
        name: project.name,
        code: project.code,
        address: project.address,
        status: project.status,
        startDate: project.start_date ? dayjs(project.start_date).format('YYYY-MM-DD') : '',
        endDate: project.end_date ? dayjs(project.end_date).format('YYYY-MM-DD') : ''
      });
    }
  }, [isEdit]);

  return (
    <>
      <Dialog open={isProjectModalOpen} scroll="paper" fullWidth>
        <Formik
          enableReinitialize
          initialValues={formValue}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(255).required('Project name is required')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              const body = {
                name: values.name,
                code: values.code,
                status: values.status,
                start_date: values.startDate ? dayjs(values.startDate).format('YYYY-MM-DD') : '',
                end_date: values.endDate ? dayjs(values.endDate).format('YYYY-MM-DD') : '',
                address: values.address
              };

              if (isEdit) {
                await dispatch(editProjectListService(project.id, body));
              } else {
                await dispatch(createProjectListService(body));
              }

              setStatus({ success: true });
              setSubmitting(false);
              setProjectModal(false);
            } catch (err) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values, isSubmitting }) => {
            return (
              <Form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <DialogTitle sx={{ fontSize: '1.3rem', fontWeight: '500' }}>{isEdit ? 'Project Details' : 'New Project'}</DialogTitle>
                  </Grid>
                  <Grid item sx={{ mr: 1.5 }}>
                    <IconButton color="secondary" onClick={() => setProjectModal(false)}>
                      <CloseOutlined />
                    </IconButton>
                  </Grid>
                </Grid>
                <DialogContent dividers>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="name">Project Name (required)</InputLabel>
                        <OutlinedInput
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name}
                          name="name"
                          error={Boolean(touched.name && errors.name)}
                          id="name"
                          placeholder="Enter project name"
                          fullWidth
                        />
                        {touched.name && errors.name && <FormHelperText error>{errors.name}</FormHelperText>}
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="code">Project Code</InputLabel>
                        <OutlinedInput
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.code}
                          name="code"
                          id="code"
                          placeholder="Enter project code"
                          fullWidth
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="address">Address</InputLabel>
                        <OutlinedInput
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.address}
                          name="address"
                          id="address"
                          placeholder="Enter address"
                          fullWidth
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="status">Status</InputLabel>
                        <Select
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.status}
                          name="status"
                          id="status"
                          displayEmpty
                          fullWidth
                          input={<OutlinedInput />}
                          MenuProps={MenuProps}
                        >
                          {Object.entries(STATUS)
                            .map(([key, value]) => ({ id: parseInt(key), label: value }))
                            .map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.label}
                              </MenuItem>
                            ))}
                        </Select>
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="startDate">Start Date</InputLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            name="startDate"
                            value={dayjs(values.startDate)}
                            onBlur={handleBlur}
                            onChange={(newValue) => {
                              handleChange({ target: { name: 'startDate', value: dayjs(newValue).format('YYYY-MM-DD') } });
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="endDate">End Date</InputLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            value={dayjs(values.endDate)}
                            name="endDate"
                            id="endDate"
                            onBlur={handleBlur}
                            onChange={(newValue) => {
                              handleChange({ target: { name: 'endDate', value: dayjs(newValue).format('YYYY-MM-DD') } });
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </Stack>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions sx={{ padding: '15px 24px' }}>
                  <Button onClick={() => setProjectModal(false)} color="error">
                    Cancel
                  </Button>
                  <Button disableElevation disabled={isSubmitting} variant="contained" type="submit">
                    {isEdit ? 'Save' : 'Create Project'}
                  </Button>
                </DialogActions>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
    </>
  );
};

export default ProjectForm;

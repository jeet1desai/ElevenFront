import React, { useState } from 'react';

import dayjs from 'dayjs';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import {
  DialogContent,
  DialogTitle,
  Grid,
  Box,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Table,
  Typography,
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

import { CloseOutlined } from '@ant-design/icons';

import MainCard from 'components/MainCard';

import { useSelector, useDispatch } from 'store/index';

import { COUNTRIES, INDUSTRY, ROLES, STATUS, TITLE, TYPE } from 'utils/enum';

import { setProjectIdSuccess } from 'store/slices/project';
import { parseInt } from 'lodash';
import { createCompanyService } from 'services/account';

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

const headCells = [
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Project Name'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Permission'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Team'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Project Code'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Status'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Last Updated'
  }
];

const Projects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [isProjectModalOpen, setProjectModal] = useState(false);

  const { projects } = useSelector((state) => state.project);
  const { isCompany } = useSelector((state) => state.account);

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', width: '100%', alignItem: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h2">Projects</Typography>
          <Button variant="contained" color="success" onClick={() => setProjectModal(true)}>
            New Project
          </Button>
        </Box>
        <MainCard sx={{ mt: 2 }} content={false}>
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
                  {headCells.map((headCell) => (
                    <TableCell key={headCell.id} align={headCell.align} padding={headCell.disablePadding ? 'none' : 'normal'}>
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((project) => {
                  return (
                    <TableRow
                      onClick={() => {
                        dispatch(setProjectIdSuccess({ id: project.id }));
                        navigate(`/projects/${project.id}/home`);
                      }}
                      key={project.id}
                      hover
                      role="checkbox"
                      sx={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 } }}
                      tabIndex={-1}
                    >
                      <TableCell>{project.name}</TableCell>
                      <TableCell>{ROLES[project.user_role]}</TableCell>
                      <TableCell>{project.user_count}</TableCell>
                      <TableCell>{project.code}</TableCell>
                      <TableCell>{STATUS[project.status]}</TableCell>
                      <TableCell>{dayjs(project.modified_date).format('DD MMM YYYY hh:mm A')}</TableCell>
                    </TableRow>
                  );
                })}
                {projects.length === 0 && (
                  <TableRow hover role="checkbox" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} tabIndex={-1}>
                    <TableCell align="center" colSpan={6}>
                      No Project Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </MainCard>
      </Box>

      <Dialog open={!isCompany} scroll="paper" fullWidth>
        <Formik
          initialValues={{
            company: '',
            countryCode: '',
            phone: '',
            title: '',
            type: '',
            industry: ''
          }}
          validationSchema={Yup.object().shape({
            company: Yup.string().max(255).required('Company name is required'),
            countryCode: Yup.string().max(255).required('Company code is required'),
            phone: Yup.string().test('is-all-digits', 'Phone number not allowed', (value) => /^\d+$/.test(value))
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              await dispatch(
                createCompanyService({
                  company: values.company,
                  country_code: values.countryCode,
                  phone_number: values.phone,
                  title: values.title,
                  type: values.type,
                  industry: values.industry
                })
              );

              setStatus({ success: true });
              setSubmitting(false);
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
                <DialogTitle sx={{ fontSize: '1.3rem', fontWeight: '500' }}>Company Details</DialogTitle>
                <DialogContent dividers>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="company">Company Name</InputLabel>
                        <OutlinedInput
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.company}
                          name="company"
                          error={Boolean(touched.company && errors.company)}
                          id="company"
                          placeholder="Enter company name"
                          fullWidth
                        />
                        {touched.company && errors.company && <FormHelperText error>{errors.company}</FormHelperText>}
                      </Stack>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="countryCode">Phone Number</InputLabel>
                        <Select
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.countryCode}
                          name="countryCode"
                          id="countryCode"
                          displayEmpty
                          fullWidth
                          input={<OutlinedInput />}
                          MenuProps={MenuProps}
                        >
                          <MenuItem disabled value="">
                            Select country code
                          </MenuItem>
                          {COUNTRIES.map((option) => (
                            <MenuItem key={option.code} value={option.phone}>
                              <Box sx={{ display: 'flex', alignItems: 'center', '& > img': { mr: 2, flexShrink: 0 } }}>
                                <img
                                  loading="lazy"
                                  width="20"
                                  srcSet={`https://flagcdn.com/w40/${option.code?.toLowerCase()}.png 2x`}
                                  src={`https://flagcdn.com/w20/${option.code?.toLowerCase()}.png`}
                                  alt=""
                                />
                                {option.label} +{option.phone}
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.countryCode && errors.countryCode ? (
                          <FormHelperText error>{errors.countryCode}</FormHelperText>
                        ) : (
                          touched.phone && errors.phone && <FormHelperText error>{errors.phone}</FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item sm={8} xs={12}>
                      <Stack spacing={1}>
                        <InputLabel sx={{ visibility: 'hidden', [theme.breakpoints.down('sm')]: { display: 'none' } }} htmlFor="phone">
                          Phone Number
                        </InputLabel>
                        <OutlinedInput
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.phone}
                          name="phone"
                          error={Boolean(touched.phone && errors.phone)}
                          id="phone"
                          placeholder="Enter phone numbers"
                          fullWidth
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="title">Title</InputLabel>
                        <Select
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.title}
                          name="title"
                          id="title"
                          displayEmpty
                          fullWidth
                          input={<OutlinedInput />}
                          MenuProps={MenuProps}
                        >
                          <MenuItem disabled value="">
                            Select title
                          </MenuItem>
                          {Object.entries(TITLE)
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
                      <Stack spacing={1}>
                        <InputLabel htmlFor="type">Type</InputLabel>
                        <Select
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.type}
                          name="type"
                          id="type"
                          displayEmpty
                          fullWidth
                          input={<OutlinedInput />}
                          MenuProps={MenuProps}
                        >
                          <MenuItem disabled value="">
                            Select type
                          </MenuItem>
                          {Object.entries(TYPE)
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
                      <Stack spacing={1}>
                        <InputLabel htmlFor="industry">Industry</InputLabel>
                        <Select
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.industry}
                          name="industry"
                          id="industry"
                          displayEmpty
                          fullWidth
                          input={<OutlinedInput />}
                          MenuProps={MenuProps}
                        >
                          <MenuItem disabled value="">
                            Select industry
                          </MenuItem>
                          {Object.entries(INDUSTRY)
                            .map(([key, value]) => ({ id: parseInt(key), label: value }))
                            .map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.label}
                              </MenuItem>
                            ))}
                        </Select>
                      </Stack>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions sx={{ padding: '15px 24px' }}>
                  <Button disableElevation disabled={isSubmitting} variant="contained" type="submit">
                    Save
                  </Button>
                </DialogActions>
              </Form>
            );
          }}
        </Formik>
      </Dialog>

      <Dialog open={isProjectModalOpen} scroll="paper" fullWidth>
        <Formik
          initialValues={{
            name: '',
            code: '',
            address: '',
            status: '',
            startDate: '',
            endDate: ''
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(255).required('Project name is required')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              const body = {
                name: values.name,
                code: values.code,
                status: values.status,
                start_date: dayjs(values.startDate).format('YYYY-MM-DD'),
                end_date: dayjs(values.endDate).format('YYYY-MM-DD'),
                address: values.address
              };
              console.log(body);

              setStatus({ success: true });
              setSubmitting(false);
            } catch (err) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values, isSubmitting }) => {
            console.log(values);
            return (
              <Form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <DialogTitle sx={{ fontSize: '1.3rem', fontWeight: '500' }}>New Project</DialogTitle>
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
                          <MenuItem disabled value="">
                            Select status
                          </MenuItem>
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
                            onChange={(newValue) => {
                              // console.log(dayjs(newValue).format('YYYY-MM-DD'));
                              handleChange({ target: { name: 'startDate', value: newValue } });
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
                            name="endDate"
                            onChange={(newValue) => {
                              // console.log(dayjs(newValue).format('YYYY-MM-DD'));
                              handleChange({ target: { name: 'endDate', value: newValue } });
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
                    Create Project
                  </Button>
                </DialogActions>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
    </Box>
  );
};

export default Projects;

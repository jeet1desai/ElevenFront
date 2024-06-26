import React, { useEffect, useState } from 'react';

import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useTheme } from '@mui/material/styles';
import {
  DialogContent,
  DialogTitle,
  Grid,
  Box,
  Button,
  Dialog,
  Stack,
  InputLabel,
  OutlinedInput,
  DialogActions,
  FormHelperText,
  Select,
  IconButton,
  MenuItem
} from '@mui/material';
import { parseInt } from 'lodash';

import { IconX } from '@tabler/icons-react';

import { COUNTRIES, INDUSTRY, TITLE, TYPE } from 'utils/enum';
import { MenuProps } from 'utils/utilsFn';

import { createCompanyService, editCompanyService } from 'services/account';
import { useDispatch } from 'store/index';

const CompanyForm = ({ open, setCompanyModal, isEdit, company }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    company: '',
    countryCode: '',
    phone: '',
    title: '',
    type: '',
    industry: ''
  });

  useEffect(() => {
    if (isEdit) {
      setFormValue({
        company: company.company,
        countryCode: company.country_code,
        phone: company.phone_number,
        title: company.title,
        type: company.type,
        industry: company.industry
      });
    }
  }, [isEdit]);

  return (
    <>
      <Dialog open={open} scroll="paper" fullWidth>
        <Formik
          enableReinitialize
          initialValues={formValue}
          validationSchema={Yup.object().shape({
            company: Yup.string().max(255).required('Company name is required'),
            countryCode: Yup.string().max(255).required('Company code is required'),
            phone: Yup.string().test('is-all-digits', 'Phone number not allowed', (value) => /^\d+$/.test(value))
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              const body = {
                company: values.company,
                country_code: values.countryCode,
                phone_number: values.phone,
                title: values.title,
                type: values.type,
                industry: values.industry
              };

              if (isEdit) {
                await dispatch(editCompanyService(company.id, body));
              } else {
                await dispatch(createCompanyService(body));
              }

              setCompanyModal(false);
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
                <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <DialogTitle sx={{ fontSize: '1.3rem', fontWeight: '500' }}>Company Details</DialogTitle>
                  </Grid>
                  {isEdit && (
                    <Grid item sx={{ mr: 1.5 }}>
                      <IconButton color="secondary" onClick={() => setCompanyModal(false)}>
                        <IconX />
                      </IconButton>
                    </Grid>
                  )}
                </Grid>
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
                                +{option.phone}
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
                  {isEdit && (
                    <Button onClick={() => setCompanyModal(false)} color="error">
                      Cancel
                    </Button>
                  )}
                  <Button disableElevation disabled={isSubmitting} variant="contained" type="submit">
                    Save
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

export default CompanyForm;

import React from 'react';

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
  MenuItem
} from '@mui/material';
import { parseInt } from 'lodash';

import { COUNTRIES, INDUSTRY, TITLE, TYPE } from 'utils/enum';

import { createCompanyService } from 'services/account';
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
const CreateCompany = ({ open }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <>
      <Dialog open={open} scroll="paper" fullWidth>
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
    </>
  );
};

export default CreateCompany;

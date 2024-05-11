import React, { useEffect, useRef, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Typography,
  Stack,
  Box,
  Avatar,
  MenuItem,
  Select
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { IconX } from '@tabler/icons-react';

import { COUNTRIES, GENDER } from 'utils/enum';
import { MenuProps, uploadDocument } from 'utils/utilsFn';

import { useDispatch } from 'store/index';
import { updateAccountService } from 'services/account';

const UpdateAccount = ({ isUpdateAccountOpen, setUpdateAccountModal, user }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fileInputRef = useRef(null);

  const [formValue, setFormValue] = useState({
    gender: '',
    address: '',
    countryCode: '',
    phone: '',
    firebaseUrl: '',
    file: null,
    url: ''
  });

  useEffect(() => {
    if (user) {
      setFormValue({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        gender: user.gender,
        address: user.address,
        countryCode: user.country_code,
        phone: user.phone_number,
        firebaseUrl: user.profile_picture,
        file: null,
        url: ''
      });
    }
  }, [user]);

  return (
    <>
      <Dialog open={isUpdateAccountOpen} scroll="paper" fullWidth maxWidth="sm">
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          <Grid item>
            <DialogTitle sx={{ fontSize: '1.3rem', fontWeight: '500' }}>Update Account</DialogTitle>
          </Grid>
          <Grid item sx={{ mr: 1.5 }}>
            <IconButton color="secondary" onClick={() => setUpdateAccountModal(false)}>
              <IconX />
            </IconButton>
          </Grid>
        </Grid>
        <Formik
          enableReinitialize
          initialValues={formValue}
          validationSchema={Yup.object().shape({})}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              let note_value = { ...values };
              if (values.file) {
                const url = await uploadDocument('eleven/user', values.file);
                note_value['firebaseUrl'] = url;
              }

              const body = {
                first_name: note_value.firstName,
                last_name: note_value.gender,
                gender: note_value.gender,
                phone_number: note_value.phone,
                country_code: note_value.countryCode,
                profile_picture: note_value.firebaseUrl,
                address: note_value.address
              };

              await dispatch(updateAccountService(body));

              setUpdateAccountModal(false);
              setStatus({ success: true });
              setSubmitting(false);
            } catch (err) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => {
            return (
              <Form noValidate onSubmit={handleSubmit}>
                <DialogContent dividers>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Stack spacing={1} alignItems="center">
                        <input
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files) {
                              handleChange({ target: { name: 'file', value: files[0] } });
                              handleChange({ target: { name: 'url', value: URL.createObjectURL(files[0]) } });
                            }
                          }}
                          ref={fileInputRef}
                          type="file"
                          name="firebaseUrl"
                          onBlur={handleBlur}
                          accept="image/*"
                          style={{ display: 'none' }}
                        />
                        <Avatar
                          src={values.url || values.firebaseUrl}
                          onClick={() => fileInputRef.current.click()}
                          sx={{ cursor: 'pointer', width: 56, height: 56 }}
                        />
                        <Typography sx={{ cursor: 'pointer' }} color="error" variant="body1" onClick={() => fileInputRef.current.click()}>
                          Upload Photo
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="firstName">First Name</InputLabel>
                        <OutlinedInput
                          value={values.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="firstName"
                          id="firstName"
                          placeholder="Enter first name"
                          fullWidth
                          error={Boolean(touched.firstName && errors.firstName)}
                        />
                        {touched.firstName && errors.firstName && <FormHelperText error>{errors.firstName}</FormHelperText>}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="lastName">Last Name</InputLabel>
                        <OutlinedInput
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="lastName"
                          id="lastName"
                          placeholder="Enter last name"
                          fullWidth
                          error={Boolean(touched.lastName && errors.lastName)}
                        />
                        {touched.lastName && errors.lastName && <FormHelperText error>{errors.lastName}</FormHelperText>}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <OutlinedInput
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          name="email"
                          id="email"
                          placeholder="abc@company.com"
                          fullWidth
                          disabled
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="gender">Gender</InputLabel>
                        <Select
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.gender}
                          name="gender"
                          id="gender"
                          displayEmpty
                          fullWidth
                          input={<OutlinedInput />}
                          MenuProps={MenuProps}
                        >
                          <MenuItem disabled value="">
                            Select Gender
                          </MenuItem>
                          {Object.entries(GENDER)
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
                        <InputLabel htmlFor="address">Address</InputLabel>
                        <OutlinedInput
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.address}
                          name="address"
                          error={Boolean(touched.address && errors.address)}
                          id="address"
                          placeholder="Enter your address"
                          fullWidth
                        />
                        {touched.address && errors.address && <FormHelperText error>{errors.address}</FormHelperText>}
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
                  </Grid>
                </DialogContent>
                <DialogActions sx={{ padding: '15px 24px' }}>
                  <Button color="error" onClick={() => setUpdateAccountModal(false)}>
                    Cancel
                  </Button>
                  <Button disableElevation disabled={isSubmitting} type="submit" variant="contained" color="primary">
                    Update
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

export default UpdateAccount;

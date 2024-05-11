import React, { useState } from 'react';

import {
  FormHelperText,
  OutlinedInput,
  InputLabel,
  Stack,
  Button,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  InputAdornment,
  DialogActions
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { IconX } from '@tabler/icons-react';

import { useDispatch } from 'store/index';
import { changePasswordService } from 'services/account';

const ChangePassword = ({ isPasswordModalOpen, setPasswordModal }) => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Dialog open={isPasswordModalOpen} scroll="paper" fullWidth maxWidth="sm">
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          <Grid item>
            <DialogTitle sx={{ fontSize: '1.3rem', fontWeight: '500' }}>Change Password</DialogTitle>
          </Grid>
          <Grid item sx={{ mr: 1.5 }}>
            <IconButton color="secondary" onClick={() => setPasswordModal(false)}>
              <IconX />
            </IconButton>
          </Grid>
        </Grid>
        <Formik
          enableReinitialize
          initialValues={{
            currentPassword: '',
            confirmPassword: '',
            newPassword: ''
          }}
          validationSchema={Yup.object().shape({
            currentPassword: Yup.string().required('Current password is required'),
            newPassword: Yup.string().required('New password is required'),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
              .required('Please confirm your new password')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              const body = {
                old_password: values.currentPassword,
                new_password: values.newPassword
              };

              await dispatch(changePasswordService(body));

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
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="currentPassword">Current password</InputLabel>
                        <OutlinedInput
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.currentPassword}
                          name="currentPassword"
                          error={Boolean(touched.currentPassword && errors.currentPassword)}
                          id="currentPassword"
                          placeholder="*******"
                          fullWidth
                          type={showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton onClick={handleClickShowPassword} edge="end" size="large">
                                {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        {touched.currentPassword && errors.currentPassword && (
                          <FormHelperText error>{errors.currentPassword}</FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="newPassword">New password</InputLabel>
                        <OutlinedInput
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.newPassword}
                          name="newPassword"
                          error={Boolean(touched.newPassword && errors.newPassword)}
                          id="newPassword"
                          placeholder="*******"
                          fullWidth
                          type={showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton onClick={handleClickShowPassword} edge="end" size="large">
                                {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        {touched.newPassword && errors.newPassword && <FormHelperText error>{errors.newPassword}</FormHelperText>}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
                        <OutlinedInput
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.confirmPassword}
                          name="confirmPassword"
                          error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                          id="confirmPassword"
                          placeholder="*******"
                          fullWidth
                          type={showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton onClick={handleClickShowPassword} edge="end" size="large">
                                {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        {touched.confirmPassword && errors.confirmPassword && (
                          <FormHelperText error>{errors.confirmPassword}</FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions sx={{ padding: '15px 24px' }}>
                  <Button color="error" onClick={() => setPasswordModal(false)}>
                    Cancel
                  </Button>
                  <Button disableElevation disabled={isSubmitting} type="submit" variant="contained" color="primary">
                    Change Password
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

export default ChangePassword;

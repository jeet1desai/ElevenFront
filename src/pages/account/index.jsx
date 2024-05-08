import React, { useState } from 'react';

import {
  FormHelperText,
  OutlinedInput,
  InputLabel,
  Stack,
  Box,
  Button,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  DialogActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { IconX } from '@tabler/icons-react';

import { IconEdit, IconTrash, IconFolders } from '@tabler/icons-react';

import MainCard from 'components/MainCard';

import { useSelector } from 'store/index';

const Account = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.account);

  const [isPasswordModalOpen, sePasswordModal] = useState(false);

  return (
    <>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h2">Account Settings</Typography>
            <IconButton sx={{ bgcolor: 'primary.lighter' }} onClick={() => navigate('/projects')}>
              <IconFolders />
            </IconButton>
          </Box>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <MainCard
                title="Profile"
                secondary={
                  <Box sx={{ display: 'flex', gap: '8px' }}>
                    <Button variant="contained" color="success" startIcon={<IconEdit size={18} />}>
                      Edit
                    </Button>
                    <Button onClick={() => sePasswordModal(true)} variant="contained" color="error" startIcon={<IconEdit size={18} />}>
                      Change Password
                    </Button>
                  </Box>
                }
              >
                {user && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Avatar />
                        <Typography variant="body1">
                          {user.first_name} {user.last_name}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                        Email
                      </Typography>
                      <Typography variant="body1">{user.email}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                        Phone Number
                      </Typography>
                      <Typography variant="body1">
                        +{user.country_code} {user.phone_number}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                        Address
                      </Typography>
                      <Typography variant="body1">{user.address}</Typography>
                    </Grid>
                  </Grid>
                )}
              </MainCard>
            </Grid>
            <Grid item xs={12}>
              <MainCard
                title="Region"
                secondary={
                  <Button variant="contained" color="success" startIcon={<IconEdit size={18} />}>
                    Edit
                  </Button>
                }
              ></MainCard>
            </Grid>
            <Grid item xs={12}>
              <MainCard
                title="Status"
                secondary={
                  <Button variant="contained" color="primary">
                    Upgrade
                  </Button>
                }
              ></MainCard>
            </Grid>
            <Grid item xs={12}>
              <MainCard>
                <Button variant="contained" color="error" startIcon={<IconTrash size={18} />}>
                  Delete Account
                </Button>
              </MainCard>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Dialog open={isPasswordModalOpen} scroll="paper" fullWidth maxWidth="sm">
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          <Grid item>
            <DialogTitle sx={{ fontSize: '1.3rem', fontWeight: '500' }}>Change Password</DialogTitle>
          </Grid>
          <Grid item sx={{ mr: 1.5 }}>
            <IconButton color="secondary" onClick={() => sePasswordModal(false)}>
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
          validationSchema={Yup.object().shape({})}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              console.log(values);

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
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => {
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
                          type="password"
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
                          type="password"
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
                          type="password"
                        />
                        {touched.confirmPassword && errors.confirmPassword && (
                          <FormHelperText error>{errors.confirmPassword}</FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions sx={{ padding: '15px 24px' }}>
                  <Button color="error" onClick={() => sePasswordModal(false)}>
                    Cancel
                  </Button>
                  <Button disableElevation variant="contained" type="submit">
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

export default Account;

import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, IconButton, Typography, Grid, Stack, InputLabel, TextField, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { IconFolders } from '@tabler/icons-react';

import MainCard from 'components/MainCard';

const Feedback = () => {
  const navigate = useNavigate();

  const formValue = {
    title: '',
    message: ''
  };

  return (
    <>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h2">Feedback</Typography>
            <IconButton sx={{ bgcolor: 'primary.lighter' }} onClick={() => navigate('/projects')}>
              <IconFolders />
            </IconButton>
          </Box>
          <Grid container spacing={2} sx={{ mt: 0 }} justifyContent="center">
            <Grid item xs={12} sm={8}>
              <MainCard title="Give us Feedback">
                <Formik
                  enableReinitialize
                  initialValues={formValue}
                  validationSchema={Yup.object().shape({})}
                  onSubmit={async (values, { resetForm }) => {
                    setLoading(true);
                    try {
                      resetForm();
                    } catch (err) {
                      setLoading(false);
                    }
                  }}
                >
                  {({ touched, errors, handleSubmit, getFieldProps }) => {
                    return (
                      <Form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Stack spacing={1}>
                              <InputLabel htmlFor="title">Title</InputLabel>
                              <TextField
                                id="title"
                                placeholder="Enter title"
                                fullWidth
                                {...getFieldProps('title')}
                                error={Boolean(touched.title && errors.title)}
                              />
                            </Stack>
                          </Grid>
                          <Grid item xs={12}>
                            <Stack spacing={1}>
                              <InputLabel htmlFor="message">Message</InputLabel>
                              <TextField
                                id="message"
                                placeholder="Enter message"
                                fullWidth
                                {...getFieldProps('message')}
                                error={Boolean(touched.message && errors.message)}
                                rows={5}
                                multiline
                              />
                            </Stack>
                          </Grid>
                          <Grid item xs={12}>
                            <Stack spacing={1}>
                              <Button fullWidth type="submit" variant="contained">
                                Submit
                              </Button>
                            </Stack>
                          </Grid>
                        </Grid>
                      </Form>
                    );
                  }}
                </Formik>
              </MainCard>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Feedback;

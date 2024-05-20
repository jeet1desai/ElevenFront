import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  IconButton,
  Typography,
  Grid,
  Stack,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Button,
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { IconFolders, IconX } from '@tabler/icons-react';

import MainCard from 'components/MainCard';
import DropBox from 'components/DropBox/index';
import { StyledImage, StyledImageContainer, StyledRemoveButton } from 'components/styled-css/ImageStyled';

const Help = () => {
  const navigate = useNavigate();

  const [formValue] = useState({
    title: '',
    message: '',
    project: '',
    files: [],
    url: []
  });

  return (
    <>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h2">Help and Support</Typography>
            <IconButton sx={{ bgcolor: 'primary.lighter' }} onClick={() => navigate('/projects')}>
              <IconFolders />
            </IconButton>
          </Box>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={12} sm={7}>
              <MainCard>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar src="" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Grid container alignItems="center" spacing={1} component="span">
                        <Grid item xs zeroMinWidth component="span">
                          <Typography
                            variant="h5"
                            color="inherit"
                            component="span"
                            sx={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              display: 'block'
                            }}
                          >
                            Title
                          </Typography>
                        </Grid>
                      </Grid>
                    }
                    secondary={
                      <Grid container alignItems="center" spacing={1} component="span">
                        <Grid item xs zeroMinWidth component="span">
                          <Typography variant="caption" component="span">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas expedita harum corporis. Totam ipsa quas quae
                            sed. Sed voluptatem nostrum ratione quidem quasi quia cum voluptas quaerat, architecto nisi at?
                          </Typography>
                        </Grid>
                      </Grid>
                    }
                  />
                </ListItemButton>
                <ListItemText
                  secondary={
                    <Grid container alignItems="center" spacing={1} component="span">
                      <Grid item xs zeroMinWidth component="span">
                        <Typography variant="caption" component="span">
                          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas expedita harum corporis. Totam ipsa quas quae
                          sed. Sed voluptatem nostrum ratione quidem quasi quia cum voluptas quaerat, architecto nisi at?
                        </Typography>
                      </Grid>
                    </Grid>
                  }
                />
              </MainCard>
            </Grid>
            <Grid item xs={12} sm={5}>
              <MainCard title="Help and Support Form">
                <Formik
                  enableReinitialize
                  initialValues={formValue}
                  validationSchema={Yup.object().shape({})}
                  onSubmit={async (values, { resetForm }) => {
                    setLoading(true);
                    try {
                      console.log(values);
                      resetForm();
                    } catch (err) {
                      setLoading(false);
                    }
                  }}
                >
                  {({ values, touched, errors, handleSubmit, getFieldProps, handleChange }) => {
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
                              <InputLabel htmlFor="project">Project</InputLabel>
                              <Select
                                {...getFieldProps('project')}
                                error={Boolean(touched.project && errors.project)}
                                displayEmpty
                                fullWidth
                                sx={{ '& .MuiInputBase-input': { py: 1.1, fontSize: '0.875rem' } }}
                              >
                                <MenuItem value="">Select Project</MenuItem>
                                <MenuItem value="1">Project</MenuItem>
                              </Select>
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
                          <Grid item xs={12} sm={12}>
                            <DropBox handleChange={handleChange} />
                            <Grid container spacing={2} gap={2} sx={{ mt: 0.5 }}>
                              {values.url.map((link, index) => {
                                return (
                                  <Grid item xs={4} sm={3} md={2} lg={2} key={index}>
                                    <StyledImageContainer>
                                      <StyledImage component="img" src={link} />
                                      <Box sx={{ top: 6, right: 6, position: 'absolute' }}>
                                        <StyledRemoveButton
                                          size="small"
                                          onClick={() => {
                                            handleChange({
                                              target: { name: 'files', value: values.files.filter((file, i) => i !== index) }
                                            });
                                            handleChange({
                                              target: { name: 'url', value: values.url.filter((file, i) => i !== index) }
                                            });
                                          }}
                                        >
                                          <IconX />
                                        </StyledRemoveButton>
                                      </Box>
                                    </StyledImageContainer>
                                  </Grid>
                                );
                              })}
                            </Grid>
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

export default Help;

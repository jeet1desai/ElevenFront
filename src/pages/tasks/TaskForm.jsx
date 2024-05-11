import React, { useEffect, useRef, useState } from 'react';

import { styled } from '@mui/material/styles';
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { useDropzone } from 'react-dropzone';

import { StyledContainer, StyledUploadDragIcon, StyledUploadDragSubTitle, StyledUploadDragTitle } from 'components/styled-css/DropZoneCSS';
import DeleteTask from './DeleteTask';

import { IconX, IconPlus, IconTrash } from '@tabler/icons-react';

import { MenuProps, handleUserName, uploadDocument } from 'utils/utilsFn';
import { TASK_STATUS } from 'utils/enum';

import { useSelector, useDispatch } from 'store/index';
import { addTaskService, editTaskService } from 'services/task';
import { getTeamMemberService } from 'services/utils';

const StyledUploadIcon = styled(IconPlus)({
  color: '#999999',
  marginBottom: '12px'
});

const StyledButton = styled(Button)({
  color: '#666666',
  marginBottom: '12px',
  width: '150px',
  display: 'flex',
  gap: '4px',
  border: '1px solid #e6ebf1',
  '& svg': {
    margin: '0',
    width: '20px',
    height: '20px'
  }
});

const StyledImageContainer = styled('div')({
  width: 100,
  height: 100,
  borderRadius: 0.25,
  overflow: 'hidden',
  position: 'relative'
});

const StyledRemoveButton = styled(IconButton)({
  p: '1px',
  color: '#f44336',
  bgcolor: '#fff',
  border: ' 1px solid red',
  borderRadius: '50px !important',
  width: '20px',
  background: 'transparent',
  height: '20px',
  '&:hover': {
    bgcolor: '#fff'
  }
});

const StyledImage = styled(Paper)({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  borderRadius: 8
});

const TaskForm = ({ open, onClose, task, isEditTaskOpen }) => {
  const dispatch = useDispatch();

  const { projectId } = useSelector((state) => state.project);
  const { teamMember } = useSelector((state) => state.utils);

  const [loading, setLoading] = useState(false);
  const [isDeleteTaskOpen, setDeleteTask] = useState(false);
  const [formValue, setFormValue] = useState({
    title: '',
    status: 1,
    address: '',
    start_date: '',
    end_date: '',
    description: '',
    assign: [],
    firebaseUrl: [],
    files: [],
    url: []
  });

  useEffect(() => {
    if (projectId) {
      dispatch(getTeamMemberService(projectId));
    }
  }, [dispatch, projectId]);

  useEffect(() => {
    if (isEditTaskOpen) {
      setFormValue({
        title: task.title,
        status: task.status,
        address: task.address,
        start_date: task.start_date ? dayjs(task.start_date).format('YYYY-MM-DD') : '',
        end_date: task.end_date ? dayjs(task.end_date).format('YYYY-MM-DD') : '',
        description: task.description,
        assign: task.assign.map((user) => {
          return { label: handleUserName(user), id: user.id };
        }),
        firebaseUrl: task.urls,
        files: [],
        url: []
      });
    }
  }, [isEditTaskOpen]);

  return (
    <>
      <Dialog open={open} scroll="paper" fullWidth>
        <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{ flexWrap: 'nowrap' }}>
          <Grid item>
            <DialogTitle sx={{ fontSize: '1.3rem', fontWeight: '500' }}>
              {isEditTaskOpen ? `Edit Task: ${task.title}` : 'Add New Task'}
            </DialogTitle>
          </Grid>
          <Grid item sx={{ mr: 1.5 }}>
            <IconButton color="secondary" onClick={() => onClose(false)}>
              <IconX />
            </IconButton>
          </Grid>
        </Grid>
        <Formik
          enableReinitialize
          initialValues={formValue}
          validationSchema={Yup.object().shape({
            title: Yup.string().max(255).required('Task name is required')
          })}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              let fileUrls = [];
              const uploadPromises = [];

              values.files.forEach((file) => {
                const uploadPromise = uploadDocument('eleven/tasks', file).then((url) => {
                  fileUrls.push(url);
                });
                uploadPromises.push(uploadPromise);
              });

              Promise.all(uploadPromises).then(async () => {
                const body = {
                  title: values.title,
                  status: values.status,
                  address: values.address,
                  start_date: values.start_date,
                  end_date: values.end_date,
                  description: values.description,
                  assign: values.assign.map((user) => user.id),
                  url: [...fileUrls, ...values.firebaseUrl],
                  project: Number(projectId)
                };

                onClose(false);

                if (isEditTaskOpen) {
                  await dispatch(editTaskService(task.id, body));
                } else {
                  await dispatch(addTaskService(body));
                }

                setLoading(false);
              });
            } catch (err) {
              setLoading(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => {
            return (
              <Form noValidate onSubmit={handleSubmit}>
                <DialogContent dividers>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="title">Title</InputLabel>
                        <OutlinedInput
                          value={values.title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="title"
                          id="title"
                          placeholder="Enter title"
                          fullWidth
                          error={Boolean(touched.title && errors.title)}
                        />
                        {touched.title && errors.title && <FormHelperText error>{errors.title}</FormHelperText>}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                          {Object.entries(TASK_STATUS)
                            .map(([key, value]) => ({ id: parseInt(key), label: value }))
                            .map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.label}
                              </MenuItem>
                            ))}
                        </Select>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="address">Address</InputLabel>
                        <OutlinedInput
                          value={values.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="address"
                          id="address"
                          placeholder="Enter address"
                          fullWidth
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="start_date">Start Date</InputLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            value={dayjs(values.start_date)}
                            name="start_date"
                            id="start_date"
                            onBlur={handleBlur}
                            onChange={(newValue) => {
                              handleChange({ target: { name: 'start_date', value: dayjs(newValue).format('YYYY-MM-DD') } });
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="end_date">Due Date</InputLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            value={dayjs(values.end_date)}
                            name="end_date"
                            id="end_date"
                            onBlur={handleBlur}
                            onChange={(newValue) => {
                              handleChange({ target: { name: 'end_date', value: dayjs(newValue).format('YYYY-MM-DD') } });
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="assign">Assigned To</InputLabel>
                        <Autocomplete
                          multiple
                          id="assign"
                          name="assign"
                          limitTags={2}
                          options={teamMember.map((option) => {
                            const { user } = option;
                            if (user) {
                              return { label: handleUserName(user), id: user.id };
                            }
                          })}
                          onBlur={handleBlur}
                          value={values.assign}
                          filterSelectedOptions
                          onChange={(event, newValue) => {
                            const newValues = newValue.map((member) => ({ label: member.label, id: member.id }));
                            handleChange({ target: { name: 'assign', value: newValues } });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={{
                                p: 0,
                                '& .MuiInputBase-root': { p: values.assign.length === 0 ? '10px 12px !important' : '2px 12px !important' }
                              }}
                              placeholder="Who needs to do this?"
                            />
                          )}
                          MenuProps={MenuProps}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="description">Description</InputLabel>
                        <OutlinedInput
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="description"
                          id="description"
                          placeholder="Enter description"
                          fullWidth
                          multiline
                          rows={3}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="url">Photos</InputLabel>
                        <TaskDropZone handleChange={handleChange} />
                        <Grid container spacing={1}>
                          {values.firebaseUrl.map((link, index) => {
                            return (
                              <Grid item xs={4} sm={3} md={2} lg={2} key={index}>
                                <StyledImageContainer>
                                  <StyledImage component="img" src={link} />
                                  <Box sx={{ top: 6, right: 6, position: 'absolute' }}>
                                    <StyledRemoveButton
                                      size="small"
                                      onClick={() => {
                                        handleChange({
                                          target: { name: 'firebaseUrl', value: values.firebaseUrl.filter((file, i) => i !== index) }
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
                      </Stack>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions sx={{ padding: '15px 24px', justifyContent: 'space-between' }}>
                  {isEditTaskOpen ? (
                    <IconButton color="error" onClick={() => setDeleteTask(true)}>
                      <IconTrash />
                    </IconButton>
                  ) : (
                    <div></div>
                  )}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Button onClick={() => onClose(false)} color="error">
                      Cancel
                    </Button>
                    <Button disableElevation disabled={loading} variant="contained" type="submit">
                      {loading ? 'Saving' : isEditTaskOpen ? 'Save Task' : 'Add Task'}
                    </Button>
                  </Box>
                </DialogActions>
              </Form>
            );
          }}
        </Formik>
      </Dialog>

      {isDeleteTaskOpen && <DeleteTask open={isDeleteTaskOpen} onClose={setDeleteTask} formClose={onClose} task={task} />}
    </>
  );
};

const TaskDropZone = ({ handleChange }) => {
  const fileInputRef = useRef(null);

  const handleChangeFiles = (files) => {
    const fileList = [...files];
    handleChange({ target: { name: 'files', value: fileList } });
    handleChange({
      target: {
        name: 'url',
        value: fileList.map((file) => {
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          return URL.createObjectURL(file);
        })
      }
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDragEnter: () => {},
    onDragLeave: () => {},
    onDrop: () => {},
    onDropAccepted: async (files) => {
      handleChangeFiles(files);
    }
  });

  return (
    <StyledContainer {...getRootProps()}>
      {isDragActive ? (
        <>
          <input accept="image/*" {...getInputProps()} />
          <StyledUploadDragIcon />
          <StyledUploadDragTitle>Upload a photos</StyledUploadDragTitle>
          <StyledUploadDragSubTitle>Drag and Drop Here</StyledUploadDragSubTitle>
        </>
      ) : (
        <>
          <input
            onChange={(e) => handleChangeFiles(e.target.files)}
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            style={{ display: 'none' }}
          />
          <StyledButton onClick={() => fileInputRef.current.click()}>
            <StyledUploadIcon />
            Upload a photos
          </StyledButton>
          <StyledUploadDragSubTitle>OR</StyledUploadDragSubTitle>
          <StyledUploadDragTitle>Drag and Drop Here</StyledUploadDragTitle>
        </>
      )}
    </StyledContainer>
  );
};

export default TaskForm;

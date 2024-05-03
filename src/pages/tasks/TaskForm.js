import React, { useRef } from 'react';

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
} from '../../../node_modules/@mui/material/index';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDropzone } from 'react-dropzone';

import { StyledContainer, StyledUploadDragIcon, StyledUploadDragSubTitle, StyledUploadDragTitle } from 'components/styled-css/DropZoneCSS';

import { IconX, IconPlus } from '@tabler/icons-react';

import { MenuProps } from 'utils/utilsFn';
import { TASK_STATUS } from 'utils/enum';

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

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003
  }
];

const TaskForm = ({ open, onClose }) => {
  return (
    <>
      <Dialog open={open} scroll="paper" fullWidth>
        <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{ flexWrap: 'nowrap' }}>
          <Grid item>
            <DialogTitle sx={{ fontSize: '1.3rem', fontWeight: '500' }}>Add New Task</DialogTitle>
          </Grid>
          <Grid item sx={{ mr: 1.5 }}>
            <IconButton color="secondary" onClick={() => onClose(false)}>
              <IconX />
            </IconButton>
          </Grid>
        </Grid>
        <Formik
          initialValues={{
            title: '',
            address: '',
            startDate: '',
            endDate: '',
            description: '',
            assign: [],
            assets: [],
            status: '1'
          }}
          validationSchema={Yup.object().shape({})}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
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
                        />
                        {touched.company && errors.company && <FormHelperText error>{errors.title}</FormHelperText>}
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
                        <InputLabel htmlFor="startDate">Start Date</InputLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            name="startDate"
                            onChange={(newValue) => {
                              handleChange({ target: { name: 'startDate', value: newValue } });
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="endDate">Due Date</InputLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            name="endDate"
                            onChange={(newValue) => {
                              handleChange({ target: { name: 'endDate', value: newValue } });
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
                          limitTags={2}
                          options={top100Films}
                          getOptionLabel={(option) => option.title}
                          defaultValue={[top100Films[1]]}
                          filterSelectedOptions
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={{ p: 0, '& .MuiInputBase-root': { p: '10px 12px !important' } }}
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
                        <InputLabel htmlFor="assets">Photos</InputLabel>
                        <TaskDropZone />

                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          <StyledImageContainer>
                            <StyledImage
                              component="img"
                              // src={isString(file) ? file : preview}
                            />
                            <Box sx={{ top: 6, right: 6, position: 'absolute' }}>
                              <StyledRemoveButton size="small">
                                <IconX />
                              </StyledRemoveButton>
                            </Box>
                          </StyledImageContainer>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions sx={{ padding: '15px 24px' }}>
                  <Button onClick={() => onClose(false)} color="error">
                    Cancel
                  </Button>
                  <Button disabled={isSubmitting} disableElevation variant="contained" type="submit">
                    Add Task
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

const TaskDropZone = () => {
  const fileInputRef = useRef(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDragEnter: () => {},
    onDragLeave: () => {},
    onDrop: () => {},
    onDropAccepted: async (files) => {
      console.log(files);
    }
  });

  return (
    <StyledContainer {...getRootProps()}>
      {isDragActive ? (
        <>
          <input accept="image/*" {...getInputProps()} />
          <StyledUploadDragIcon />
          <StyledUploadDragTitle>Upload a file</StyledUploadDragTitle>
          <StyledUploadDragSubTitle>Drag and Drop Here</StyledUploadDragSubTitle>
        </>
      ) : (
        <>
          <input ref={fileInputRef} type="file" multiple accept="image/*" style={{ display: 'none' }} />
          <StyledButton onClick={() => fileInputRef.current.click()}>
            <StyledUploadIcon />
            Upload a file
          </StyledButton>
          <StyledUploadDragSubTitle>OR</StyledUploadDragSubTitle>
          <StyledUploadDragTitle>Drag and Drop Here</StyledUploadDragTitle>
        </>
      )}
    </StyledContainer>
  );
};

export default TaskForm;

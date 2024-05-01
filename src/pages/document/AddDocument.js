import React, { useRef, useState } from 'react';

import { styled } from '@mui/material/styles';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import { useDropzone } from 'react-dropzone';

import { IconX, IconPlus, IconUpload } from '@tabler/icons-react';

import { getFileType, uploadDocument } from 'utils/utilsFn';

import { useSelector, useDispatch } from 'store/index';
import { addNewDocumentService } from 'services/document';

const StyledContainer = styled('div')({
  alignItems: 'center',
  background: '#fcfcfc',
  border: '1px solid #e6ebf1',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
  height: '250px'
});

const StyledUploadIcon = styled(IconPlus)({
  color: '#999999',
  marginBottom: '12px'
});

const StyledUploadDragIcon = styled(IconUpload)({
  color: '#999999',
  marginBottom: '12px'
});

const StyledButton = styled(Button)({
  color: '#666666',
  marginBottom: '12px',
  width: '150px',
  display: 'flex',
  gap: '8px',
  border: '1px solid #e6ebf1',
  '& svg': {
    margin: '0',
    width: '20px',
    height: '20px'
  }
});

const StyledUploadDragTitle = styled('div')({
  color: '#333333',
  fontSize: '1.23rem',
  fontWeight: '500',
  lineHeight: '1.2',
  marginBottom: '8px'
});

const StyledUploadDragSubTitle = styled('div')({
  color: '#999999',
  fontSize: '1rem',
  fontWeight: '400',
  lineHeight: '1.2',
  marginBottom: '8px'
});

const StyledRow = styled('div')({
  alignItems: 'center',
  alignSelf: 'stretch',
  border: '1px solid #e6ebf1',
  display: 'flex',
  borderRadius: '8px',
  justifyContent: 'space-between',
  padding: '2px 12px'
});

const StyledText = styled('p')({
  margin: '0',
  color: '#333333'
});

const AddDocument = ({ open, onClose }) => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const { project, projectId } = useSelector((state) => state.project);
  const { user } = useSelector((state) => state.account);

  const [formValue, setFormValue] = useState({
    name: '',
    file: null,
    isPublish: false
  });

  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    onDragEnter: () => {},
    onDragLeave: () => {},
    onDrop: () => {},
    onDropAccepted: async ([file]) => {
      setFormValue({ ...formValue, file: file });
    }
  });

  const handleOnClose = () => {
    setFormValue({ name: '', file: null });
    setLoading(false);
    onClose();
  };

  const handleAddDocumentSubmit = async () => {
    setLoading(true);

    const url = await uploadDocument('eleven/document', formValue.file);
    const body = {
      name: formValue.name,
      url: url,
      type: getFileType(formValue.file.name),
      userId: Number(user.id),
      projectId: Number(projectId),
      is_published: formValue.isPublish
    };
    dispatch(addNewDocumentService(body));

    handleOnClose();
  };

  return (
    <>
      {open && (
        <Dialog open={open} scroll="paper" fullWidth>
          <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{ flexWrap: 'nowrap' }}>
            <Grid item>
              <DialogTitle sx={{ fontSize: '1.3rem', fontWeight: '500' }}>Add New Document</DialogTitle>
            </Grid>
            <Grid item sx={{ mr: 1.5 }}>
              <IconButton color="secondary" onClick={handleOnClose}>
                <IconX />
              </IconButton>
            </Grid>
          </Grid>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name">Enter Document Name</InputLabel>
                  <OutlinedInput
                    value={formValue.name}
                    onChange={(e) => setFormValue({ ...formValue, name: e.target.value })}
                    type="name"
                    name="name"
                    id="name"
                    placeholder="Document Name"
                    fullWidth
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                {formValue.file ? (
                  <StyledRow>
                    <StyledText>{formValue.file.name}</StyledText>
                    <IconButton sx={{ borderRadius: '8px' }} onClick={() => setFormValue({ ...formValue, file: null })}>
                      <IconX />
                    </IconButton>
                  </StyledRow>
                ) : (
                  <StyledContainer {...getRootProps()}>
                    {isDragActive ? (
                      <>
                        <input {...getInputProps()} />
                        <StyledUploadDragIcon />
                        <StyledUploadDragTitle>Upload a file</StyledUploadDragTitle>
                        <StyledUploadDragSubTitle>Drag and Drop Here</StyledUploadDragSubTitle>
                      </>
                    ) : (
                      <>
                        <input
                          ref={fileInputRef}
                          type="file"
                          id="imgupload"
                          style={{ display: 'none' }}
                          onChange={(e) => setFormValue({ ...formValue, file: e.target.files[0] })}
                        />
                        <StyledButton onClick={() => fileInputRef.current.click()}>
                          <StyledUploadIcon />
                          Upload a file
                        </StyledButton>
                        <StyledUploadDragSubTitle>OR</StyledUploadDragSubTitle>
                        <StyledUploadDragTitle>Drag and Drop Here</StyledUploadDragTitle>
                      </>
                    )}
                  </StyledContainer>
                )}
              </Grid>
              {(project.user_role === 4 || project.user_role === 3 || project.user_role === 2) && (
                <Grid item xs={12} sx={{ mt: -1 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formValue.isPublish}
                        onChange={(e) => setFormValue({ ...formValue, isPublish: e.target.checked })}
                        color="primary"
                        name="checked"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Publish</Typography>}
                  />
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions sx={{ padding: '15px 24px' }}>
            <Button onClick={handleOnClose} color="error">
              Cancel
            </Button>
            <Button
              onClick={() => handleAddDocumentSubmit()}
              disabled={loading || !formValue.name || !formValue.file}
              disableElevation
              variant="contained"
              type="submit"
            >
              {loading ? 'Adding Document' : 'Add Document'}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default AddDocument;

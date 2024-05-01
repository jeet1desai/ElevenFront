import { useDropzone } from 'react-dropzone';
import { IconUpload } from '@tabler/icons-react';
import { styled } from '@mui/material/styles';

const StyledContainer = styled('div')({
  alignItems: 'center',
  background: '#fcfcfc',
  border: '1px dashed #d6d6d6',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'center',
  textAlign: 'center'
});

const StyledUploadDragTitle = styled('div')({
  color: '#333333',
  fontSize: '1.23rem',
  fontWeight: '500',
  lineHeight: '1.2',
  marginBottom: '8px'
});

const StyledUploadDragSubTitle = styled('div')({ color: '#999999', fontSize: '1rem', fontWeight: '400', lineHeight: '1.2' });

const StyledUploadIcon = styled(IconUpload)({
  color: '#999999',
  marginBottom: '12px'
});

export const DropZone = ({ setIsDraggingFile }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    onDragEnter: () => {
      setIsDraggingFile(true);
    },
    onDragLeave: () => {
      setIsDraggingFile(false);
    },
    onDrop: () => {
      setIsDraggingFile(false);
    },
    onDropAccepted: async ([file]) => {
      console.log(file);
      setIsDraggingFile(false);
    }
  });

  return (
    <StyledContainer {...getRootProps()}>
      {isDragActive && (
        <>
          <input {...getInputProps()} />
          <StyledUploadIcon />
          <StyledUploadDragTitle>Upload a file</StyledUploadDragTitle>
          <StyledUploadDragSubTitle>Drag and Drop Here</StyledUploadDragSubTitle>
        </>
      )}
    </StyledContainer>
  );
};

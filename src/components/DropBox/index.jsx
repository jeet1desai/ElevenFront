import React, { useRef } from 'react';
import { useDropzone } from 'react-dropzone';

import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

import { IconPlus } from '@tabler/icons-react';

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

import { StyledContainer, StyledUploadDragIcon, StyledUploadDragSubTitle, StyledUploadDragTitle } from '../styled-css/DropZoneCSS';

const DropBox = ({ handleChange }) => {
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

export default DropBox;

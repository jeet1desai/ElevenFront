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

// const StyledUploadDragTitle = styled.div`
//   color: ${({ theme }) => theme.font.color.primary};
//   font-size: ${({ theme }) => theme.font.size.lg};
//   font-weight: ${({ theme }) => theme.font.weight.medium};
//   line-height: ${({ theme }) => theme.text.lineHeight.md};
//   margin-bottom: 8px;
// `;

// const StyledUploadDragSubTitle = styled.div`
//   color: ${({ theme }) => theme.font.color.tertiary};
//   font-size: ${({ theme }) => theme.font.size.md};
//   font-weight: ${({ theme }) => theme.font.weight.regular};
//   line-height: ${({ theme }) => theme.text.lineHeight.md};
// `;

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
          {/* <StyledUploadDragTitle>Upload a file</StyledUploadDragTitle>
          <StyledUploadDragSubTitle>Drag and Drop Here</StyledUploadDragSubTitle> */}
        </>
      )}
    </StyledContainer>
  );
};
